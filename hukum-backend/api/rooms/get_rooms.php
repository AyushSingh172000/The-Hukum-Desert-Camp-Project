<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Room.php';

try {
    $room  = new Room();
    $rooms = $room->getAll();
    json_success($rooms);
} catch (Exception $e) {
    json_error('Failed to fetch rooms: ' . $e->getMessage(), 500);
}
