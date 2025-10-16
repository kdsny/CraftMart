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
    $first_name = $_POST['first_name'] ?? '';
    $last_name = $_POST['last_name'] ?? '';
    $phone = $_POST['phone'] ?? '';
    
    if (empty($first_name) || empty($last_name)) {
        echo json_encode(['success' => false, 'message' => 'First name and last name are required']);
        exit;
    }
    
    try {
        // Get current admin user ID (in a real app, you'd get this from session/token)
        $admin_id = 1; // Default admin ID
        
        // Handle profile image upload
        $profile_image_path = null;
        if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
            $upload_dir = '../uploads/profiles/';
            if (!file_exists($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            $file_extension = pathinfo($_FILES['profile_image']['name'], PATHINFO_EXTENSION);
            $filename = 'admin_' . $admin_id . '_' . time() . '.' . $file_extension;
            $file_path = $upload_dir . $filename;
            
            if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $file_path)) {
                $profile_image_path = 'uploads/profiles/' . $filename;
            }
        }
        
        // Update user information
        $update_fields = ['first_name = ?, last_name = ?, phone = ?'];
        $update_values = [$first_name, $last_name, $phone];
        
        if ($profile_image_path) {
            $update_fields[] = 'profile_image = ?';
            $update_values[] = $profile_image_path;
        }
        
        $update_values[] = $admin_id;
        
        $sql = "UPDATE users SET " . implode(', ', $update_fields) . " WHERE id = ?";
        $stmt = $pdo->prepare($sql);
        $stmt->execute($update_values);
        
        // Get updated user data
        $stmt = $pdo->prepare("SELECT id, email, first_name, last_name, phone, profile_image FROM users WHERE id = ?");
        $stmt->execute([$admin_id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Profile updated successfully',
            'user' => $user
        ]);
        
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
