<?php
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

$input = json_decode(file_get_contents('php://input'), true) ?: [];
$action = $input['action'] ?? '';
$userId = intval($input['user_id'] ?? 0);

if ($userId <= 0 || $action === '') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

try {
    switch ($action) {
        case 'suspend':
            $stmt = $pdo->prepare('UPDATE users SET is_active = 0 WHERE id = ?');
            $stmt->execute([$userId]);
            break;
        case 'activate':
            $stmt = $pdo->prepare('UPDATE users SET is_active = 1 WHERE id = ?');
            $stmt->execute([$userId]);
            break;
        case 'delete':
            $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
            $stmt->execute([$userId]);
            break;
        case 'approve_seller':
            $stmt = $pdo->prepare('UPDATE seller_profiles SET is_verified = 1 WHERE user_id = ?');
            $stmt->execute([$userId]);
            break;
        case 'decline_seller':
            $stmt = $pdo->prepare('UPDATE seller_profiles SET is_verified = 0 WHERE user_id = ?');
            $stmt->execute([$userId]);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Unknown action']);
            exit;
    }
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
