# Crypto Dashboard (KryPto)

Cryptocurrency dashboard built to track crypto prices and market trends in real-time. It's clean, simple to use, and shows you everything you need to know about your favorite cryptocurrencies.

- Shows live prices and market data
- Track the biggest gainers and losers
- View price charts (24h, 7d, 14d, 1m, etc.)
- See market stats and trends
- Auto-updates every minute
- Works great on mobile too!

## Routes

- `/` - Main dashboard with market overview
- `/top-gainers` - View all cryptocurrencies with highest price gains
- `/top-losers` - View all cryptocurrencies with biggest price drops
- `/coin/:id` - Detailed view of a specific cryptocurrency

## API Endpoints

```
GET /api/v3/global                 // Get overall market stats
GET /api/v3/coins/markets          // Get list of cryptocurrencies
GET /api/v3/coins/:id/market_chart // Get historical data
GET /api/v3/coins/:id              // Get detailed coin information
```

You'll need:
- Node.js installed on your computer
- npm or yarn package manager

Here's how to get it running:

1. First, clone this project:
```bash
git clone https://github.com/yourusername/crypto-dashboard.git
cd crypto-dashboard
```

2. Install the required packages:
```bash
npm install
```

3. Start it up:
```bash
npm start
```

That's it! The dashboard should open in your browser automatically.

## How it's built 

I built this using:
- React for the frontend
- TailwindCSS for styling
- CoinGecko's API for crypto data
- React Router for navigation
- Some nice icons from React Icons



---
