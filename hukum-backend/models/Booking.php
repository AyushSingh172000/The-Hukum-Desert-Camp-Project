<?php
require_once __DIR__ . '/../config/database.php';

class Booking {
    private PDO $db;

    public function __construct() {
        $this->db = Database::getConnection();
    }

    public function create(array $data): int {
        $stmt = $this->db->prepare(
            'INSERT INTO bookings (room_id, guest_name, email, phone, check_in, check_out, guests, status)
             VALUES (:room_id, :guest_name, :email, :phone, :check_in, :check_out, :guests, "pending")'
        );
        $stmt->execute([
            ':room_id'    => $data['room_id'],
            ':guest_name' => $data['guest_name'],
            ':email'      => $data['email'],
            ':phone'      => $data['phone'],
            ':check_in'   => $data['check_in'],
            ':check_out'  => $data['check_out'],
            ':guests'     => $data['guests'],
        ]);
        return (int) $this->db->lastInsertId();
    }

    public function checkAvailability(int $room_id, string $check_in, string $check_out): bool {
        $stmt = $this->db->prepare(
            'SELECT COUNT(*) FROM bookings
             WHERE room_id = :room_id
               AND status != "cancelled"
               AND check_in  < :check_out
               AND check_out > :check_in'
        );
        $stmt->execute([
            ':room_id'   => $room_id,
            ':check_in'  => $check_in,
            ':check_out' => $check_out,
        ]);
        return $stmt->fetchColumn() === 0;
    }
}
