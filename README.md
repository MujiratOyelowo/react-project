PEAKS & SPICES: A CULTURAL FUSION WEB APP

A modern, mobile-first web application celebrating the culinary harmony between Nepalese and Nigerian cuisine. Built with React, Firebase, and Axios, this prototype includes a dynamic menu, real-time reservations, event announcements, and an admin dashboard.

✨ Features:

🔥 Dynamic Menu with Fusion, Nepalese, Nigerian dishes & pricing

🎯 "Today's Specials" dynamically fetched from JSON or Firebase

📆 Reservations with form validation and toast confirmation

📍 Google Maps integration for the restaurant's location

💌 Contact form with real-time Firebase storage

📣 Event Listings (recurring & upcoming) with media and details

🔐 Admin Panel to manage reservations, menu, specials, contact info, and events

📱 Responsive Design with mobile-first layout and accessible UI

🛠️ Tech Stack:

Frontend: React 19, React Router DOM, Axios

Styling: Sass (SCSS), Bootstrap 5, React Bootstrap

Backend: Firebase Firestore

Other Libraries:

React Toastify (form feedback)

React Icons

@react-google-maps/api

⚙️ Installation:

git clone https://github.com/yourusername/peaks-and-spices.git
cd peaks-and-spices
npm install
npm start

🔑 Firebase Setup:

Create a Firebase project on firebase.google.com

Enable Firestore Database

Enable Firebase Authentication (if admin login is needed later)

Copy your config from Firebase and paste into /src/firebase.js

🚀 Usage:

Browse the menu or homepage to explore dishes

Submit reservations or contact messages (stored in Firestore)

View current or upcoming events

Admin can update everything from /admin

🔧 Admin Guide:

Available at /admin
Admin can:

View & delete reservations

Edit and update menu items

Modify “Today’s Specials”

Update contact details

Add or remove events

🖼️ Screenshots:

Home Page
![image](https://github.com/user-attachments/assets/39941346-1d3e-491d-8829-f17bfe65824e)

Menu Page
![image](https://github.com/user-attachments/assets/46139edc-4c95-4bd4-b281-3635d1b8b765)

Events Page
![image](https://github.com/user-attachments/assets/90411c46-d2c7-4252-bd51-d6cc884e5166)



