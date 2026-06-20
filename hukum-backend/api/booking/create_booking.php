<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Room.php';
require_once __DIR__ . '/../../models/Booking.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body = get_json_body();

$required = ['roomSlug', 'name', 'email', 'phone', 'checkIn', 'checkOut', 'guests'];
foreach ($required as $field) {
    if (empty($body[$field])) {
        json_error("Field '{$field}' is required");
    }
}

// Sanitise
$room_slug  = trim($body['roomSlug']);
$guest_name = trim($body['name']);
$email      = filter_var(trim($body['email']), FILTER_SANITIZE_EMAIL);
$phone      = trim($body['phone']);
$check_in   = trim($body['checkIn']);
$check_out  = trim($body['checkOut']);
$guests     = (int) $body['guests'];

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Invalid email address');
}

// Validate dates
$in  = DateTime::createFromFormat('Y-m-d', $check_in);
$out = DateTime::createFromFormat('Y-m-d', $check_out);
if (!$in || !$out || $out <= $in) {
    json_error('Invalid dates');
}

// Validate guests
if ($guests < 1 || $guests > 20) {
    json_error('Guest count must be between 1 and 20');
}

try {
    $roomModel = new Room();
    $room      = $roomModel->getBySlug($room_slug);
    if (!$room) {
        json_error('Room not found', 404);
    }

    $bookingModel = new Booking();

    // Check availability before creating
    $available = $bookingModel->checkAvailability((int)$room['id'], $check_in, $check_out);
    if (!$available) {
        json_error('Sorry, this room is not available for the selected dates.', 409);
    }

    $id = $bookingModel->create([
        'room_id'    => (int) $room['id'],
        'guest_name' => $guest_name,
        'email'      => $email,
        'phone'      => $phone,
        'check_in'   => $check_in,
        'check_out'  => $check_out,
        'guests'     => $guests,
    ]);

    json_success(['id' => $id], 'Booking request submitted successfully.');
} catch (Exception $e) {
    json_error('Booking failed: ' . $e->getMessage(), 500);
}
