# SUB-KULTR

Kochi's exclusive underground electronic music booking and private ticketing platform.

## Overview

SUB-KULTR is a premium, cyberpunk-themed full-stack web application designed to connect world-class electronic music DJs with exclusive private venues and curated underground events across Kochi, Kerala.

## Features

### 🎭 Four Core Views

#### 1. **HOMEPAGE (The Landing)**
- Hero section with bold cyberpunk aesthetic
- Exclusive vibe messaging: "KOCHI'S PULSE. DECENTRALIZED."
- Interactive CTA buttons routing to Artist Roster and Event Radar
- 2026-2027 trend highlights banner

#### 2. **FIND & BOOK ARTISTS (The Roster)**
- Advanced filter system (Genres, Set Duration, Price Tier)
- Premium artist cards with:
  - High-contrast profile photography
  - Sound signature descriptions
  - Interactive audio preview players
  - "Request Availability / Book" buttons
- Contextual booking modal capturing event details

#### 3. **THE RADAR (Upcoming Events)**
- Exclusive underground event feed
- Real-time capacity meters (e.g., "114/150 slots claimed")
- Secret coordinates disclosure (4 hours before kickoff)
- Interactive ticket modal with:
  - Ticket type selection (Standard/VIP)
  - Quantity selector
  - Payment gateway mock (Card/UPI)
  - Price breakdown

#### 4. **ARTIST ONBOARDING (Join the Roster)**
- Fully functional artist signup form
- Captures: Stage Name, Sub-genres, SoundCloud/Mixcloud links, Technical Rider, Min Fee
- Success state confirmation

## Design System

### Color Palette
- **Primary Black**: `#050505` - Deep, minimalist base
- **Acid Green/Yellow**: `#CCFF00` - Neon accents, interactive elements
- **Industrial Gray**: `#1a1a1a`, `#2d2d2d`, `#3d3d3d` - Hierarchy & depth

### Typography
- Sans-serif system fonts with bold, futuristic weight
- High contrast for cyberpunk aesthetic

### Components
- Responsive mobile-first navigation
- State-based modals (booking, ticketing)
- Interactive filters and search
- Animated capacity meters
- Form validation and success states

## Mock Data

The platform includes:
- **5 Premium DJs**: VEXA, KRYPTON, LUNA_NOIR, CIPHER, IRIS
- **3 Exclusive Events**: Sundowner Gathering (Friday), Warehouse Session (Saturday), Minimal Horizons (Saturday)
- **8 Genre Tags**: Melodic Techno, Peak Time, Minimal, EBM, Deep House, Hard Techno, Industrial, Psy-Trance

## Tech Stack

- **Frontend Framework**: React 18.2
- **Styling**: Tailwind CSS 3.3
- **Icons**: Lucide React 0.294
- **Build Tool**: Vite 5.0
- **Language**: TypeScript 5.2

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Responsive nav with mobile menu
│   ├── Homepage.tsx            # Hero landing page
│   ├── ArtistRoster.tsx        # DJ booking grid with filters
│   ├── EventRadar.tsx          # Event feed with capacity tracking
│   ├── ArtistOnboarding.tsx    # DJ signup form
│   └── modals/
│       ├── BookingModal.tsx    # Artist booking form
│       └── TicketModal.tsx     # Event ticket checkout
├── data/
│   └── mockData.ts             # Mock artists, events, metadata
├── types.ts                    # TypeScript interfaces
├── App.tsx                     # Main app router/tab container
├── main.tsx                    # React entry point
└── index.css                   # Global styles
```

## Key Features

✅ **Fully Functional State Management** - Tabs, modals, forms, filters all work seamlessly
✅ **Responsive Design** - Mobile-optimized navigation, touch-friendly interfaces
✅ **Interactive UI** - Audio previews, capacity meters, animated transitions
✅ **Form Validation** - Real-time validation on booking and onboarding forms
✅ **Success States** - Confirmation modals and messages for user actions
✅ **Cyberpunk Aesthetic** - Dark mode, neon accents, industrial typography

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge) with ES2020+ support.

## Author

Built for SUB-KULTR © 2026

## License

Private / Proprietary
