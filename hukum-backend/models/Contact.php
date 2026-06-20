<?php
require_once __DIR__ . '/../config/database.php';

class Contact {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function saveMessage(array $data): int {
        $stmt = $this->db->prepare(
            'INSERT INTO contact_messages (name, email, phone, message) VALUES (:name, :email, :phone, :message)'
        );
        $stmt->execute([
            ':name'    => $data['name'],
            ':email'   => $data['email'],
            ':phone'   => $data['phone'] ?? '',
            ':message' => $data['message'],
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function subscribe(string $email): bool {
        // Silently ignore duplicates
        $stmt = $this->db->prepare(
            'INSERT IGNORE INTO subscribers (email) VALUES (:email)'
        );
        $stmt->execute([':email' => $email]);
        return $stmt->rowCount() > 0;
    }
}
