<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
	exit(0);
}

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
    // Using multipart/form-data for optional image upload
    $first_name = trim($_POST['first_name'] ?? '');
    $last_name = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $passwordPlain = $_POST['password'] ?? '';
    $user_type = $_POST['user_type'] ?? '';
    $phone = trim($_POST['phone'] ?? '');

    if ($first_name === '' || $last_name === '' || $email === '' || $passwordPlain === '' || !in_array($user_type, ['buyer','seller'])) {
		echo json_encode(['success' => false, 'message' => 'Invalid input']);
		exit;
	}

	try {
		// check duplicate email
		$chk = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
		$chk->execute([$email]);
		if ($chk->fetch()) {
			echo json_encode(['success' => false, 'message' => 'Email already exists']);
			exit;
		}

        // Optional profile image upload
        $profile_image_path = null;
        if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = __DIR__ . '/../uploads/profiles/';
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            $ext = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
            $safeExt = preg_replace('/[^a-zA-Z0-9]/', '', $ext) ?: 'jpg';
            $filename = 'user_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $safeExt;
            $full_path = $upload_dir . $filename;
            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $full_path)) {
                $profile_image_path = 'uploads/profiles/' . $filename;
            }
        }

        $hash = password_hash($passwordPlain, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('INSERT INTO users (email, password, first_name, last_name, phone, profile_image, user_type, is_active, email_verified) VALUES (?, ?, ?, ?, ?, ?, ?, 1, 0)');
        $stmt->execute([$email, $hash, $first_name, $last_name, $phone, $profile_image_path, $user_type]);

        echo json_encode(['success' => true, 'message' => 'User created successfully']);
	} catch(PDOException $e) {
		echo json_encode(['success' => false, 'message' => 'Database error']);
	}
} else {
	echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
