<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Contact.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body = get_json_body();

$name    = trim($body['name']    ?? '');
$email   = trim($body['email']   ?? '');
$phone   = trim($body['phone']   ?? '');
$message = trim($body['message'] ?? '');

if (!$name || !$email || !$message) {
    json_error('name, email, and message are required');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Invalid email address');
}

if (strlen($message) > 2000) {
    json_error('Message must not exceed 2000 characters');
}

try {
    $contact = new Contact();
    $id      = $contact->saveMessage(compact('name', 'email', 'phone', 'message'));
    json_success(['id' => $id], 'Message received. We\'ll respond within 24 hours.');
} catch (Exception $e) {
    json_error('Failed to submit message: ' . $e->getMessage(), 500);
}
