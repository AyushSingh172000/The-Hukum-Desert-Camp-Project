<?php
require_once __DIR__ . '/../../config/cors.php';
require_once __DIR__ . '/../../helpers/response.php';
require_once __DIR__ . '/../../models/Contact.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_error('Method not allowed', 405);
}

$body  = get_json_body();
$email = trim($body['email'] ?? '');

if (!$email) {
    json_error('email is required');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Invalid email address');
}

try {
    $contact = new Contact();
    $contact->subscribe($email);
    json_success(null, 'Thank you for subscribing!');
} catch (Exception $e) {
    json_error('Subscription failed: ' . $e->getMessage(), 500);
}
