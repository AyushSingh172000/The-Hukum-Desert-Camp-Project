# Claude Code Prompt — The Hukum Desert Camp Website (XAMPP-configured)

> Run `claude` inside an **empty project folder**, then paste everything below the line.
> Frontend: React + Vite + Redux Toolkit + global CSS. Backend: PHP REST API on XAMPP. DB: MySQL.

## ⚠️ Your XAMPP environment (detected from the control panel)
- **Apache** runs on **port 8080** (HTTP) and 443 (HTTPS) — NOT port 80.
- **MySQL** runs on **port 3307** — NOT the default 3306 (3306 was in use, so XAMPP moved it).
- Therefore: backend base URL = `http://localhost:8080/hukum-backend`, phpMyAdmin = `http://localhost:8080/phpmyadmin`, MySQL host `127.0.0.1` port `3307`, user `root`, empty password.

---

Build a premium, interactive marketing + booking website for **The Hukum Desert Camp**, a luxury Rajasthani desert camp in Sam Road, Kanoi, Jaisalmer. Replace a current WordPress site with a clean custom stack. Work in clear steps and explain each before running it.

## Tech stack (use exactly this)
- **Frontend:** React 18 + Vite, React Router, **Redux Toolkit** for state, **axios** for API calls, **Framer Motion** for animations. Use **global CSS** with CSS variables for design tokens — no Tailwind, no CSS-in-JS.
- **Backend:** Plain **PHP** REST API using **PDO**, returning JSON. Runs under **XAMPP Apache** at `C:/xampp/htdocs/hukum-backend`.
- **Database:** **MySQL** via XAMPP. Provide a `schema.sql` I can import in phpMyAdmin.

## CRITICAL port config (use these exact values)
- Frontend `.env`: `VITE_API_BASE_URL=http://localhost:8080/hukum-backend`
- `config/database.php` PDO: host `127.0.0.1`, **port `3307`**, dbname `hukum_desert_camp`, user `root`, password `` (empty).
- `config/cors.php`: allow origin `http://localhost:5173` (Vite dev server).

## Brand & design direction (make it feel genuinely premium)
- Tagline (show in hero, Devanagari): **केसरिया बालम… पधारो म्हारे देस**
- Mood: luxury desert, warm, cinematic, calm. Inspired by saffron sunsets and golden Thar dunes.
- **Color tokens** (put in `styles/variables.css`):
  - `--color-saffron: #E08A2D` (primary / CTAs)
  - `--color-terracotta: #9C3D1E` (deep accent)
  - `--color-sand: #E9DCC3` (light section backgrounds)
  - `--color-cream: #FBF6EC` (page background)
  - `--color-charcoal: #2B2420` (text)
  - a warm sunset gradient for hero overlays
- **Typography:** elegant serif for headings (Playfair Display or Cormorant Garamond), clean sans for body (Inter or Poppins). Load via Google Fonts.
- **Premium interactions:** parallax hero with looping desert background video, sticky navbar that turns from transparent to solid on scroll, scroll-reveal fade/slide for every section (Framer Motion), image hover-zoom on cards, gallery lightbox, smooth-scroll anchor nav, animated booking widget.
- Fully responsive, mobile-first. Accessible (alt text, keyboard nav, focus states).

## Pages & routes
- `/` Home
- `/accommodation` with detail pages: `/accommodation/desert-camp`, `/deluxe-rooms`, `/eco-farm-stay`, `/glass-house`
- `/desert-experience`
- `/attractions`
- `/gallery`
- `/policy` (Privacy, Terms, Refund)
- `/contact`
- `/booking` (booking form + availability check)

## Home page sections (in order)
1. **Hero** — full-screen desert video/image, camp name, the Devanagari tagline, "Book Now" CTA, and a floating **check-in / check-out + guests** booking widget.
2. **About the Camp** — authentic Rajasthani experience with modern comfort; Swiss tents and desert safaris; two feature images.
3. **Why Choose Us** — 5 cards: Prime location near Sam Sand Dunes · Luxury Swiss Tent accommodation · Authentic Rajasthani hospitality · Customized safari & camp packages · Hygienic food & comfortable stay.
4. **Camp** — Swiss tents, evening cultural programs (folk dance, live music), bonfire & dinner under the stars.
5. **Desert Safari** — camel safari, jeep safari, sunset & sunrise views.
6. **Reservation / Heritage** — local sightseeing, cultural landmarks, desert villages.
7. **Gallery preview** — grid linking to full gallery, with lightbox.
8. **Video showcase** — virtual tour video section.
9. **Footer** — quick menu, contact info, social links, newsletter subscribe form, "Book Now" CTA, policy links.

## Real site data to hardcode in `src/constants/`
- Phone: **(+91) 97840-21198**
- Email: **thehukumdesertcamp@gmail.com**
- Address: **Sam Sand Dunes, Kanoi, Jaisalmer, Rajasthan**
- Socials: Facebook `/thehukumdesertcamp`, Instagram `/thehukumdesertcamp`, YouTube `@Thehukumdesertcamp`, WhatsApp `https://wa.link/izk0s4`
- Accommodation types: Desert Camp, Deluxe Rooms, ECO Farm Stay, Glass House
- Copyright: © 2026 The Hukum Desert Camp

## Frontend folder structure
```
hukum-frontend/
├── public/
├── src/
│   ├── api/            axiosClient.js, roomsApi.js, bookingApi.js, galleryApi.js, contactApi.js
│   ├── app/            store.js
│   ├── features/       booking/, rooms/, gallery/, ui/   (Redux Toolkit slices)
│   ├── components/
│   │   ├── common/     Button, Loader, Modal, Input, Lightbox
│   │   ├── layout/     Navbar, Footer, Container
│   │   └── sections/   Hero, About, WhyChooseUs, Camp, Safari, Reservation, GalleryPreview, VideoShowcase
│   ├── pages/          Home/, Accommodation/, DesertExperience/, Attractions/, Gallery/, Policy/, Contact/, Booking/
│   ├── hooks/  routes/  utils/  constants/  assets/
│   ├── styles/         variables.css, global.css, typography.css, animations.css
│   ├── App.jsx  main.jsx
├── .env                VITE_API_BASE_URL=http://localhost:8080/hukum-backend
└── vite.config.js
```
Redux: one slice per feature, store combined in `app/store.js`, wrap `<App/>` in `<Provider>`. Use `createAsyncThunk` for API calls. Keep all colors/spacing/fonts as CSS variables — components reference tokens, never hardcoded hex. axios baseURL must read `import.meta.env.VITE_API_BASE_URL`.

## Backend folder structure (place in C:/xampp/htdocs/hukum-backend)
```
hukum-backend/
├── config/      database.php (PDO, host 127.0.0.1 port 3307), cors.php (allow http://localhost:5173)
├── api/
│   ├── rooms/      get_rooms.php, get_room.php
│   ├── booking/    create_booking.php, check_availability.php
│   ├── gallery/    get_gallery.php
│   └── contact/    submit_contact.php, subscribe.php
├── models/      Room.php, Booking.php, Contact.php
├── helpers/     response.php (json helper)
├── uploads/
├── .htaccess
└── schema.sql
```
Every endpoint: include cors.php first, use PDO prepared statements, return `{ success, data, message }` JSON. Validate input. No raw SQL string concatenation. database.php must use DSN `mysql:host=127.0.0.1;port=3307;dbname=hukum_desert_camp;charset=utf8mb4`.

## MySQL schema (`schema.sql`)
- `CREATE DATABASE hukum_desert_camp` then `USE` it.
- `rooms` — id, slug, name, type, description, price_per_night, max_guests, image_url, created_at
- `bookings` — id, room_id (FK), guest_name, email, phone, check_in, check_out, guests, status (pending/confirmed/cancelled), created_at
- `gallery` — id, title, image_url, category, sort_order
- `contact_messages` — id, name, email, phone, message, created_at
- `subscribers` — id, email, created_at
Seed `rooms` with the 4 accommodation types and `gallery` with placeholder rows.

## Build order
1. Scaffold the Vite React app, install deps (react-router-dom, @reduxjs/toolkit, react-redux, axios, framer-motion).
2. Set up global CSS tokens + typography, then the layout (Navbar + Footer).
3. Build Home sections top to bottom with scroll-reveal animations.
4. Build remaining pages and routing.
5. Wire Redux store + axios client + slices.
6. Build the PHP backend (config, helpers, models, endpoints) and `schema.sql`.
7. Connect frontend booking/contact/gallery to the PHP API; show loading + error states.
8. Final pass: responsiveness, accessibility, and a `README.md` with EXACT setup steps for my environment:
   - Start Apache (port 8080) + MySQL (port 3307) in XAMPP.
   - Open `http://localhost:8080/phpmyadmin` and import `schema.sql`.
   - Copy `hukum-backend/` into `C:/xampp/htdocs/`.
   - In `hukum-frontend/`: `npm install` then `npm run dev` (opens on http://localhost:5173).
   - Test the API directly in a browser: `http://localhost:8080/hukum-backend/api/rooms/get_rooms.php`.

Use tasteful placeholder images/videos where I haven't supplied assets, and leave clear `// TODO: replace asset` comments. Start by confirming the plan, then scaffold step 1.
