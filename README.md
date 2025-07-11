# 🐾 NekoPass - Simple & Secure Password Manager

NekoPass is a minimal, secure, and user-friendly password manager built with modern web technologies. It helps users securely store, manage, and retrieve passwords with encryption — even **we** can't see them!

## 🔐 Features

- 💾 Save and manage all your passwords manually
- 🔑 All data is encrypted using bcrypt and crypto-js for maximum security
- 🔒 No one (not even us) can view your passwords
- 🌐 Responsive design and clean UI
- 📦 Built with **Next.js**, **Tailwind CSS**, and **MySQL**

## 📁 Project Structure

```

/app
├── api
│   └── user/\[id]/route.js
└── components
└── Loading.js
/lib
└── db.js
/public
└── favicon.ico
/pages
└── index.js
.env.local
README.md

````

## ⚙️ Setup & Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/nekopass.git
   cd nekopass
````

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables** by creating a `.env.local` file:

   ```env
   DB_USER=your_mysql_user
   DB_PASSWORD=your_mysql_password
   DB_NAME=nekopass
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

## 🧠 Tech Stack

* **Next.js** – React framework for SSR and API routes
* **MySQL** – Relational database for storing data
* **Bcrypt.js** – Secure password hashing
* **Tailwind CSS** – Utility-first CSS framework
* **Axios** – For making HTTP requests

## 🚨 Important Notes

* Passwords are encrypted and cannot be decrypted.
* Keep `.env.local` secure and do not commit it to GitHub.
* Never expose sensitive data like API keys in the frontend.

## 📸 Screenshots

*Add your app screenshots here to showcase the UI.*

## 📄 License

This project is licensed under the [MY License](LICENSE).

---

Made with ❤️ by **Pavish K.**

```

---

Let me know if you'd like to generate a downloadable `README.md` file or if you want to add badges, deploy instructions, or database schema info.
```