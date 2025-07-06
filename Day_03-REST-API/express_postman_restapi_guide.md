
# Web Development Essentials (Express, Postman, Nodemon, REST API)

## 1. Create Express Server

**What is Express?**  
A Node.js framework used to build web applications and APIs easily.

**Steps to Create an Express Server:**  
1. Initialize project: `npm init -y`  
2. Install Express: `npm install express`

**Code Example:**
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Jay!');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
```

Run the server: `node index.js`

---

## 2. Use Postman

**What is Postman?**  
A free API testing tool that lets developers test REST APIs by sending HTTP requests.

**Why Use Postman?**
- Test backend APIs without frontend
- View server responses and status codes

**How to Use Postman?**
- Download from https://www.postman.com/downloads/
- Select method, enter URL, click "Send"

Example: `GET http://localhost:3000/`

---

## 3. Use of Nodemon Package

**What is Nodemon?**  
A tool that restarts your server automatically when file changes are detected.

**Why Use Nodemon?**
- Avoid manual server restarts

**Install Nodemon:**  
Global: `npm install -g nodemon`  
Dev Dependency: `npm install --save-dev nodemon`

**Run App Using Nodemon:**  
`nodemon index.js`

---

## 4. Difference between npm and npx

| Feature       | `npm`                     | `npx`                          |
|---------------|----------------------------|--------------------------------|
| Full Form     | Node Package Manager       | Node Package Executor          |
| Use           | Installs packages          | Runs packages without install  |
| Example       | `npm install create-react-app` | `npx create-react-app my-app` |
| Install       | Required                   | Not required                   |

---

## 5. What is REST API?

**REST (Representational State Transfer)** is a set of rules for building APIs.

A REST API uses HTTP methods like GET, POST, PUT, DELETE.

**Example (Express):**
```js
app.get('/users', (req, res) => {
  res.send('List of users');
});
```

---

## 6. Ways to Send Data in Requests

| Method         | Description         | Example                      |
|----------------|---------------------|------------------------------|
| Query Params   | Data in URL         | `/users?name=Jay`           |
| Route Params   | Data in route       | `/users/123`                |
| Request Body   | Data in POST/PUT    | `{ "name": "Jay" }`         |
| Headers        | Extra info (e.g., token) | `Authorization: Bearer token` |

---

## 7. Methods in REST API

| Method | Purpose             | Example Route    |
|--------|---------------------|------------------|
| GET    | Read data           | `GET /users`     |
| POST   | Create new data     | `POST /users`    |
| PUT    | Update existing data| `PUT /users/123` |
| PATCH  | Partial update      | `PATCH /users/123` |
| DELETE | Remove data         | `DELETE /users/123` |
