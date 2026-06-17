# The Hukum Desert Camp — Website

Premium marketing + booking website for The Hukum Desert Camp, Sam Sand Dunes, Jaisalmer.

**Stack:** React 18 + Vite + Redux Toolkit + Framer Motion (frontend) · PHP PDO REST API (backend) · MySQL (database) · XAMPP

---

## Prerequisites

1. **Node.js** — Install from https://nodejs.org (LTS recommended, v18+)
2. **XAMPP** — Already installed. Apache on port **8080**, MySQL on port **3307**.

---

## Setup Steps

### 1 — Start XAMPP Services

Open the XAMPP Control Panel and start:
- ✅ **Apache** (should show port 8080)
- ✅ **MySQL** (should show port 3307)

---

### 2 — Import the Database

1. Open phpMyAdmin: **http://localhost:8080/phpmyadmin**
2. Click **Import** (top menu bar)
3. Choose file: `C:\xampp\htdocs\hukum-backend\schema.sql`
4. Click **Go**

This creates the `hukum_desert_camp` database with all tables and seed data.

---

### 3 — Backend (PHP) — Already in place

The backend folder is already at:
```
C:\xampp\htdocs\hukum-backend\
```

No further setup needed — Apache will serve it automatically.

**Test the API:**
Open in browser: http://localhost:8080/hukum-backend/api/rooms/get_rooms.php

You should see:
```json
{"success":true,"data":[...],"message":"OK"}
```

---

### 4 — Frontend (React + Vite)

Open a terminal (PowerShell or Command Prompt) and run:

```powershell
cd "C:\xampp\htdocs\The Hukum Desert Camp\hukum-frontend"
npm install
npm run dev
```

The site opens at: **http://localhost:5173**

---

## Environment Variables

The frontend `.env` is already configured:
```
VITE_API_BASE_URL=http://localhost:8080/hukum-backend
```

No changes needed for local development.

---

## Project Structure

```
The Hukum Desert Camp/
├── hukum-frontend/          ← React app (run npm install + npm run dev here)
│   ├── src/
│   │   ├── api/             axiosClient + 4 API modules
│   │   ├── app/             Redux store
│   │   ├── features/        booking / rooms / gallery / ui slices
│   │   ├── components/
│   │   │   ├── common/      Button, Loader, Modal, Input, Lightbox
│   │   │   ├── layout/      Navbar, Footer, Container
│   │   │   └── sections/    Hero, About, WhyChooseUs, Camp, Safari,
│   │   │                    Reservation, GalleryPreview, VideoShowcase
│   │   ├── pages/           Home, Accommodation, DesertExperience,
│   │   │                    Attractions, Gallery, Policy, Contact, Booking
│   │   ├── hooks/           useScrollReveal
│   │   ├── routes/          AppRoutes
│   │   ├── constants/       site data, nav links, accommodation types
│   │   └── styles/          variables.css, global.css, typography.css, animations.css
│   ├── .env
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── C:\xampp\htdocs\hukum-backend\   ← PHP REST API
    ├── config/              database.php (PDO, port 3307), cors.php
    ├── helpers/             response.php
    ├── models/              Room.php, Booking.php, Contact.php
    ├── api/
    │   ├── rooms/           get_rooms.php, get_room.php
    │   ├── booking/         create_booking.php, check_availability.php
    │   ├── gallery/         get_gallery.php
    │   └── contact/         submit_contact.php, subscribe.php
    ├── uploads/
    ├── .htaccess
    └── schema.sql
```

---

## API Endpoints

| Method | URL | Description |
|--------|-----|-------------|
| GET | `/api/rooms/get_rooms.php` | All accommodation types |
| GET | `/api/rooms/get_room.php?slug=desert-camp` | Single room by slug |
| GET | `/api/booking/check_availability.php?room_slug=&check_in=&check_out=` | Check availability |
| POST | `/api/booking/create_booking.php` | Submit booking request |
| GET | `/api/gallery/get_gallery.php` | All gallery images |
| GET | `/api/gallery/get_gallery.php?category=Safari` | Filtered by category |
| POST | `/api/contact/submit_contact.php` | Submit contact form |
| POST | `/api/contact/subscribe.php` | Newsletter subscribe |

---

## Real Assets — TODO

Replace placeholders throughout the codebase (search for `// TODO: replace asset`):

| Location | What to replace |
|----------|----------------|
| `Hero.jsx` | Desert video (`/assets/hero-desert.mp4`) and poster image |
| `About.jsx` | Two camp/tent photos |
| `Camp.jsx` | Three section photos |
| `Safari.jsx` | Four safari photos + hero band image |
| `DesertExperience/` | Six experience photos |
| `Accommodation/` | Four room photos |
| `Gallery/` | 12+ gallery images (upload to `/hukum-backend/uploads/`, update DB) |
| `VideoShowcase.jsx` | Replace YouTube iframe src with real tour video |

Add video/image files to `hukum-frontend/public/assets/` for static assets, or serve from the backend `/uploads/` directory.

---

## Contact Info (already hardcoded)

- **Phone:** (+91) 97840-21198
- **Email:** thehukumdesertcamp@gmail.com
- **Address:** Sam Sand Dunes, Kanoi, Jaisalmer, Rajasthan
- **WhatsApp:** https://wa.link/izk0s4

---

## Database Connection (for reference)

```
Host: 127.0.0.1
Port: 3307
Database: hukum_desert_camp
User: root
Password: (empty)
```
