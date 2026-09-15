# Tattva Art Studio 🏛️✨

A bespoke, high-performance web platform and digital gallery for **Tattva Art Studio**, showcasing contemporary original masterpieces and museum-grade archival prints by artist **Kavita Rajput**.

Engineered with **Next.js 16 (Turbopack)**, **Tailwind CSS v4**, **Prisma ORM**, and **Supabase (PostgreSQL)**, featuring zero-fee domestic UPI acquisition, client commission intake, dynamic inventory management, and role-guarded studio administration.

---

## 🎨 Architectural & Design Philosophy

- **Museum-Quality Aesthetic:** High-contrast palette built on Deep Obsidian (`#121110`), Sapphire Peacock (`#0B2545`), Rich Cream (`#FBF9F5`), and Antique Gold (`#C5A059`).
- **Typography:** Custom Papyrus fantasy serif font stack (`font-['Papyrus',_fantasy,_serif]`) paired with modern clean sans-serif body typefaces.
- **Zero Aspect Distortion:** Artworks are rendered uncropped with strict aspect preservation (`object-contain`) and full-bleed high-resolution lightbox views.
- **Resilient React 19 / Next.js 16 Foundation:** Progressive hydration, async server action transitions, and optimistic UI updates without manual reloads.

---

## ⚡ Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16.2](https://nextjs.org/) | App Router, Server Components, Turbopack, and Next.js Proxy |
| **UI & Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | High-performance CSS engine with native `@theme` color tokens |
| **Database & ORM** | [Prisma 7.8](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) | Type-safe queries, relation mapping, and schema migrations |
| **Auth & Storage** | [Supabase](https://supabase.com/) | SSR cookie sessions, user management, and artwork image bucket storage |
| **Payments** | Dynamic UPI Protocol (`lib/upi.ts`) | Zero-fee direct payments via Google Pay, PhonePe, Paytm QR deep-links |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end strict type safety across database, server, and client |

---

## 🌟 Core Features

### 1. Public Gallery & Discovery
- **Dynamic Infinite Scroll:** Paginated lazy-loading (`GalleryGrid.tsx`) with Intersection Observer, calculating live minimum prices (`From ₹...`) dynamically from relational print variants.
- **Full-Screen Lightbox:** High-resolution modal viewer with touch/click outside dismiss and background scroll locking.
- **Graceful Fallbacks:** Museum-grade empty states and resilient error boundaries preventing page crashes during cold starts.

### 2. Single Artwork Showcase & Zero-Fee UPI Acquisition
- **Variant Selector:** Interactive selection between original paintings and custom print dimensions (`8x10`, `16x20`, `24x36`).
- **Legal Compliance Agreements:** Mandatory client acknowledgments (print-on-demand terms, non-resale/no-duplication agreement, and no-remake policies) logged directly to the order record.
- **Direct UPI Checkout:** Integrated modal calculating invoice amount, registering `Order` & `OrderItem` records in PostgreSQL, and rendering an instant, zero-processing-fee UPI payment QR code.

### 3. Custom Commissions Intake
- **Bespoke Request Form:** Direct communication channel for custom paintings, capturing desired dimensions, color palette, and concept details.
- **Resilient Submissions:** Non-blocking Server Actions providing instant visual feedback upon dispatch without broken redirect traps.

### 4. Collector Collection Room (`/account`)
- **Authentication Flow:** Secure Supabase email/password login and account creation.
- **Saved Address Book:** Server Action-backed shipping address management (`app/actions/address.ts`) with live state invalidation.
- **Order Tracking:** Real-time visibility into personal acquisition history and certificate of authenticity (COA) fulfillment.

### 5. Private Studio Administration (`/admin`)
- **Protected Route Gating (`proxy.ts`):** Brick-wall proxy authorization restricting workspace access to authorized admin credentials.
- **RPC Mutation Security (`lib/auth.ts`):** `verifyAdmin()` guards on all server action endpoints preventing unauthorized direct HTTP calls.
- **Live Inventory Manager:** Add, edit, delete, and archive studio artworks.
- **Dynamic Variant Builder:** Add and remove custom print sizes, pricing, and stock quotas with unawaited-transition protection.
- **Commissions Inbox:** Review customer briefs and update status (`PENDING`, `ACCEPTED`, `DECLINED`) with real-time UI synchronization.

---

## 📂 Project Structure

```
artist-gallery-shop/
├── app/
│   ├── (client)/                    # Public client routes
│   │   ├── about/                   # Meet the Artist & Studio bio
│   │   ├── account/                 # Collector's room & saved addresses
│   │   ├── artwork/[id]/            # Artwork detail & UPI checkout flow
│   │   ├── checkout/actions.ts      # Zero-fee UPI order creation
│   │   ├── commissions/             # Custom artwork request form
│   │   ├── login/ & signup/         # Supabase client authentication
│   │   ├── layout.tsx               # Client header/footer wrapper
│   │   └── page.tsx                 # Studio homepage & infinite gallery
│   ├── actions/                     # Shared public server actions (gallery, address)
│   ├── admin/                       # Protected studio administration
│   │   ├── artworks/                # Inventory table & deletion
│   │   ├── artworks/[id]/           # Detail editor & variant manager
│   │   ├── artworks/new/            # Multi-variant artwork publisher
│   │   ├── commissions/             # Commission request inbox
│   │   ├── login/                   # Admin authentication portal
│   │   ├── layout.tsx               # Responsive admin dashboard layout
│   │   └── page.tsx                 # Real-time studio metrics
│   ├── globals.css                  # Tailwind CSS v4 @theme design tokens
│   └── layout.tsx                   # Global HTML root layout
├── components/
│   ├── Footer.tsx                   # Studio footer & contact links
│   ├── GalleryGrid.tsx              # Infinite scroll grid & image lightbox
│   ├── Navbar.tsx                   # Responsive luxury header & profile dropdown
│   └── VariantEditor.tsx            # Live variant manager with async transitions
├── lib/
│   ├── auth.ts                      # Server-side admin verification guard
│   ├── db.ts                        # Singleton Prisma client instance
│   ├── supabase.ts                  # Supabase SSR server client helper
│   └── upi.ts                       # Dynamic UPI string & QR code generator
├── prisma/
│   ├── schema.prisma                # PostgreSQL relational database schema
│   └── seed.ts                      # Studio gallery seed script
├── next.config.ts                   # Next.js image domain whitelist & compilation config
└── proxy.ts                         # Next.js 16 route protection proxy
```

---

## 🗄️ Database Schema (`prisma/schema.prisma`)

The database consists of 5 interconnected relational models:

- **`Artwork`:** Master inventory record (Title, description, image URL, dimensions, category, availability).
- **`PrintVariant`:** Print options tied via foreign key (`artworkId`) with cascade delete (Size, price, stock).
- **`Commission`:** Custom art inquiries (Name, email, details, requested size, status: `PENDING` / `ACCEPTED` / `DECLINED`).
- **`Order`:** Immutable acquisition snapshots (Customer info, total amount, `PaymentStatus`, `FulfillmentStatus`, legal compliance timestamps).
- **`OrderItem`:** Line items connecting orders to artworks and variant sizes.
- **`Address`:** Collector shipping address book indexed by Supabase `userId`.

---

## 🛠️ Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Supabase PostgreSQL Connection Strings
DATABASE_URL="postgresql://postgres:[PASSWORD]@[HOST]:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres:[PASSWORD]@[HOST]:5432/postgres"

# Supabase Client Authentication & Storage
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"

# Studio Domestic Payments (UPI)
NEXT_PUBLIC_STUDIO_UPI_ID="yourname@upi"

# Studio Administration (Optional, grants sole admin privileges)
ADMIN_EMAIL="kavita@studio.com"
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate Prisma Client & Run Migrations
```bash
npx prisma generate
npx prisma db push
```

### 3. Seed Studio Inventory (Optional)
```bash
npx prisma db seed
```

### 4. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the gallery.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🛡️ Security & Performance Highlights

- **Route & Action Protection:** Next.js 16 Proxy intercepts unauthenticated access to `/admin/*`, and `verifyAdmin()` blocks direct RPC manipulation.
- **Cache Invalidation:** Target `revalidatePath` calls invalidate `/`, `/artwork/[id]`, `/admin/artworks`, and `/admin/commissions` synchronously upon any database write.
- **Image Optimization:** Remote patterns configured for Supabase Storage and studio Unsplash photography with zero layout shift (`priority` on hero & lightbox views).
- **Mobile Responsive:** Breakpoint audits across phones, tablets, and wide screens with horizontal table overflow controls and responsive sidebar collapsing.

---

## 📜 License & Copyright

© 2026 **Tattva Art Studio**. Artworks and concepts by **Kavita Rajput**. All Rights Reserved.  
Unauthorized reproduction, distribution, or commercial duplication of any artwork is strictly prohibited.
