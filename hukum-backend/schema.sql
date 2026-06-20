-- ============================================================
-- The Hukum Desert Camp — MySQL Schema
-- Import via: phpMyAdmin (http://localhost:8080/phpmyadmin)
--   or: Get-Content schema.sql | & mysql.exe -u root -P 3307
-- ============================================================

CREATE DATABASE IF NOT EXISTS hukum_desert_camp
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE hukum_desert_camp;

-- ── Rooms ────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS rooms (
    id               INT          AUTO_INCREMENT PRIMARY KEY,
    slug             VARCHAR(100) NOT NULL UNIQUE,
    name             VARCHAR(200) NOT NULL,
    type             VARCHAR(100) NOT NULL,
    description      TEXT,
    price_per_night  DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    max_guests       TINYINT       NOT NULL DEFAULT 2,
    image_url        VARCHAR(500),
    created_at       TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Bookings ──────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bookings (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    room_id     INT          NOT NULL,
    guest_name  VARCHAR(200) NOT NULL,
    email       VARCHAR(300) NOT NULL,
    phone       VARCHAR(30),
    check_in    DATE         NOT NULL,
    check_out   DATE         NOT NULL,
    guests      TINYINT      NOT NULL DEFAULT 1,
    status      ENUM('pending','confirmed','cancelled') NOT NULL DEFAULT 'pending',
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_room FOREIGN KEY (room_id) REFERENCES rooms(id) ON DELETE RESTRICT,
    INDEX idx_booking_dates (room_id, check_in, check_out),
    INDEX idx_booking_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Gallery ───────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS gallery (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(300),
    image_url   VARCHAR(500) NOT NULL,
    category    ENUM('Camp','Rooms','Safari','Cultural','Food') NOT NULL DEFAULT 'Camp',
    sort_order  SMALLINT     NOT NULL DEFAULT 0,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_gallery_category (category, sort_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Contact Messages ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS contact_messages (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(200) NOT NULL,
    email       VARCHAR(300) NOT NULL,
    phone       VARCHAR(30),
    message     TEXT         NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_contact_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── Subscribers ───────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS subscribers (
    id          INT          AUTO_INCREMENT PRIMARY KEY,
    email       VARCHAR(300) NOT NULL UNIQUE,
    created_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ============================================================
-- SEED DATA
-- ============================================================

INSERT INTO rooms (slug, name, type, description, price_per_night, max_guests, image_url) VALUES
(
    'desert-camp',
    'Desert Camp',
    'Swiss Tent',
    'Our signature Swiss tents combine luxury and authenticity at the heart of the Thar. Featuring a plush king-size bed draped in handwoven Rajasthani textiles, a private sit-out veranda overlooking the dunes, and an en-suite bathroom with hot water. Wake up to silence and shimmer — this is the quintessential desert experience.',
    4500.00,
    2,
    'https://thehukumdesertcamp.com/wp-content/uploads/2026/06/desert-camp-hotel-murad-haveli-jaisalmer.jpg'
),
(
    'deluxe-rooms',
    'Deluxe Rooms',
    'Permanent Structure',
    'Stone walls adorned with carved Rajasthani jharokha windows, hand-painted murals, and modern amenities for an indulgent desert stay. The Deluxe Rooms blend timeless architecture with contemporary comfort — ideal for travellers who want the spirit of Rajasthan with the ease of a boutique hotel room.',
    6500.00,
    3,
    'https://thehukumdesertcamp.com/wp-content/uploads/2026/06/deluxe-room-hotel-murad-haveli-jaisalmer.jpg'
),
(
    'eco-farm-stay',
    'ECO Farm Stay',
    'Eco Hut',
    'Live sustainably and simply in solar-powered mud huts built with traditional desert architecture. Surrounded by native desert flora and fauna, the ECO Farm Stay is perfect for nature lovers and mindful travellers. Participate in organic farming, learn traditional crafts, and experience the true rhythm of desert life.',
    3500.00,
    2,
    'https://thehukumdesertcamp.com/wp-content/uploads/2026/06/eco-farm-stay-hotel-murad-haveli-jaisalmer.jpg'
),
(
    'glass-house',
    'Glass House',
    'Luxury Pavilion',
    'A contemporary masterpiece nestled in the dunes. Floor-to-ceiling glass panels offer breathtaking 270° panoramic views of the Sam Sand Dunes from your bed, your jacuzzi bath, and your private stargazing terrace. The Glass House is our most exclusive offering — a honeymoon favourite.',
    9500.00,
    2,
    'https://thehukumdesertcamp.com/wp-content/uploads/2026/06/Glass-House.png'
);

-- 41 real gallery images from thehukumdesertcamp.com
INSERT INTO gallery (title, image_url, category, sort_order) VALUES
('Camp Life',             'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.08.27-PM.jpeg',       'Camp',      1),
('Swiss Tent Interior',   'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.08.32-PM.jpeg',       'Rooms',     1),
('Desert Ambience',       'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.09.46-PM.jpeg',       'Camp',      2),
('Golden Dunes',          'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.09.52-PM.jpeg',       'Camp',      3),
('Cultural Evening',      'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.15-PM.jpeg',       'Cultural',  1),
('Folk Performance',      'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.22-PM.jpeg',       'Cultural',  2),
('Rajasthani Night',      'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.26-PM.jpeg',       'Cultural',  3),
('Camp Bonfire',          'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.31-PM.jpeg',       'Camp',      4),
('Desert Night',          'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.37-PM.jpeg',       'Camp',      5),
('Rajasthani Thali',      'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.11.57-PM.jpeg',       'Food',      1),
('Desert Feast',          'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.12.01-PM.jpeg',       'Food',      2),
('Camp Overview',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.12.09-PM.jpeg',       'Camp',      6),
('Tent Exterior',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-17-at-1.12.11-PM.jpeg',       'Rooms',     2),
('Camel Safari',          'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-1.jpeg',    'Safari',    1),
('Desert Safari',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.01-AM-2.jpeg',    'Safari',    2),
('Sand Dune Explorer',    'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM.jpeg',      'Safari',    3),
('Thar Landscape',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.02-AM-1.jpeg',    'Camp',      7),
('Desert Morning',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.03-AM-1.jpeg',    'Camp',      8),
('Golden Dunes View',     'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM.jpeg',      'Safari',    4),
('Thar Desert',           'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.04-AM-3.jpeg',    'Safari',    5),
('Sunset Safari',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-1.jpeg',    'Safari',    6),
('Dune Crest',            'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.05-AM-2-1.jpeg',  'Safari',    7),
('Traditional Dance',     'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.07-AM.jpeg',      'Cultural',  4),
('Rajasthani Folk',       'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.06-AM.jpeg',      'Cultural',  5),
('Cultural Performance',  'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.07-AM-1.jpeg',    'Cultural',  6),
('Luxury Tent',           'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM-1.jpeg',    'Rooms',     3),
('Swiss Tent Suite',      'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM.jpeg',      'Rooms',     4),
('Heritage Tent',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.08-AM-2.jpeg',    'Rooms',     5),
('Camp Serenity',         'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM-1.jpeg',    'Camp',      9),
('Desert Retreat',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.09-AM-2.jpeg',    'Camp',      10),
('Dinner on Dunes',       'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM.jpeg',      'Food',      3),
('Starlit Dinner',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.11-AM.jpeg',      'Food',      4),
('Under the Stars',       'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.10-AM-1-1.jpeg',  'Food',      5),
('Bonfire Dinner',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.11-AM-1.jpeg',    'Food',      6),
('Morning at Camp',       'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.12-AM.jpeg',      'Camp',      11),
('Desert Sunrise',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM.jpeg',      'Camp',      12),
('Camel Trek',            'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.12-AM-1.jpeg',    'Safari',    8),
('Dune Adventure',        'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM-1.jpeg',    'Safari',    9),
('Evening Celebration',   'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.13-AM-2.jpeg',    'Cultural',  7),
('Tent Decor',            'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.14-AM.jpeg',      'Rooms',     6),
('Desert Life',           'https://thehukumdesertcamp.com/wp-content/uploads/2026/04/WhatsApp-Image-2026-04-27-at-11.24.14-AM-1.jpeg',    'Camp',      13);
