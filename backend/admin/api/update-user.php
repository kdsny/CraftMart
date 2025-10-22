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
	$id = intval($_POST['id'] ?? 0);
	$first_name = trim($_POST['first_name'] ?? '');
	$last_name = trim($_POST['last_name'] ?? '');
	$email = trim($_POST['email'] ?? '');
	$phone = trim($_POST['phone'] ?? '');
	$user_type = $_POST['user_type'] ?? '';

	if ($id <= 0 || $first_name === '' || $last_name === '' || $email === '' || !in_array($user_type, ['buyer','seller'])) {
		echo json_encode(['success' => false, 'message' => 'Invalid input']);
		exit;
	}

	try {
		// check duplicate email for other users
		$chk = $pdo->prepare('SELECT id FROM users WHERE email = ? AND id <> ? LIMIT 1');
		$chk->execute([$email, $id]);
		if ($chk->fetch()) {
			echo json_encode(['success' => false, 'message' => 'Email already in use']);
			exit;
		}

		$profile_image_path = null;
		if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
			$upload_dir = __DIR__ . '/../uploads/profiles/';
			if (!is_dir($upload_dir)) {
				mkdir($upload_dir, 0777, true);
			}
			$ext = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
			$safeExt = preg_replace('/[^a-zA-Z0-9]/', '', $ext) ?: 'jpg';
			$filename = 'user_' . $id . '_' . time() . '_' . bin2hex(random_bytes(4)) . '.' . $safeExt;
			$full_path = $upload_dir . $filename;
			if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $full_path)) {
				$profile_image_path = 'uploads/profiles/' . $filename;
			}
		}

		if ($profile_image_path) {
			$stmt = $pdo->prepare('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, user_type = ?, profile_image = ? WHERE id = ?');
			$stmt->execute([$first_name, $last_name, $email, $phone, $user_type, $profile_image_path, $id]);
		} else {
			$stmt = $pdo->prepare('UPDATE users SET first_name = ?, last_name = ?, email = ?, phone = ?, user_type = ? WHERE id = ?');
			$stmt->execute([$first_name, $last_name, $email, $phone, $user_type, $id]);
		}

		$response = [
			'success' => true,
			'user' => [
				'id' => $id,
				'first_name' => $first_name,
				'last_name' => $last_name,
				'email' => $email,
				'phone' => $phone,
				'user_type' => $user_type,
				'profile_image' => $profile_image_path ?: null
			]
		];
		echo json_encode($response);
	} catch(PDOException $e) {
		echo json_encode(['success' => false, 'message' => 'Database error']);
	}
} else {
	echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
