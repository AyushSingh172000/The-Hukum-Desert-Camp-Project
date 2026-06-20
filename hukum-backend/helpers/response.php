<?php
function json_response(bool $success, mixed $data = null, string $message = '', int $code = 200): void {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'data'    => $data,
        'message' => $message,
    ], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function json_error(string $message, int $code = 400): void {
    json_response(false, null, $message, $code);
}

function json_success(mixed $data = null, string $message = 'OK'): void {
    json_response(true, $data, $message, 200);
}

function get_json_body(): array {
    $raw = file_get_contents('php://input');
    return json_decode($raw, true) ?? [];
}
