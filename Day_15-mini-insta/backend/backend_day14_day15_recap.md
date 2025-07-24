
# Backend Development: Day 14 & 15 Recap

## 🔐 Day 14 – Authentication Done!

### 1. What is JWT & Why It Matters
JWT (JSON Web Token) is a compact and secure way to transmit information between parties as a JSON object. It is commonly used for authentication and information exchange because it can be verified and trusted using a secret or public/private key pair.

**Why Use JWT:**
- Stateless: No need to store session data on the server
- Secure: Signed with a secret key or public/private key pair
- Portable: Can be used across multiple platforms

### 2. Generating Secure Tokens Using Secret Keys
To generate a JWT, you use a library like `jsonwebtoken` in Node.js. A secret key is required to sign the token.

**Steps:**
- User logs in successfully
- A token is created with `jwt.sign(payload, secretKey)`
- The token is sent back to the client and used in future requests

```javascript
const jwt = require('jsonwebtoken');
const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
```

### 3. Complete User Authentication Flow
- **Registration**: Collect user details (e.g., email, password) and store securely (hash the password)
- **Login**: Verify user credentials, generate JWT token if valid
- **Protected Routes**: Verify the token using middleware before granting access

---

## 🚀 Day 15 – Mini Insta Clone Project Started!

### Project Features

1. 👤 **User Registration & Login**
   - Create account with email and password
   - Authenticate with JWT token

2. 🖼️ **Post Image + Caption**
   - Users can upload an image and provide a caption

3. 🧠 **AI-powered Caption Generator**
   - Use an API or model to generate creative captions for uploaded images

4. ❤️ **Like a Post**
   - Users can like each other's posts
   - Like count is displayed

5. 👀 **View User Profile**
   - View all posts, username, and basic info of a specific user

---

This hands-on mini project is helping reinforce backend concepts like routing, authentication, CRUD operations, and integrating external APIs (like AI caption generation).
