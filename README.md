# Bloque Leaderboard

A modern, responsive leaderboard application built with Next.js, showcasing player rankings and market items from the Bloque game.

## Live Demo

Check out the live application at: [https://leaderboard-bloque-test.vercel.app/](https://leaderboard-bloque-test.vercel.app/)

## Features

- 🏆 **Interactive Leaderboard**

  - Real-time player rankings
  - Special styling for top 3 players
  - Responsive table design
  - Pagination with 30 players per page
  - Hover effects on usernames

- 🛒 **Market Section**

  - Grid layout for items
  - Detailed item information
  - Responsive card design
  - Pagination with 20 items per page

- 🎨 **Modern UI/UX**

  - Clean and professional design
  - Responsive layout for all devices
  - Smooth animations and transitions
  - Roboto font family
  - Custom color scheme

- 📱 **Responsive Design**
  - Mobile-first approach
  - Adaptive pagination (5 pages on mobile, 10 on desktop)
  - Horizontal scroll for pagination on mobile
  - Optimized table display

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Font**: Roboto (Google Fonts)
- **PWA Support**: next-pwa

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/bloque-leaderboard.git
   cd bloque-leaderboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
bloque-leaderboard/
├── pages/
│   ├── _app.tsx        # App configuration
│   ├── _document.tsx   # Document configuration
│   └── index.tsx       # Main page
├── public/             # Static assets
├── styles/             # Global styles
├── next.config.mjs     # Next.js configuration
└── package.json        # Dependencies
```

## API Integration

The application fetches data from the following endpoints:

- Leaderboard: `https://api-game.bloque.app/game/leaderboard`
- Market: `https://api-game.bloque.app/game/market`

## Styling Features

### Leaderboard

- Top 3 players highlighted with special backgrounds
- Gold, silver, and bronze medals for top positions
- Hover effects on usernames with zoom animation
- Responsive table with horizontal scroll on mobile

### Market

- Grid layout with responsive columns
- Card-based design with hover effects
- Clean typography with Roboto font
- Consistent color scheme

### Pagination

- Mobile: Shows 5 pages with horizontal scroll
- Desktop: Shows 10 pages
- Current page highlighted
- Smooth transitions between pages

## Performance Optimizations

- Image optimization
- Font optimization with next/font
- PWA support for offline access
- Efficient data fetching
- Responsive image loading

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide React](https://lucide.dev/)
- [Roboto Font](https://fonts.google.com/specimen/Roboto)
