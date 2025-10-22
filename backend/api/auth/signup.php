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
    // supports form-data
    $first = trim($_POST['first_name'] ?? '');
    $last = trim($_POST['last_name'] ?? '');
    $email = trim($_POST['email'] ?? '');
    $pass = $_POST['password'] ?? '';
    $user_type = $_POST['user_type'] ?? 'buyer';

    if ($first === '' || $last === '' || $email === '' || $pass === '') {
        echo json_encode(['success' => false, 'message' => 'Missing fields']);
        exit;
    }
    if (!in_array($user_type, ['buyer','seller','admin','rider'])) $user_type = 'buyer';

    try {
        $chk = $pdo->prepare('SELECT id FROM users WHERE email = ? LIMIT 1');
        $chk->execute([$email]);
        if ($chk->fetch()) {
            echo json_encode(['success' => false, 'message' => 'Email already exists']);
            exit;
        }
        $hash = password_hash($pass, PASSWORD_BCRYPT);
        $stmt = $pdo->prepare('INSERT INTO users (email, password, first_name, last_name, user_type, is_active, email_verified) VALUES (?, ?, ?, ?, ?, 1, 0)');
        $stmt->execute([$email, $hash, $first, $last, $user_type]);

        $id = (int)$pdo->lastInsertId();
        // If seller, create pending seller profile
        if ($user_type === 'seller') {
            $pdo->prepare('INSERT INTO seller_profiles (user_id, is_verified) VALUES (?, 0)')->execute([$id]);
        }
        echo json_encode(['success' => true, 'user' => [
            'id' => $id,
            'email' => $email,
            'first_name' => $first,
            'last_name' => $last,
            'user_type' => $user_type
        ]]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
