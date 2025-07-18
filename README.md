# MyMSME - Enterprise Digital Gateway

[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.4.1-brightgreen)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-2.51.0-green)](https://supabase.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.11-blueviolet)](https://tailwindcss.com/)
[![i18next](https://img.shields.io/badge/i18next-25.3.2-orange)](https://www.i18next.com/)

MyMSME is a comprehensive platform providing digital solutions for Micro, Small, and Medium Enterprises (MSME), helping businesses achieve digital transformation, improve operational efficiency, and streamline business processes.

## Features

- **Multi-language Support**: Chinese, English, and Malay
- **Enterprise Level Classification**: Differentiated features for micro, small, and medium enterprises
- **E-Invoice System**: Create, manage, and track electronic invoices
- **QR Code Payment**: Integrated with DuitNow payment gateway
- **Company Registration & Management**: Streamlined business registration and approval process
- **User Authentication**: Support for IC number and company ID login
- **Responsive Design**: Compatible with various device sizes

## Quick Start

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher
- Supabase account and project

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/yourusername/MyMSME.git
cd MyMSME/enterprise-digital-gateway
```

2. Install dependencies

```bash
npm install
```

3. Create environment variables file

Create a `.env` file based on the `.env.sample` template:

```bash
cp .env.sample .env
```

Then edit the `.env` file with your Supabase project credentials.

4. Start the development server

```bash
npm run dev
```

The application will run at http://localhost:5173.

## Environment Variables

Create a `.env` file with the following variables:

```
# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
VITE_APP_NAME=MyMSME
VITE_APP_VERSION=1.0.0
```

## Project Structure

```
enterprise-digital-gateway/
├── public/              # Static assets
├── src/
│   ├── components/      # UI components
│   │   ├── ui/          # Base UI components (shadcn)
│   │   └── ...          # Business components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom hooks
│   ├── i18n/            # Internationalization resources
│   ├── lib/             # Utility libraries
│   ├── pages/           # Page components
│   ├── services/        # API services
│   └── utils/           # Utility functions
├── .env.sample          # Environment variables example
├── index.html           # HTML entry
├── package.json         # Dependencies configuration
├── tailwind.config.ts   # Tailwind configuration
└── vite.config.ts       # Vite configuration
```

## Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router
- **Backend Services**: Supabase (Authentication, Database)
- **Internationalization**: i18next
- **Charts**: Recharts
- **Form Handling**: React Hook Form + Zod

## Database Models

Main data models include:

- **User**: User information including IC number, name, contact details, etc.
- **Company**: Company information including business name, type, address, etc.
- **Transaction**: Transaction records

## Deployment

The project can be deployed to Vercel, Netlify, or any static site hosting service:

```bash
# Build for production
npm run build

# Preview build
npm run preview
```

## Demo Accounts

The system includes several demo accounts to test different enterprise levels:

- **Micro Enterprise**: IC 010101010101, Password Qwerty123!
- **Small Enterprise**: IC 020202020202, Password Qwerty123!
- **Medium Enterprise**: IC 030303030303, Password Qwerty123!
