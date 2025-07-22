
# Day 12 - Backend Development: Authentication

## 🔐 1. What is Authentication?
**Definition:**  
Authentication is the process of verifying *who* someone is.

**Example:**  
When you log in to Instagram using your email and password, Instagram verifies your credentials — this is authentication.

---

## ❓ 2. Why Do We Need Authentication?

**Reasons:**
1. **Security:** Prevents unauthorized access to personal or sensitive information.
2. **User-specific data access:** Allows users to see only their own content.
3. **Track activity:** Keeps logs for auditing or analytics.
4. **Protect resources:** Blocks bots or attackers from misusing services.

**Example:**  
In an online banking app, only the account holder should be able to see their balance and transaction history — not anyone else.

---

## ⚙️ 3. How Authentication Works?

**Step-by-step:**
1. User submits **login credentials** (e.g., email + password).
2. Server checks these credentials in the **database**.
3. If the details are correct:
   - A **session** or **token** is created.
   - The user is allowed access to protected pages.

**Example:**  
You go to Netflix, log in → Netflix checks your account → if valid, it lets you watch your favorite shows.

---

## 🔑 4. Authentication Using Tokens

**What is Token-based Authentication?**  
Instead of storing session data on the server, it sends a **token** to the client (usually a JWT – JSON Web Token). This token is stored in the browser (in localStorage or cookies) and sent with every request.

**Example:**
1. User logs in and gets a token like: `eyJhbGciOi...`
2. That token is sent with every request as a header:  
   `Authorization: Bearer <token>`
3. Server verifies the token and allows or denies access.

---

## 🔁 5. Tokens = User Data

**Explanation:**  
A token often contains **encoded user data** like user ID or email.  
It acts like a temporary pass to access secured routes.

**Example:**  
JWT content (decoded):
```json
{
  "userId": "12345",
  "email": "jay@example.com",
  "role": "user"
}
```

---

## 🧠 6. Server Identifies User Identity Using Token

**How the Server Uses the Token:**
1. User sends a request with a token.
2. Server **verifies** the token (checks signature & expiry).
3. If valid:
   - Server identifies the user.
   - Gives access to protected resources.
4. If invalid:
   - Server denies access (e.g., returns 401 Unauthorized).

**Example:**  
You try to access your profile page. The browser sends a token. The server reads the token → confirms it’s from Jay → shows the profile.
