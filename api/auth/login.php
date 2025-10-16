<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

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
    $email = $input['email'] ?? '';
    $pass = $input['password'] ?? '';
    if ($email === '' || $pass === '') {
        echo json_encode(['success' => false, 'message' => 'Email and password are required']);
        exit;
    }
    try {
        $stmt = $pdo->prepare("SELECT u.id, u.email, u.password, u.first_name, u.last_name, u.user_type, u.is_active, u.profile_image, sp.is_verified
            FROM users u
            LEFT JOIN seller_profiles sp ON sp.user_id = u.id
            WHERE u.email = ? LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($user && password_verify($pass, $user['password'])) {
            if (intval($user['is_active']) === 0) {
                echo json_encode(['success' => false, 'message' => 'Your account is suspended. Please contact support.']);
                exit;
            }
            if ($user['user_type'] === 'seller' && (is_null($user['is_verified']) || intval($user['is_verified']) === 0)) {
                echo json_encode(['success' => false, 'message' => 'Your seller account is pending approval. Please wait for admin review.']);
                exit;
            }
            echo json_encode(['success' => true, 'user' => [
                'id' => (int)$user['id'],
                'email' => $user['email'],
                'first_name' => $user['first_name'],
                'last_name' => $user['last_name'],
                'user_type' => $user['user_type'],
                'profile_image' => $user['profile_image'] ?? null
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
