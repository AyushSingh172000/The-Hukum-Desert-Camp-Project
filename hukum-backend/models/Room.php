<?php
require_once __DIR__ . '/../config/database.php';

class Room {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function getAll(): array {
        $stmt = $this->db->query('SELECT * FROM rooms ORDER BY id ASC');
        return $stmt->fetchAll();
    }

    public function getBySlug(string $slug): array|false {
        $stmt = $this->db->prepare('SELECT * FROM rooms WHERE slug = ? LIMIT 1');
        $stmt->execute([$slug]);
        return $stmt->fetch();
    }
}
