
# Middleware in Express.js

## 📌 What is Middleware?

Middleware is a function that executes during the request-response cycle. It has access to the request, response objects, and a `next()` function. It is used to perform tasks like authentication, logging, parsing request bodies, error handling, etc.

```js
function middleware(req, res, next) {
  console.log("Middleware executed");
  next(); // Pass control to next handler
}
```

---

## 📌 Why Use Middleware?

- 🔐 Authentication check karne ke liye
- 📃 Request ke data ko parse karne ke liye (like `req.body`)
- 📜 Logging karne ke liye (jaise `GET /about`)
- ⚠️ Errors ko handle karne ke liye
- ⚙️ Custom kaam karne ke liye (jaise IP block, rate limiting)

---

## 📌 How to Use Middleware?

```js
// Basic Middleware
const middlewareFunc = (req, res, next) => {
  console.log('Request received');
  next(); // aage route ya agle middleware ko bhejta hai
};

app.use(middlewareFunc);
```

---

## 📌 Types of Middleware

### ✅ Application-Level Middleware

```js
app.use((req, res, next) => {
  console.log('App level middleware: ' + req.method + ' ' + req.url);
  next();
});
```

### ✅ Route-Level Middleware

```js
const checkLogin = (req, res, next) => {
  console.log('Checking login for /profile');
  next();
};

app.get('/profile', checkLogin, (req, res) => {
  res.send('User Profile Page');
});
```

### ✅ Built-in Middleware

```js
app.use(express.json()); // JSON body ko JS object banata hai

app.post('/data', (req, res) => {
  console.log(req.body); // ab yahan body milti hai
  res.send('Data Received');
});
```

### ✅ Third-party Middleware

```js
const morgan = require('morgan');
app.use(morgan('dev'));  // HTTP request log karega automatically
```

### ✅ Error-Handling Middleware

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```

Example Error Trigger:
```js
app.get('/error', (req, res) => {
  throw new Error('Intentional Error!');
});
```

---

## 📌 Summary Table

| Type                     | Use Case                          | Syntax Example                            |
|--------------------------|-----------------------------------|-------------------------------------------|
| Application-level        | Poore app ke liye                 | `app.use(middleware)`                     |
| Route-level              | Specific route ke liye            | `app.get('/route', middleware, handler)`  |
| Built-in                 | JSON parsing, form data, etc.     | `app.use(express.json())`                 |
| Third-party              | External help like logging, CORS  | `app.use(morgan('dev'))`                  |
| Error-handling middleware| Error ko handle karta hai         | `app.use((err, req, res, next) => {})`    |

---

## 💼 Middleware – Interview Questions and Answers

### Q1: What is middleware in Express.js?

**Answer:** Middleware is a function that executes during the request-response cycle. It has access to the request, response objects, and a `next()` function.

---

### Q2: What are the different types of middleware in Express?

**Answer:**
1. Application-level middleware
2. Router-level middleware
3. Built-in middleware
4. Third-party middleware
5. Error-handling middleware

---

### Q3: What is the role of `next()` in middleware?

**Answer:** The `next()` function passes control to the next middleware in the stack.

---

### Q4: How do you create custom middleware?

**Answer:**

```js
const myMiddleware = (req, res, next) => {
  console.log('Custom middleware');
  next();
};

app.use(myMiddleware);
```

---

### Q5: Can middleware return a response?

**Answer:** Yes. If middleware sends a response, the request-response cycle ends there.

---

### Q6: What is error-handling middleware in Express?

**Answer:** It has 4 parameters and is used to handle errors:

```js
app.use((err, req, res, next) => {
  res.status(500).send('Something went wrong!');
});
```

---

### Q7: What’s the difference between `app.use()` and `app.get()`?

**Answer:** `app.use()` is for middleware, `app.get()` is for GET routes.

---

### Q8: How do you apply middleware to a specific route only?

**Answer:**

```js
app.get('/dashboard', authMiddleware, (req, res) => {
  res.send('Dashboard');
});
```

---

### Q9: Can middleware be asynchronous?

**Answer:** Yes, middleware can be async. Use try/catch or `next(error)`.

---

### Q10: How does Express determine the order of middleware execution?

**Answer:** Middleware is executed in the order it is defined (top to bottom).
