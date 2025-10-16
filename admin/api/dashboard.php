<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

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

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    try {
        // Get total users
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM users WHERE is_active = 1");
        $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Get total products
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM products WHERE is_active = 1");
        $totalProducts = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Get total orders
        $stmt = $pdo->query("SELECT COUNT(*) as total FROM orders");
        $totalOrders = $stmt->fetch(PDO::FETCH_ASSOC)['total'];
        
        // Get total revenue
        $stmt = $pdo->query("SELECT SUM(total_amount) as total FROM orders WHERE payment_status = 'paid'");
        $totalRevenue = $stmt->fetch(PDO::FETCH_ASSOC)['total'] ?? 0;
        
        // Get recent orders
        $stmt = $pdo->query("
            SELECT o.id, o.order_number, o.total_amount, o.status, o.created_at, 
                   u.first_name, u.last_name 
            FROM orders o 
            JOIN users u ON o.buyer_id = u.id 
            ORDER BY o.created_at DESC 
            LIMIT 10
        ");
        $recentOrders = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get user growth data (last 6 months)
        $stmt = $pdo->query("
            SELECT DATE_FORMAT(created_at, '%Y-%m') as month, COUNT(*) as count 
            FROM users 
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH) 
            GROUP BY DATE_FORMAT(created_at, '%Y-%m') 
            ORDER BY month
        ");
        $userGrowth = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Get sales data (last 6 months)
        $stmt = $pdo->query("
            SELECT DATE_FORMAT(created_at, '%Y-%m') as month, SUM(total_amount) as total 
            FROM orders 
            WHERE payment_status = 'paid' AND created_at >= DATE_SUB(NOW(), INTERVAL 6 MONTH) 
            GROUP BY DATE_FORMAT(created_at, '%Y-%m') 
            ORDER BY month
        ");
        $salesData = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => [
                'totalUsers' => $totalUsers,
                'totalProducts' => $totalProducts,
                'totalOrders' => $totalOrders,
                'totalRevenue' => number_format($totalRevenue, 2),
                'recentOrders' => $recentOrders,
                'userGrowth' => $userGrowth,
                'salesData' => $salesData
            ]
        ]);
    } catch(PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}
?>
