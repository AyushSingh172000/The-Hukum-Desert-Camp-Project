<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Room.php';
require_once __DIR__ . '/../../models/Booking.php';

$room_slug  = trim($_GET['room_slug']  ?? '');
$check_in   = trim($_GET['check_in']   ?? '');
$check_out  = trim($_GET['check_out']  ?? '');

if (!$room_slug || !$check_in || !$check_out) {
    json_error('room_slug, check_in, and check_out are required');
}

// Validate dates
$in  = DateTime::createFromFormat('Y-m-d', $check_in);
$out = DateTime::createFromFormat('Y-m-d', $check_out);

if (!$in || !$out || $out <= $in) {
    json_error('Invalid dates. check_out must be after check_in.');
}

try {
    $roomModel = new Room();
    $room      = $roomModel->getBySlug($room_slug);
    if (!$room) {
        json_error('Room not found', 404);
    }

    $bookingModel = new Booking();
    $available    = $bookingModel->checkAvailability((int)$room['id'], $check_in, $check_out);

    json_success(['available' => $available]);
} catch (Exception $e) {
    json_error('Availability check failed: ' . $e->getMessage(), 500);
}
