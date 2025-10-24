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
$reason = trim($input['reason'] ?? '');

if ($userId <= 0 || $action === '') {
    echo json_encode(['success' => false, 'message' => 'Invalid request']);
    exit;
}

try {
    switch ($action) {
        case 'suspend':
            $stmt = $pdo->prepare('UPDATE users SET is_active = 0 WHERE id = ?');
            $stmt->execute([$userId]);
            // send email if possible
            try {
                $userStmt = $pdo->prepare('SELECT email, first_name FROM users WHERE id = ? LIMIT 1');
                $userStmt->execute([$userId]);
                $u = $userStmt->fetch(PDO::FETCH_ASSOC);
                if ($u && filter_var($u['email'], FILTER_VALIDATE_EMAIL)) {
                    // Use PHPMailer if installed
                    if (file_exists(__DIR__ . '/vendor/autoload.php')) {
                        require __DIR__ . '/vendor/autoload.php';
                        $mail = new PHPMailer\PHPMailer\PHPMailer(true);
                        $mail->isSMTP();
                        $mail->Host = 'smtp.gmail.com';
                        $mail->SMTPAuth = true;
                        $mail->Username = 'craftmartPH@gmail.com';
                        $mail->Password = 'YOUR_APP_PASSWORD_HERE'; // Use Gmail App Password
                        $mail->SMTPSecure = PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_STARTTLS;
                        $mail->Port = 587;
                        $mail->setFrom('craftmartPH@gmail.com', 'CraftMart');
                        $mail->addAddress($u['email']);
                        $mail->Subject = 'Your CraftMart account was suspended';
                        $body = 'Hello ' . $u['first_name'] . ",\n\nYour account has been suspended.";
                        if ($reason !== '') { $body .= "\n\nReason: " . $reason; }
                        $body .= "\n\nIf you believe this is a mistake, please contact support.";
                        $mail->Body = $body;
                        try { $mail->send(); } catch (Exception $e) { /* ignore mail errors */ }
                    }
                }
            } catch (Exception $e) { /* ignore */ }
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
            // Update both seller_profiles and users table
            $stmt1 = $pdo->prepare('UPDATE seller_profiles SET is_verified = 1 WHERE user_id = ?');
            $stmt1->execute([$userId]);
            $stmt2 = $pdo->prepare('UPDATE users SET kyc_status = "approved" WHERE id = ?');
            $stmt2->execute([$userId]);
            break;
        case 'decline_seller':
            // Update both seller_profiles and users table
            $stmt1 = $pdo->prepare('UPDATE seller_profiles SET is_verified = 0 WHERE user_id = ?');
            $stmt1->execute([$userId]);
            $stmt2 = $pdo->prepare('UPDATE users SET kyc_status = "rejected" WHERE id = ?');
            $stmt2->execute([$userId]);
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Unknown action']);
            exit;
    }
    echo json_encode(['success' => true]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database error']);
}
