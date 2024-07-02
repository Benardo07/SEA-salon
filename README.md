```markdown
# SEA Salon Website

## Description
SEA Salon is a cutting-edge web platform designed to enhance the management and booking of salon services. It provides an intuitive interface for both salon managers and clients, allowing seamless interaction and engagement with the services offered. The website is accessible live at [SEA Salon Live Site](https://sea-salon-plum.vercel.app/).

## Purpose
The primary purpose of SEA Salon is to facilitate comprehensive management of salon operations including listings of services, schedules of stylists, client bookings, and administrative tasks—all within a single, user-friendly platform. It aims to elevate the customer experience by simplifying interaction and access to services.

## Features
- **Service Management**: Enables adding, updating, and deleting salon services efficiently.
- **Stylist Management**: Manages profiles and schedules of stylists to ensure smooth operations.
- **Branch Management**: Enables adding, updating, and deleting salon branches efficiently.
- **Client Bookings**: Allows clients to book appointments easily with real-time updates on availability.
- **Responsive Design**: Ensures the website is fully responsive and functional across both desktop and mobile devices.
- **Secure Authentication**: Implements secure login and authentication mechanisms for managing user profiles and sessions.
- **Image Storage**: Utilizes Cloudinary for efficient handling of image uploads and media management.

## Frameworks and Tools Used
- **Next.js**: A React framework for building scalable server-side rendered web applications.
- **React**: A robust JavaScript library for creating dynamic and interactive user interfaces.
- **TailwindCSS**: A utility-first CSS framework for rapidly designing custom user interfaces.
- **Typescript**: Enhances development with static type definitions, helping to prevent bugs and improve code quality.
- **NextAuth**: Provides authentication solutions specifically tailored for Next.js applications.
- **Cloudinary**: Offers a comprehensive cloud-based image and video management service.
- **Aiven for PostgreSQL**: Delivers a fully-managed cloud database service hosted across major cloud providers.
- **Prisma**: Acts as a next-generation ORM for Node.js and TypeScript, streamlining database workflows.
- **bcrypt**: Facilitates secure password hashing functionalities.
- **Swiper**: Used for creating touch sliders, ideal for presentations and showcasing content.

## How to Run 
To access the app, you can just simply go to: 
https://sea-salon-plum.vercel.app/

To run it locally: 
1. **Clone the repository:**
   ```bash
   git clone https://github.com/Benardo07/SEA-salon.git
   cd SEA-salon
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up environment variables:**
   Create a `.env.local` file in the root directory. Populate it with the necessary environment variables:
   ```plaintext
   DATABASE_URL="your_postgresql_database_url"
   NEXTAUTH_SECRET="your_secret"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloudinary_cloud_name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_KEY="your_cloudinary_api_key"
   CLOUDINARY_API_SECRET="your_cloudinary_api_secret"
   ```
   .env for this project: 
   ```plaintext
   DATABASE_URL=postgres://avnadmin:AVNS_naBaRsjsU2acdla9JSG@pg-7f676dd-benardo188.c.aivencloud.com:20799/defaultdb?sslmode=require
   NEXTAUTH_SECRET="rahasiabos"
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dkfay0pf9
   NEXT_PUBLIC_CLOUDINARY_API_KEY=562336563265473
   CLOUDINARY_API_KEY=562336563265473
   CLOUDINARY_API_SECRET=EaeBqWtDIJK6vBrqgHqYttEbyB8
   CLOUDINARY_CLOUD_NAME=dkfay0pf9
   ```
4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Access the application via `http://localhost:3000` in your web browser.

## Additional Features
- **Reveal Animation**: Implement reveal aniamtion when scroll on page
- **Loading Amimation**: Implement loading aniamtion when swith page

