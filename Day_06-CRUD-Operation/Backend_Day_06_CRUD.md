
# Backend Day 06 - CRUD Operation

Great job reaching **Day 06** of Backend Development, Jay! Let’s break down the core concepts :

---

### 🌐 1. **What is a Schema?**

In backend development, especially when using **MongoDB with Mongoose**, a **Schema** defines the structure of your **documents** (similar to rows in SQL).

> 💡 Think of a Schema as a **blueprint** that tells the database what kind of data to expect.

**Example:**

```js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  email: String,
  isActive: Boolean
});
```

This schema says each `User` document will have:

* `name`: a String
* `age`: a Number
* `email`: a String
* `isActive`: a Boolean

---

### 🧱 2. **What is a Model?**

A **Model** is created using a **Schema** and allows you to interact with the database using that schema.

> 💡 Think of a Model as the **interface** to the database collection.

**Example:**

```js
const User = mongoose.model("User", userSchema);
```

Now you can use `User` to:

* Create new users
* Read user data
* Update user info
* Delete users

---

### 🔁 3. **CRUD Operations**

CRUD stands for the four basic database operations:

| Operation  | Method    | Description          | Mongoose Example                                 |
| ---------- | --------- | -------------------- | ------------------------------------------------ |
| **C**reate | POST      | Add new data         | `User.create({...})` or `new User({...}).save()` |
| **R**ead   | GET       | Retrieve data        | `User.find()` / `User.findById()`                |
| **U**pdate | PUT/PATCH | Modify existing data | `User.findByIdAndUpdate(id, {...})`              |
| **D**elete | DELETE    | Remove data          | `User.findByIdAndDelete(id)`                     |

---

### 🧠 Quick Recap:

* ✅ **Schema** = Structure/Blueprint
* ✅ **Model** = Interface to interact with DB
* ✅ **CRUD** = Create, Read, Update, Delete
