# 🔐 NekoPass – Simple & Secure Password Manager

**NekoPass** is a modern, secure, and minimal **password manager web application** designed to help users safely store, manage, and access their credentials.

This project focuses heavily on **security best practices**, **encryption**, and a **clean user experience**.  
Built as a **personal project** to gain real-world experience with authentication, encryption, and full-stack development.

🌐 **Live Demo:** https://pass-neko.vercel.app/

---

## ✨ Features

- 🔐 Secure password storage with encryption
- 🔑 JWT-based authentication
- 🔒 Password hashing using **bcryptjs**
- 🧠 Client-side encryption using **crypto-js**
- 📋 One-click copy password
- ✏️ Edit stored credentials
- 🗑️ Delete passwords securely
- 👤 User profile management
- 📱 Fully responsive design
- ⚡ Fast UI with Tailwind CSS

---

## 🛠️ Tech Stack

| Technology | Purpose |
|----------|---------|
| **Next.js** | Full-stack framework (Frontend + API Routes) |
| **MySQL** | Database |
| **Tailwind CSS** | Styling |
| **JWT** | Authentication |
| **bcryptjs** | Password hashing |
| **crypto-js** | Encryption |
| **Vercel** | Deployment |

---

## 🏠 Home Page

![Home Page](https://github.com/user-attachments/assets/48f79c25-a535-4b66-bfa2-8e0aca09205d)

---

## 🔐 Authentication

### Login
![Login](https://github.com/user-attachments/assets/ef30e3b0-6548-4239-9379-f0558ee01481)

### Register
![Register](https://github.com/user-attachments/assets/a1982290-2308-4ea5-a21d-1c0060112187)

---

## 📊 Dashboard

View and manage all your saved credentials in one secure place.

![Dashboard](https://github.com/user-attachments/assets/2c080a50-f5a7-4da5-896d-37e0553494a7)

---

## ➕ Add New Password

Securely store new website credentials with encryption.

![Add Password](https://github.com/user-attachments/assets/1b81e1f6-6042-4c74-b04e-269a12406b88)

---

## 🛠️ Manage Passwords

- ✏️ Edit credentials  
- 📋 Copy passwords  
- 🗑️ Delete entries securely  

![Manage Passwords](https://github.com/user-attachments/assets/ddba41fa-dfb0-45d7-b041-53fb39acaa33)

---

## 👤 Profile Page

Manage user account information securely.

![Profile](https://github.com/user-attachments/assets/4ac9e217-54b5-4fb1-9fee-ed033ce01092)

---

## 🔒 Security Highlights

- 🔐 Passwords are **never stored in plain text**
- 🧠 Encrypted using **AES encryption**
- 🔑 User passwords hashed with **bcryptjs**
- 🛡️ API routes protected using **JWT**
- 👥 Users can access **only their own data**

---

## 🔐 Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
SALT=
WALLET_SALT=
STORE_KEY=
SERVER_API=

JWT_SECRET=
MASTER_KEY=

DB_NAME=
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_PORT=
````

> ⚠️ **Never expose real environment values in public repositories**
> `.env` files must be added to `.gitignore`

---

## 📦 Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/PavishK/PassNeko.git
cd PassNeko
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Application

```bash
npm run dev
```

Open in browser:

```
http://localhost:3000
```

---

## ☁️ Deployment (Vercel)

1. Push code to GitHub
2. Go to **Vercel Dashboard**
3. Import the repository
4. Add environment variables in:

   ```
   Project Settings → Environment Variables
   ```
5. Deploy 🚀

---

## 🎯 Project Purpose

This **personal project** was built to:

* Learn **secure authentication**
* Implement **encryption & hashing**
* Practice **Next.js full-stack development**
* Work with **MySQL in production**
* Build a **real-world security-focused application**

---

## 🧑‍💻 Author

**Pavish K**
Personal Project | Full-Stack Developer

⭐ If you like this project, consider giving it a star!

---

## 📜 License

This project is licensed under **MY License**.
