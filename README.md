# Login & SignUp Authentication – Firebase + GitHub OAuth

## 📖 Overview

This project demonstrates a **contemporary authentication system** developed with **React Native (Expo)** and **Firebase Authentication**, offering two secure login methods:

1. **Email & Password Authentication** (via Firebase Auth)
2. **GitHub OAuth Authentication** (via a Node.js backend server)

By integrating Firebase and OAuth 2.0, the system provides a secure and adaptable login solution that works seamlessly across both web and mobile platforms.

---

## ⚙️ How the Authentication Process Works

### 1️⃣ Email & Password Authentication

- Users provide their first name, last name, email, and password.
- The app uses Firebase’s `createUserWithEmailAndPassword()` to register a new user account.
- Additional details (`firstName`, `lastName`, `email`, `createdAt`) are stored in **Firestore** within the `users/` collection.
- After registration, the user is redirected to the `/home` screen.

**Files involved:**
- `signup.jsx` → Manages user registration
- `login.jsx` → Handles email/password login

---

### 2️⃣ GitHub OAuth Authentication

GitHub login involves a **two-step process** between the frontend and backend.

#### 🧭 (a) Frontend – Expo React Native
- The app opens the **GitHub Authorization page** using `expo-auth-session`.
- Upon successful login, GitHub returns an `authorization code`.
- This code is sent to the backend server (`server.js`) to be exchanged for an `access_token`.

#### ⚙️ (b) Backend – Node.js Server
- The `server.js` file acts as a **secure intermediary** between GitHub and Firebase.
- It receives the `authorization_code`, communicates with GitHub’s API to obtain an `access_token`, and returns this token to the mobile app.
- The mobile app then authenticates the user using the Firebase method:
  ```js
  const credential = GithubAuthProvider.credential(access_token);
  await signInWithCredential(auth, credential);


## 📡 Local Network Setup (Testing on Real Devices)

When testing on a real phone using **Expo Go**, you must make sure the app can reach your backend server.

1. **Connect both your laptop and your phone** to the same Wi-Fi or Hotspot.  
2. Run the following command to find your local IP address:  
   - **Windows:** `ipconfig`  
   - **Mac/Linux:** `ifconfig`

   Example output:


IPv4 Address: 172.20.10.3


Update the backend URL in your login.jsx file:
```js
const res = await fetch("http://172.20.10.3:3000/exchange_github_token", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ code }),
});
```

Start your backend server:

node server.js


Open the Expo Go app on your phone and try “Login with GitHub”.

✅ If both devices are connected properly, the login will complete successfully and the user will be redirected to /home.
