Mabsco Frontend

Table of Contents

About Mabsco

Features

Tech Stack

Project Structure

Installation

Environment Variables

Usage

Contributing

License

About Mabsco

Mabsco is a gaming community platform similar to Threads, designed specifically for gamers to create and engage with threads about playing games together, sharing gaming experiences, and discussing gaming-related topics.

Features

📝 Create and post threads

💬 Comment on threads

❤️ Like posts

🚀 User onboarding experience

👤 Profile pages to view user activity

📊 Interactive and engaging UI/UX

Tech Stack

Frontend: Next.js (TypeScript), Tailwind CSS

State and fetch data: Tanstack Query 

Database: PostgreSQL

ORM: Prisma

Authentication: NextAuth.js

API Communication: REST API

Project Structure

mabsco-front/
├── public/             # Static assets (images, fonts, etc.)
├── src/
│   ├── app/            # App Router (if using Next.js 13+)
│   ├── components/     # Reusable UI components
│   ├── hooks/          # Custom React hooks
│   ├── context/        # Global state management
│   ├── lib/            # Utility functions and configurations
│   ├── services/       # API service functions
│   ├── styles/         # Global and component-specific styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # General helper functions
│   └── pages/          # Page components (if using Pages Router)
├── .env.local          # Environment variables
├── .gitignore          # Git ignore file
├── next.config.js      # Next.js configuration
├── package.json        # Project dependencies
├── README.md           # Project documentation
└── tsconfig.json       # TypeScript configuration

Installation

Clone the repository:

git clone https://github.com/syahrulj6/mabsco-front.git
cd mabsco-front

Install dependencies:

npm install  # or yarn install

Setup environment variables:
Create a .env.local file and add necessary environment variables (see the next section).

Environment Variables

Ensure you have the following environment variables set up in your .env.local file:

NEXT_PUBLIC_API_URL=your_backend_api_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000

Modify as needed based on your backend configuration.

Usage

Start the development server:

npm run dev  # or yarn dev

Open http://localhost:3000 in your browser to see the app in action.

Contributing

Contributions are welcome! If you have any ideas, feel free to open an issue or submit a pull request.


🚀 Mabsco - Bringing gamers together! 🎮
