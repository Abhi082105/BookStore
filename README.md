# 📚 PageTurn — Modern Interactive Bookstore Application

> An interactive, responsive, and feature-rich e-commerce bookstore web application built using **React 18**, **React Router 6**, **Tailwind CSS**, and **Vitest**.

[![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4.15-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vitest](https://img.shields.io/badge/Vitest-Unit%20Tests%20Passing-FCC72B?logo=vitest&logoColor=black)](https://vitest.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 🌟 Overview & Problem Statement

**PageTurn** solves the problem of discovering, filtering, inspecting, and purchasing books through an engaging, fluid e-commerce experience. Built from the ground up to fulfill all primary requirements and bonus criteria:

- 🔍 **Browse & Search:** Instant multi-parameter search (title, author, genre, ISBN) with real-time feedback.
- 🎯 **Advanced Filtering & Sorting:** Filter by genres, price boundaries, minimum star ratings, and real-time stock availability.
- 📖 **Comprehensive Book Details:** Full product specifications, synopsis, publisher metadata, reader reviews, and interactive star rating submissions.
- 🛒 **Dynamic Shopping Cart:** Quantity controls with stock limits, instant totals, promo coupons (`BOOKWORM10`, `SAVE5`), and free shipping thresholds.
- 💳 **Streamlined Checkout:** Clean 3-tier checkout flow with address validation, delivery options (Standard, Express, Overnight), and multiple payment simulations (Cards, UPI, COD).
- 🎉 **Order Confirmation & Tracking:** Celebratory confetti, unique Order IDs, printable receipts, and full order history tracking backed by local persistence.
- 👤 **Bonus Features:** User authentication (Login, Register, Demo Autofill), Wishlist management, and 16 Vitest unit tests.

---

## 🚀 Key Features

### 1. Home Page (`/`)
- **Hero Banner:** Engaging headline, quick call-to-actions, and statistics counter.
- **Genre Cards:** 7 curated genres (Fiction, Sci-Fi, Mystery, Technology, Biography, Self-Help, Business).
- **Handpicked Titles:** Featured book carousels with price savings indicators.
- **Why Choose Us:** Value proposition cards (100% Genuine Editions, 24hr Dispatch, 30-Day Guarantee).
- **Reader Testimonials:** Authentic reviews and community feedback.
- **Newsletter Subscription:** Interactive signup with immediate toast feedback.

### 2. Catalog & Book Listing Page (`/books`)
- **Live Search Bar:** Real-time debounced query filtering across book title, author, category, and ISBN.
- **Sidebar & Mobile Drawer:** Comprehensive filter controls:
  - Category / Genre selector
  - Price range slider ($0 – $60+)
  - Customer rating filter (4★ & up, 3★ & up)
  - In-Stock Only filter toggle
- **Sorting Options:** Sort by Featured, Price (Low to High / High to Low), Customer Rating, and Title (A-Z / Z-A).
- **View Toggle:** Switch effortlessly between **Grid View** and **List View**.
- **Pagination:** Smooth multi-page navigation with active page indicators.
- **Active Filters Bar:** Dismissable chips for all active filters + 1-click "Clear All".

### 3. Book Details Page (`/books/:id`)
- **Breadcrumb Navigation:** `Home > Catalog > Category > Book Title`.
- **High-Resolution Cover Display:** Zoom preview, discount tags, and instant Wishlist bookmarking.
- **Stock Status Badge:** "In Stock (X available)", "Only 3 left!", or "Out of Stock".
- **Quantity Adjuster:** Prevents adding more than available warehouse inventory.
- **Action Buttons:** "Add to Cart" and "Buy Now" (direct fast checkout).
- **Tabbed Overview:**
  1. *Description & Synopsis:* Full editorial description.
  2. *Specifications Table:* ISBN-13, Publisher, Year, Pages, Binding format, Language.
  3. *Customer Reviews:* Verified reader reviews list + **"Write a Review"** modal with star ratings.
- **Related Books Carousel:** Recommends 4 related titles in the same category.

### 4. Shopping Cart Page (`/cart`)
- **Empty Cart State:** Friendly graphic and quick link back to catalog.
- **Cart Line Items:** Cover thumbnail, title, author, unit price, quantity increment/decrement, line total, move-to-wishlist, and remove.
- **Order Summary:** Real-time calculation of subtotal, applied coupon discounts, estimated sales tax (5%), and shipping costs (FREE over $35).
- **Coupon Code System:**
  - `BOOKWORM10` — 10% off entire order.
  - `SAVE5` — $5.00 flat discount.
  - `FREESHIP` — Free shipping waiver.

### 5. Checkout Page (`/checkout`)
- **Shipping Address Form:** Validated inputs for Full Name, Email, Phone, Address, City, State, ZIP code.
- **Quick Demo Autofill:** One-click button to populate sample testing data.
- **Delivery Speed Method:**
  - Standard Delivery (3–5 days, Free on $35+)
  - Express Tracked (2 days, $9.99)
  - Next-Day Priority (Overnight, $14.99)
- **Payment Method Simulator:**
  - Credit/Debit Card with masked fields and card validation.
  - UPI / Virtual Payment Address.
  - Cash on Delivery (COD).

### 6. Order Confirmation & Tracking (`/order-success/:orderId` & `/orders`)
- **Celebratory Confetti:** Visual celebration on completed purchase using `canvas-confetti`.
- **Order Receipt:** Order ID (e.g. `BK-893421`), itemized receipt, totals, delivery details.
- **Printable Receipt:** One-click invoice printing via browser print dialog.
- **Persistent Order History:** All placed orders are stored in `localStorage` and viewable under `/orders` with status progression (Order Placed ➔ Processing ➔ In Transit ➔ Delivered).

### 7. Wishlist Page (`/wishlist`)
- Save favorite books with 1-click heart icon.
- Move items directly to Cart or remove from wishlist.

### 8. User Authentication (Bonus Feature)
- Dedicated `AuthContext` with login and register modals.
- Persistent session in `localStorage`.
- Auto-populates shipping information at checkout for signed-in users.
- Demo account ready: `alex@example.com` / `password123`.

---

## 🛠️ Tech Stack & Architecture

| Technology | Purpose |
|------------|---------|
| **React 18** | Functional components, hooks (`useState`, `useContext`, `useMemo`, `useCallback`, `useEffect`) |
| **Vite 6** | Ultra-fast build tool and development server |
| **React Router v6** | Client-side routing, dynamic routes (`/books/:id`, `/order-success/:orderId`) |
| **React Context API** | Modular global state (`BookContext`, `CartContext`, `AuthContext`, `ToastContext`) |
| **Tailwind CSS 3** | Responsive, modern utility-first styling with custom palette and components |
| **Lucide React** | Lightweight, accessible SVG icons |
| **Canvas Confetti** | Order confirmation celebratory animation |
| **Vitest & RTL** | Unit testing framework and component testing library |

---

## 📁 Project Directory Structure

```
BookStore/
├── index.html                 # HTML Entry template with Plus Jakarta Sans typography
├── package.json               # Project manifest, dependencies, and scripts
├── postcss.config.js          # PostCSS configuration
├── tailwind.config.js         # Tailwind theme customizations and color palette
├── vite.config.js             # Vite bundler and Vitest configuration
├── public/                    # Static assets
└── src/
    ├── main.jsx               # React DOM entry point
    ├── App.jsx                # Router setup, global layout, and context providers
    ├── index.css              # Tailwind base directives and custom utilities
    ├── assets/                # Images, icons, and logos
    ├── components/
    │   ├── auth/
    │   │   └── AuthModal.jsx          # Login & registration modal with demo autofill
    │   ├── books/
    │   │   ├── BookCard.jsx           # Individual book card with badges & add to cart
    │   │   ├── BookFilters.jsx        # Sidebar/drawer filters (category, price, rating)
    │   │   └── ReviewModal.jsx        # Interactive rating & review submission modal
    │   ├── cart/
    │   │   ├── CartItem.jsx           # Line item row with quantity stepper & remove
    │   │   └── CartSummary.jsx        # Subtotal, discount, shipping, tax & coupon input
    │   └── common/
    │       ├── Navbar.jsx             # Responsive sticky navigation, search & badges
    │       ├── Footer.jsx             # Informational footer, links & newsletter
    │       └── StarRating.jsx         # Accessible star rating display & input component
    ├── context/
    │   ├── AuthContext.jsx            # User authentication, demo account & session state
    │   ├── BookContext.jsx            # Catalog filtering, search, sorting & reviews
    │   ├── CartContext.jsx            # Cart items, coupon discounts & order placement
    │   └── ToastContext.jsx           # Non-blocking notification toasts
    ├── data/
    │   └── booksData.js               # Curated catalog of 16+ diverse books & coupons
    ├── pages/
    │   ├── HomePage.jsx               # Landing page with hero, genres & bestsellers
    │   ├── BooksPage.jsx              # Searchable, filterable & paginated catalog
    │   ├── BookDetailsPage.jsx        # Full product view, specs, reviews & recommendations
    │   ├── CartPage.jsx               # Shopping cart management & order summary
    │   ├── CheckoutPage.jsx           # Multi-step validated checkout & payment selection
    │   ├── OrderSuccessPage.jsx       # Order confirmation, receipt & confetti
    │   ├── OrdersPage.jsx             # Order history & live status tracker
    │   ├── WishlistPage.jsx           # Saved favorite titles
    │   └── NotFoundPage.jsx           # 404 error page
    └── test/
        ├── setup.js                   # Vitest DOM environment setup
        ├── searchFilter.test.js       # Unit tests for search, categories & sort logic
        ├── CartContext.test.jsx       # Unit tests for cart additions, coupons & orders
        └── BookCard.test.jsx          # Component tests for rendering & card actions
```

---

## ⚡ Getting Started & Local Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Venkatesh-Reddy-03/BookStore.git
   cd BookStore
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

4. **Run Unit Tests:**
   ```bash
   npm test
   ```
   Runs Vitest test suite executing all 16 component and context tests.

5. **Build for Production:**
   ```bash
   npm run build
   ```
   Generates optimized static bundle in the `/dist` directory.

---

## 🧪 Unit Tests Overview

The application includes comprehensive unit tests verifying core business logic and UI behavior:

```bash
✓ src/test/searchFilter.test.js (7 tests)
  ✓ correctly filters books by title substring match
  ✓ correctly filters books by author name match
  ✓ filters books accurately by selected genre category
  ✓ filters books within a defined price range
  ✓ filters books by minimum customer rating
  ✓ sorts books by price ascending (low to high)
  ✓ sorts books alphabetically by title A to Z

✓ src/test/CartContext.test.jsx (6 tests)
  ✓ initially has empty cart with 0 items
  ✓ adds item to cart and calculates subtotal correctly
  ✓ updates quantity and adjusts subtotal accordingly
  ✓ applies promotional discount coupon correctly
  ✓ removes item from cart
  ✓ clears cart and places order successfully

✓ src/test/BookCard.test.jsx (3 tests)
  ✓ renders book details including title, author, price, and category
  ✓ renders discount percentage badge when original price is higher
  ✓ has add to cart button

Test Files  3 passed (3)
Tests       16 passed (16)
```

---

## 🎁 Bonus Tasks Implemented

1. **User Authentication System:**
   - Sign in and register modal accessible across all pages.
   - Demo credentials button for immediate evaluation (`alex@example.com` / `password123`).
   - Profile badge in navbar showing user initials and orders shortcut.
   - Auto-fills shipping address during checkout for signed-in users.

2. **Automated Unit Testing Suite:**
   - 16 unit and component tests running on Vitest and React Testing Library.
   - Covers cart math, discount application, search & filter algorithms, and book card rendering.

3. **Persistent Local Storage:**
   - Saved cart items, submitted reviews, placed orders, and wishlist persist across browser refreshes.

4. **High-Polish UI & Micro-interactions:**
   - Toast notifications for add-to-cart, wishlist, review submissions, and coupon codes.
   - Confetti bursts on order placement.
   - Grid View vs List View toggle.
   - Stock limit validation preventing overselling.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
