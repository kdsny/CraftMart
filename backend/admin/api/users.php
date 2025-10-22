<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
	try {
$stmt = $pdo->query("SELECT u.id, u.email, u.first_name, u.last_name, u.phone, u.profile_image, u.user_type, u.is_active, u.created_at, sp.is_verified
        FROM users u
        LEFT JOIN seller_profiles sp ON sp.user_id = u.id
        ORDER BY 
            CASE WHEN u.user_type = 'seller' AND (sp.is_verified IS NULL OR sp.is_verified = 0) THEN 0 ELSE 1 END ASC,
            u.created_at DESC
        LIMIT 100");
	$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
		echo json_encode(['success' => true, 'users' => $users]);
	} catch(PDOException $e) {
		echo json_encode(['success' => false, 'message' => 'Database error']);
	}
} else {
	echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
