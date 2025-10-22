<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Database configuration
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
    $password = $input['password'];
    
    try {
        // Check if user exists and is admin
        $stmt = $pdo->prepare("SELECT id, email, password, first_name, last_name, phone, profile_image, user_type, is_active FROM users WHERE email = ? AND user_type = 'admin' LIMIT 1");
        $stmt->execute([$email]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($user && password_verify($password, $user['password'])) {
            if (intval($user['is_active']) === 0) {
                echo json_encode(['success' => false, 'message' => 'Account suspended. Contact administrator.']);
                exit;
            }
            // Generate a simple token (in production, use JWT or similar)
            $token = base64_encode(json_encode([
                'user_id' => $user['id'],
                'email' => $user['email'],
                'timestamp' => time()
            ]));
            
            echo json_encode([
                'success' => true,
                'message' => 'Login successful',
                'token' => $token,
                'user' => [
                    'id' => $user['id'],
                    'email' => $user['email'],
                    'first_name' => $user['first_name'],
                    'last_name' => $user['last_name'],
                    'phone' => $user['phone'],
                    'profile_image' => $user['profile_image'],
                    'user_type' => $user['user_type']
                ]
            ]);
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
