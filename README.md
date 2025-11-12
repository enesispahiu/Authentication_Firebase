**User Authentication with Firebase & GitHub OAuth**

### 📖 **Project Overview**
This project showcases a secure authentication system developed using React Native (Expo) integrated with Firebase Authentication. The system offers two secure login methods:

- **Email & Password Login/Signup** (via Firebase Authentication)
- **GitHub OAuth Login** (via a Node.js backend server)

By combining Firebase with OAuth 2.0, the project provides a flexible and secure login experience for both mobile and web platforms.

### ⚙️ **Authentication Process Breakdown**

#### 1️⃣ **Email & Password Authentication**
- Users enter their first name, last name, email, and password.
- The app utilizes Firebase’s `createUserWithEmailAndPassword()` method to create a new account.
- Additional user data (first name, last name, email, and account creation time) is stored in Firebase Firestore under the `users/` collection.
- Upon successful registration, the user is redirected to the `/home` screen.

**Files involved:**
- `signup.jsx` – Manages user registration.
- `login.jsx` – Handles login via email and password.

#### 2️⃣ **GitHub OAuth Authentication**
GitHub login follows a two-step process involving both the frontend and backend.

##### 🧭 **Frontend – Expo React Native**
- The app initiates the GitHub Authorization process using `expo-auth-session`.
- Once the user successfully logs in, GitHub provides an authorization code.
- This code is sent to the backend server to exchange it for an access token.

##### ⚙️ **Backend – Node.js Server**
- The `server.js` file acts as an intermediary between GitHub and Firebase.
- The server receives the authorization code, communicates with GitHub's API to retrieve an access token, and then sends this token back to the mobile app.
- The mobile app then authenticates the user with Firebase using:
  ```javascript  
  const credential = GithubAuthProvider.credential(access_token);  
  await signInWithCredential(auth, credential);  
📡 Local Network Setup (For Testing on Physical Devices)
When testing the app on an actual device using Expo Go, ensure both your laptop and phone are connected to the same Wi-Fi or hotspot network.

To get your local IP address:

Windows: ipconfig

Mac/Linux: ifconfig
Example output:
IPv4 Address: 172.20.10.3

Update the backend URL in login.jsx to match your local IP:

javascript
Copy code
const res = await fetch("http://172.20.10.3:3000/exchange_github_token", {  
method: "POST",  
headers: { "Content-Type": "application/json" },  
body: JSON.stringify({ code })  
});
Start the backend server:

bash
Copy code
node server.js  
Open Expo Go on your device and attempt “Login with GitHub”.

✅ Testing Success: If both the device and server are properly connected, the login should succeed.