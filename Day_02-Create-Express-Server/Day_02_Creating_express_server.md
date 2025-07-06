
# Day_02: Creating Express.js Server 🚀

Welcome to Day 2 of our Node.js journey. Today, we will explore the **HTTP module**, understand **why Express.js is preferred**, and set up a basic **Express.js server** with proper routing and API structure.

---

## 🧩 What is the `http` Module?

Node.js comes with a built-in module called `http` which allows us to create a basic web server.

### ✅ Example:
```js
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.write('Hello from Home Page');
  } else if (req.url === '/about') {
    res.write('About Page');
  } else {
    res.write('404 Not Found');
  }
  res.end();
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

### 🔍 Limitations of using `http` directly:
- No built-in support for routing and middleware.
- Writing conditions for every route becomes messy.
- Difficult to manage larger projects.
- Lacks easy error handling, request parsing, etc.

---

## ⚡ Why We Don't Use `http` Module Directly?

Although `http` is powerful, for large applications:
- It lacks structure.
- Adding middleware (e.g. for parsing data, logging, etc.) is manual and complex.
- Not scalable or developer-friendly.

Hence, we use **Express.js** which is a minimal and flexible Node.js web application framework.

---

## 🚀 What is Express.js?

**Express.js** is a fast, unopinionated, and minimalist web framework for Node.js. It simplifies creating servers, handling routes, and building APIs.

### 📦 Installation:
To install Express:
```bash
npm init -y
npm install express
```

---

## 🔁 Express.js Routes

In Express, routes are much cleaner and organized.

### ✅ Example:
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

- `app.get()` handles GET requests.
- `req` is the request object.
- `res` is the response object.

---

## 📥 What is `request (req)` and `response (res)`?

In any route:
- `req` contains information sent from the client (URL, headers, body, etc.)
- `res` is used to send data back to the client (text, JSON, status codes, etc.)

```js
app.get('/user', (req, res) => {
  console.log(req.query); // Request details
  res.send({ name: "Jay", age: 20 }); // Response data
});
```

---

## 🌐 What is an API (Application Programming Interface)?

An **API** is a set of rules that allows software applications to communicate with each other. In web development, APIs allow frontend apps to fetch or send data to the backend.

Example:
- `/api/users` → Get user data
- `/api/posts` → Get blog posts

---

## 🔁 What are REST APIs?

**REST (Representational State Transfer)** APIs follow a set of principles:
- Use standard HTTP methods: GET, POST, PUT, DELETE
- Each route represents a resource (e.g. `/users`, `/posts`)
- Stateless communication (no session stored on server)
- Uses HTTP status codes (200, 404, 500, etc.)

Example RESTful routes:
```
GET     /users         → Get all users
GET     /users/:id     → Get single user
POST    /users         → Create a new user
PUT     /users/:id     → Update user
DELETE  /users/:id     → Delete user
```

---

## 🧪 Download Postman

**Postman** is a powerful tool to test APIs.

### 💻 Steps:
1. Go to [https://www.postman.com/downloads](https://www.postman.com/downloads)
2. Download the version for your OS (Windows/Mac/Linux).
3. Install it.
4. Use it to send requests (GET, POST, PUT, DELETE) to your server.

---

✅ **Next Step**: Build your first REST API using Express.js and test it using Postman!

Happy Learning 😄
