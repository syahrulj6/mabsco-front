# Mabsco Frontend

> **Bringing gamers together! 🎮**

## 📌 Table of Contents

- [About Mabsco](#about-mabsco)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## 🎮 About Mabsco

**Mabsco** is a gaming community platform designed for gamers to connect, create threads, and discuss gaming-related topics. Whether you want to team up for a match or share your gaming experiences, Mabsco makes it easier than ever!

## 🚀 Features

✅ Create and post threads  
💬 Comment on discussions  
❤️ Like and engage with posts  
🛠️ Seamless user onboarding  
👤 Profile pages for user activity tracking  
📊 Interactive and dynamic UI/UX  

## 🛠️ Tech Stack

- **Frontend:** Next.js (TypeScript), Tailwind CSS
- **State Management & Data Fetching:** TanStack Query
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **API Communication:** REST API

## 📁 Project Structure

```plaintext
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
```

## ⚙️ Installation

1️⃣ **Clone the repository:**
```sh
git clone https://github.com/syahrulj6/mabsco-front.git
cd mabsco-front
```

2️⃣ **Install dependencies:**
```sh
npm install  # or yarn install
```

3️⃣ **Setup environment variables:**  
Create a `.env.local` file and add necessary variables (see the next section).

## 🔐 Environment Variables

Ensure the following environment variables are set up in your `.env.local` file:

```sh
NEXT_PUBLIC_API_URL=your_backend_api_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=http://localhost:3000
```
Modify as needed based on your backend configuration.

## ▶️ Usage

Start the development server:
```sh
npm run dev  # or yarn dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.

## 🤝 Contributing

We welcome contributions! 🚀  
If you have ideas for improvement, feel free to open an **issue** or submit a **pull request**.

---
**Mabsco - The Ultimate Gaming Hub! 🎮🔥**

