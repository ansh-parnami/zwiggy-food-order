

🍽️ Zwiggy – Full-Stack Food Ordering App

Zwiggy – Food Ordering Site is a sleek and responsive food ordering platform built with Spring Boot and React. Users can securely register and log in using a JWT-based authentication system, ensuring that only authorized users can place orders and access their personal order history. Once logged in, users can browse meals, manage their cart, and enjoy a personalized checkout flow with subtle animations and toast alerts enhancing the overall experience.

Orders are stored in MySQL, and users receive instant order confirmations via email notifications. Authentication also ensures that order history, cart data, and profile information remain private and accessible only to the logged-in user.


---

🚀 Features

🧾 Browse Meals – Explore curated meals with images, prices, and descriptions

🛒 Cart System – Add/remove items in real-time using React Context API

📨 Email Confirmation – Instant order email via SMTP (Gmail)

💾 Order Persistence – All orders saved in a MySQL database

📃 Order History – View past orders on a dedicated page

🔐 User Authentication (Optional) – Register/login to view personal order history OR for ordering your cart

🔍 Search Meals – Filter meals by name or description

💫 Framer Motion Animations (New!) – Smooth transitions for modals, pages, and cart updates

🔔 Toast Notifications (New!) – Real-time feedback for add-to-cart, order placed, etc.

🔁 Clean UX – Checkout via modal with form validation and loading states

📱 Mobile Friendly – Fully responsive design using CSS Modules



---

🧰 Tech Stack

Layer	Tech

🧠 Backend	Spring Boot, Spring Data JPA, MySQL, Spring Security (optional)
🎨 Frontend	React (Vite), Context API, CSS Modules, Framer Motion, React Toastify
✉️ Email	Spring Mail (SMTP: Gmail)
🔐 Auth	JWT-based login/signup (optional)
📦 Build Tools	Maven (backend), npm (frontend)


