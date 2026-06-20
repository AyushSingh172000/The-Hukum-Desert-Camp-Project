<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../config/database.php';

$category = trim($_GET['category'] ?? '');

try {
    $db = Database::getConnection();

    if ($category && $category !== 'All') {
        // Validate category to prevent injection via bind
        $allowed = ['Camp', 'Rooms', 'Safari', 'Cultural', 'Food'];
        if (!in_array($category, $allowed, true)) {
            json_error('Invalid category');
        }
        $stmt = $db->prepare('SELECT * FROM gallery WHERE category = ? ORDER BY sort_order ASC, id ASC');
        $stmt->execute([$category]);
    } else {
        $stmt = $db->query('SELECT * FROM gallery ORDER BY sort_order ASC, id ASC');
    }

    $images = $stmt->fetchAll();
    json_success($images);
} catch (Exception $e) {
    json_error('Failed to fetch gallery: ' . $e->getMessage(), 500);
}
