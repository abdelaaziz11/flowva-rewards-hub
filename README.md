# Flowva Rewards Hub

A complete recreation of the Flowva Rewards platform with React, Supabase, and Tailwind CSS.

## 🎯 Features

- **Points System**: Earn points through daily check-ins, referrals, and activities
- **Daily Streaks**: Track consecutive daily logins with visual streak calendar
- **Rewards Catalog**: Browse and redeem rewards with points
- **Referral System**: Invite friends and earn bonus points
- **Notifications**: Real-time notification system
- **User Dashboard**: Comprehensive rewards journey tracking

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm
- Supabase account (free tier works)
- Git

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/abdelaaziz11/flowva-rewards-hub.git
cd flowva-rewards-hub

# Install dependencies
npm install
```

### 2. Setup Supabase

#### Create a New Project

1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Wait for database provisioning (2-3 minutes)
4. Copy your project URL and anon key

#### Run Database Migrations

Copy the SQL from the `database/` folder and run in Supabase SQL Editor:

```sql
-- 1. Create tables (from database/01_create_tables.sql)
-- 2. Create functions (from database/02_create_functions.sql)
-- 3. Create triggers (from database/03_create_triggers.sql)
-- 4. Setup RLS (from database/04_row_level_security.sql)
-- 5. Insert sample data (from database/05_sample_data.sql)
```

### 3. Configure Environment

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local and add your Supabase credentials
REACT_APP_SUPABASE_URL=https://xxxxx.supabase.co
REACT_APP_SUPABASE_ANON_KEY=anon-key-here
REACT_APP_BASE_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
flowva-rewards-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Common/          # Buttons, Spinners, etc.
│   │   ├── Layout/          # Sidebar, Header, Navigation
│   │   ├── Notifications/   # Notification components
│   │   └── Rewards/         # Rewards-specific components
│   │
│   ├── pages/               # Page components
│   │   └── RewardsHub/      # Main rewards page
│   │
│   ├── services/            # API service layer
│   │   ├── supabase.js      # Supabase client configuration
│   │   ├── auth.service.js  # Authentication logic
│   │   ├── points.service.js # Points operations
│   │   ├── rewards.service.js # Rewards CRUD
│   │   └── notifications.service.js # Notifications
│   │
│   ├── hooks/               # Custom React hooks
│   │   ├── useAuth.js       # Authentication hook
│   │   ├── usePoints.js     # Points management
│   │   ├── useRewards.js    # Rewards data
│   │   └── useNotifications.js # Notifications
│   │
│   ├── context/             # React Context providers
│   │   ├── AuthContext.jsx  # Auth state
│   │   └── RewardsContext.jsx # Rewards state
│   │
│   ├── utils/               # Utility functions
│   │   ├── constants.js     # App constants
│   │   ├── helpers.js       # Helper functions
│   │   └── validators.js    # Input validation
│   │
│   ├── App.jsx              # Root component
│   ├── index.js             # Entry point
│   └── index.css            # Tailwind imports
│
├── database/                # Supabase SQL migrations
│   ├── 01_create_tables.sql
│   ├── 02_create_functions.sql
│   ├── 03_create_triggers.sql
│   ├── 04_row_level_security.sql
│   └── 05_sample_data.sql
│
├── .env.example             # Environment template
├── .env.local               # Your environment (gitignored)
├── tailwind.config.js       # Tailwind configuration
├── package.json             # Dependencies
└── README.md                # This file
```

## 🗄️ Database Schema

### Core Tables

- **user_points**: User points balance and streak data
- **rewards**: Available rewards catalog
- **user_redemptions**: Track user reward redemptions
- **points_transactions**: Log all points activities
- **notifications**: User notifications
- **referrals**: Track referral relationships

### Key Functions

- `claim_daily_points(user_uuid)`: Handle daily check-in logic
- `get_user_stats(user_uuid)`: Fetch comprehensive user statistics

## 🎨 Component Architecture

### Layout Components
- `Sidebar`: Main navigation sidebar
- `Header`: Page header with notifications
- `NavItem`: Individual navigation items

### Rewards Components
- `PointsBalance`: Display user points and progress
- `DailyStreak`: Daily check-in calendar
- `FeaturedTool`: Highlight promotional tools
- `RewardCard`: Individual reward display
- `ReferralSection`: Referral link sharing
- `EarnMorePoints`: Additional earning opportunities

### Common Components
- `LoadingSpinner`: Loading state indicator
- `Button`: Reusable button with variants

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom purple branding:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f5f3ff',
        500: '#8b5cf6',
        600: '#7c3aed',
        // ... more shades
      }
    }
  }
}
```

### Supabase Configuration

```javascript
// src/services/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);
```

## 🔐 Authentication

The app uses Supabase Auth with email/password:

```javascript
// Sign up
await authService.signUp(email, password, { name: 'John Doe' });

// Sign in
await authService.signIn(email, password);

// Sign out
await authService.signOut();

// Get current user
const user = await authService.getCurrentUser();
```

## 💾 Data Management

### Using Custom Hooks

```javascript
// In your component
const { points, streak, claimDaily } = usePoints(userId);
const { rewards, redeemReward } = useRewards(userId);
const { notifications, markAsRead } = useNotifications(userId);
```

### Direct Service Usage

```javascript
// Points
import { pointsService } from './services/points.service';
await pointsService.claimDailyPoints(userId);

// Rewards
import { rewardsService } from './services/rewards.service';
await rewardsService.redeemReward(userId, rewardId, userPoints);
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - REACT_APP_SUPABASE_URL
# - REACT_APP_SUPABASE_ANON_KEY
# - REACT_APP_BASE_URL
```

### Netlify

```bash
# Build command
npm run build

# Publish directory
build

# Environment variables
Add in Netlify dashboard
```

### Build for Production

```bash
npm run build
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User can sign up and sign in
- [ ] Points balance displays correctly
- [ ] Daily check-in works and updates streak
- [ ] Rewards can be filtered (All, Unlocked, Locked)
- [ ] Reward redemption deducts correct points
- [ ] Referral link can be copied
- [ ] Notifications display and can be marked as read
- [ ] Navigation between tabs works smoothly

## 🐛 Troubleshooting

### Common Issues

**1. Supabase connection error**
```
Error: Invalid Supabase URL or Key
```
Solution: Check `.env.local` has correct values

**2. RLS (Row Level Security) errors**
```
Error: new row violates row-level security policy
```
Solution: Ensure RLS policies are correctly set up

**3. Points not updating**
```
Points remain the same after claiming
```
Solution: Check Supabase RPC function is deployed

**4. Rewards not loading**
```
Rewards list is empty
```
Solution: Run sample data SQL script

## 📝 Assumptions & Trade-offs

### Assumptions Made

1. **User Authentication**: Users are already authenticated; no login page implemented
2. **Single Currency**: Only points system, no secondary currencies
3. **Instant Redemption**: Rewards are instantly marked as redeemed
4. **Mock Referral Stats**: Referral counting is simplified
5. **No Image Uploads**: Rewards use emoji icons instead of images

### Trade-offs

1. **Real-time Updates**: Not using Supabase real-time subscriptions (can be added)
2. **File Storage**: No Supabase Storage integration (rewards use emojis)
3. **Payment Processing**: Redemption fulfillment is manual
4. **Email Notifications**: Not implemented (can use Supabase Auth triggers)
5. **Advanced Analytics**: Basic tracking only

### Production Enhancements

For a production deployment, consider:

- Add authentication pages (login, signup, password reset)
- Implement Supabase real-time subscriptions
- Add email notifications for redemptions
- Integrate payment gateway for reward fulfillment
- Add admin dashboard for reward management
- Implement rate limiting and abuse prevention
- Add comprehensive error tracking (Sentry)
- Setup monitoring and analytics
- Add automated testing (Jest, React Testing Library)
- Implement CI/CD pipeline

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is created as an assessment task. All rights reserved.

## 🙏 Acknowledgments

- **Flowva** for the original design inspiration
- **Supabase** for the excellent backend platform
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide Icons** for beautiful React icons

## 📧 Contact

For questions or feedback, please contact:
- Email: abdelkhouda055@gmail.com
- GitHub: [@abdelaaziz11](https://github.com/abdelaaziz11)

---

**Live Demo**:  https://flowva-rewards-hub.netlify.app
**GitHub Repository**: https://github.com/abdelaaziz11/flowva-rewards-hub

Made with ❤️ for the Flowva assessment