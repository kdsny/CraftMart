<?php
// Enable error reporting for debugging (disable in prod)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Increase upload limits to reduce failures
@ini_set('upload_max_filesize', '12M');
@ini_set('post_max_size', '16M');
@ini_set('max_file_uploads', '10');
@ini_set('max_execution_time', '120');

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

$host = 'localhost';
$dbname = 'db_craftmart';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
    exit;
}

// Ensure uploads directory
$uploadBase = __DIR__ . '/../../admin/uploads';
if (!file_exists($uploadBase)) { @mkdir($uploadBase, 0777, true); }
if (!file_exists($uploadBase . '/profiles')) { @mkdir($uploadBase . '/profiles', 0777, true); }
if (!file_exists($uploadBase . '/ids')) { @mkdir($uploadBase . '/ids', 0777, true); }

// Validate required fields
$required = ['first_name','last_name','email','phone','password','business_name'];
foreach ($required as $field) {
    if (!isset($_POST[$field]) || trim($_POST[$field]) === '') {
        echo json_encode(['success' => false, 'message' => 'Missing field: ' . $field]);
        exit;
    }
}

$first = trim($_POST['first_name']);
$last = trim($_POST['last_name']);
$email = trim($_POST['email']);
$phone = trim($_POST['phone']);
$pass = password_hash($_POST['password'], PASSWORD_BCRYPT);
$address = isset($_POST['address']) ? trim($_POST['address']) : '';
$businessName = trim($_POST['business_name']);

// Handle files
function upload_error_msg($code) {
    switch ($code) {
        case UPLOAD_ERR_INI_SIZE: return 'File exceeds server limit (upload_max_filesize).';
        case UPLOAD_ERR_FORM_SIZE: return 'File exceeds form limit (MAX_FILE_SIZE).';
        case UPLOAD_ERR_PARTIAL: return 'File was only partially uploaded.';
        case UPLOAD_ERR_NO_FILE: return 'No file uploaded.';
        case UPLOAD_ERR_NO_TMP_DIR: return 'Missing a temporary folder on server.';
        case UPLOAD_ERR_CANT_WRITE: return 'Failed to write file to disk.';
        case UPLOAD_ERR_EXTENSION: return 'A PHP extension stopped the file upload.';
        default: return 'Unknown upload error.';
    }
}

function save_upload($file, $destDir, $prefix) {
    if (!isset($_FILES[$file]) || $_FILES[$file]['error'] !== UPLOAD_ERR_OK) {
        $code = isset($_FILES[$file]['error']) ? $_FILES[$file]['error'] : -1;
        return [false, 'Upload failed for ' . $file . ': ' . upload_error_msg($code)];
    }
    $ext = pathinfo($_FILES[$file]['name'], PATHINFO_EXTENSION);
    $name = $prefix . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $ext;
    $path = $destDir . '/' . $name;
    if (!move_uploaded_file($_FILES[$file]['tmp_name'], $path)) { return [false, 'Cannot save file: ' . $file]; }
    return [true, $name];
}

list($okProfile, $profileName) = save_upload('profile_image', $uploadBase . '/profiles', 'seller');
if (!$okProfile) { echo json_encode(['success' => false, 'message' => $profileName]); exit; }
list($okId, $idName) = save_upload('national_id_image', $uploadBase . '/ids', 'nid');
if (!$okId) { echo json_encode(['success' => false, 'message' => $idName]); exit; }

try {
    // Ensure unique email
    $chk = $pdo->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
    $chk->execute([$email]);
    if ($chk->fetch()) { echo json_encode(['success' => false, 'message' => 'Email already registered']); exit; }

    // Create user (seller) with pending KYC
    $stmt = $pdo->prepare("INSERT INTO users (email, password, first_name, last_name, phone, profile_image, user_type, is_active, email_verified, kyc_status, national_id_image) VALUES (?, ?, ?, ?, ?, ?, 'seller', 1, 0, 'pending', ?)");
    $stmt->execute([$email, $pass, $first, $last, $phone, 'profiles/' . $profileName, 'ids/' . $idName]);
    $userId = $pdo->lastInsertId();

    // Create basic seller profile
    $sp = $pdo->prepare("INSERT INTO seller_profiles (user_id, business_name, business_address, business_phone, business_email, profile_image, is_verified) VALUES (?, ?, ?, ?, ?, ?, 0)");
    $sp->execute([$userId, $businessName, $address, $phone, $email, 'profiles/' . $profileName]);

    echo json_encode(['success' => true, 'message' => 'Application submitted. Await admin approval.']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
?>


