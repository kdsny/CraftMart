<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    if (!isset($input['email']) || !isset($input['password'])) {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }

    $email = $input['email'];
    $pass = $input['password'];

    try {
        $stmt = $pdo->prepare("SELECT id, email, password, first_name, last_name, phone, profile_image, user_type, is_active, kyc_status FROM users WHERE email = ? AND user_type = 'seller' LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($pass, $user['password'])) {
            if (intval($user['is_active']) === 0) {
                echo json_encode(['success' => false, 'message' => 'Account suspended.']);
                exit;
            }
            $token = base64_encode(json_encode(['user_id' => $user['id'], 'email' => $user['email'], 'timestamp' => time()]));
            echo json_encode(['success' => true, 'token' => $token, 'user' => [
                'id' => $user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'phone' => $user['phone'],
                'profile_image' => $user['profile_image'],
                'user_type' => $user['user_type'],
                'kyc_status' => $user['kyc_status']
            ]]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid credentials']);
        }
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>


