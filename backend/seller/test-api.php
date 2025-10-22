<?php
// Simple test to check if the seller API is working
header('Content-Type: application/json');

// Test database connection
$host = 'localhost';
$dbname = 'db_craftmart';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo json_encode(['success' => true, 'message' => 'Database connection successful']);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'message' => 'Database connection failed: ' . $e->getMessage()]);
}
?>
