
A full-stack, session-based message board where users can sign up, log in, write messages, and manage their posts. Built with **Node.js**, **Express**, **EJS**, **PostgreSQL**, and **Passport.js**, it’s a clean and responsive app with a modern UI and expressive front-end logic.

---

##  Features

###  Authentication & Authorization
- **User Registration & Login** with hashed passwords
- Session persistence via **connect-pg-simple**
- **Authorization check**: Only post authors can update or delete their messages

### Messaging System
- Write, view messages from any user
- Responsive **grid layout** for previewing posts with truncation
- Full message view with timestamp and author details

### Clean UI with CSS3
- Fully styled pages including:
  - Home
  - Log In / Sign Up
  - Message Details
  - Update Post form
- Responsive layout using Flexbox & CSS Grid
- Interactive hover and focus states for buttons and cards

###  User Management
- Users can **delete their own accounts**
- Auth bar changes contextually based on auth state (log in, sign up, or greeting)

---

## 🛠️ Tech Stack

| Layer         | Stack                          |
| ------------- | ------------------------------ |
| Backend       | Node.js, Express.js            |
| Auth & Session| Passport.js, connect-pg-simple |
| Database      | PostgreSQL                     |
| Templating    | EJS                            |
| Front-End     | HTML5, CSS3                    |
| Deployment    | Git, GitHub                    |

---

## 🧪 Local Setup
add .env file
DATABASE_URL=your_postgres_connection_string
SESSION_SECRET=super_secret_key


```bash
git clone https://github.com/your-username/message-board.git
cd message-board
npm install
npm start
```

📦 message-board
 ┣ 📁 public/
 ┃ ┗ 📄 style.css
 ┣ 📁 views/
 ┃ ┣ 📄 index.ejs
 ┃ ┣ 📄 login.ejs
 ┃ ┣ 📄 signup.ejs
 ┃ ┣ 📄 detail.ejs
 ┃ ┣ 📄 update.ejs
 ┣ 📄 app.js
 ┣ 📄 .gitignore
 ┣ 📄 README.md
 ┗ 📄 package.json


Built with code, patience, and the occasional cup of Persian tea
