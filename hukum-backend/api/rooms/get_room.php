<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Room.php';

$slug = trim($_GET['slug'] ?? '');

if ($slug === '') {
    json_error('slug parameter is required');
}

// Validate slug format (only alphanumeric + hyphens)
if (!preg_match('/^[a-z0-9\-]+$/', $slug)) {
    json_error('Invalid slug format');
}

try {
    $model = new Room();
    $room  = $model->getBySlug($slug);

    if (!$room) {
        json_error('Room not found', 404);
    }

    json_success($room);
} catch (Exception $e) {
    json_error('Failed to fetch room: ' . $e->getMessage(), 500);
}
