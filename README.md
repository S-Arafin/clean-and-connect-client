🌍 CleanConnect - Community Issue Tracker
Live Site: https://clean-and-connect.web.app/

Backend API (Vercel): https://clean-and-connect-server.vercel.app/

To log in for demo, there is already a built-in button.<br>
Email: demo@email.com<br>
password: @12345

CleanConnect is a professional full-stack MERN application designed to bridge the gap between community environmental problems and collective solutions. Citizens can report local issues—such as garbage buildup or road damage—and the community can crowdfund the required budget to resolve them.

🚀 Key Features
Premium Skeleton Loading System: Implemented a sophisticated loading experience using DaisyUI and Framer Motion, ensuring a smooth, layout-shift-free experience on all data-heavy pages (Home, All Issues, Dashboards).

Secure Authentication & Recovery: Robust identity management via Firebase Auth, featuring Google Social Login, JWT-secured routes, and a built-in Password Reset flow for forgotten credentials.

Dynamic Financial Dashboard: A high-end user dashboard providing a "Financial Impact" summary, interactive contribution logs, and visualized impact metrics using Recharts.

Smart Status & Automation: Issues move dynamically from "Open" to "Resolved." The system automatically triggers a status update once community contributions meet or exceed the estimated budget.

Professional PDF Reporting: Integrated jsPDF and AutoTable to allow users to download official "Impact Reports" summarizing their contributions with transaction IDs and dates.

Contact & Communication: Integrated EmailJS to handle community inquiries directly from the frontend, ensuring reliable delivery without the need for a dedicated SMTP server.

Advanced Filtering & Search: A lightning-fast search system with category-based filtering and custom pagination for seamless navigation through community reports.

🛠️ Technologies Used
Frontend (Client)
React 19 (Vite): Leveraging the latest use() hooks for modern context management.

Tailwind CSS & DaisyUI: Custom thematic styling with high-contrast visual hierarchy.

Framer Motion: For premium "Entrance" animations and skeleton pulse effects.

Recharts: Beautiful data visualization for community and personal impact statistics.

Lucide React: A consistent, high-quality icon set used throughout the UI.

Axios: Optimized HTTP client for backend communication.

EmailJS: For serverless contact form functionality.

Backend (Server)
Node.js & Express.js: Scalable RESTful API architecture.

MongoDB (Atlas): NoSQL database for efficient storage of issues and donation logs.

Vercel: Optimized deployment for the backend environment.


Bash

git clone https://github.com/S-Arafin/clean-and-connect.git
Install dependencies:

Bash

npm install
Environment Variables: Create a .env file in the root and add your Firebase and EmailJS credentials:

Code snippet

VITE_FIREBASE_API_KEY=your_key
VITE_EMAILJS_SERVICE_ID=your_id
VITE_EMAILJS_TEMPLATE_ID=your_template
VITE_EMAILJS_PUBLIC_KEY=your_public_key
Run the application:

Bash

npm run dev
🛡️ License
This project is developed for community empowerment and portfolio demonstration. All rights reserved by Sultanul Arafin.
