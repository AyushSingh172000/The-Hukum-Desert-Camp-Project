<?php
class Database {
    private static ?PDO $conn = null;

    private function __construct() {}

    public static function getConnection(): PDO {
        if (self::$conn === null) {
            $dsn = 'mysql:host=127.0.0.1;port=3307;dbname=hukum_desert_camp;charset=utf8mb4';
            self::$conn = new PDO($dsn, 'root', '', [
                PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES   => false,
            ]);
        }
        return self::$conn;
    }
}
