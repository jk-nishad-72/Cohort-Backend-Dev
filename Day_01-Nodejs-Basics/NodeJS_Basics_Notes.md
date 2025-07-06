
# Node.js Basics 

## 1. What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime environment that allows you to run JavaScript code outside of a web browser. It is built on the V8 JavaScript engine used in Google Chrome and is commonly used for building backend services, APIs, and scalable network applications.

## 2. Who Created Node.js and Why Was It Created?
Node.js was created by **Ryan Dahl** in **2009**. He developed it to address the limitations of traditional web servers (like Apache) which couldn't handle many concurrent connections efficiently. Node.js uses a non-blocking, event-driven architecture that makes it lightweight and efficient, ideal for data-intensive real-time applications.

## 3. How to Install Node.js
To install Node.js:
1. Visit the official Node.js website: [https://nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version for your operating system.
3. Run the installer and follow the setup instructions.
4. Verify installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v
   ```

This will show the installed versions of Node.js and npm (Node Package Manager).

## 4. How Node.js Runs Files Outside the Browser

Node.js uses the V8 JavaScript engine to execute JavaScript code directly on the system (outside the browser). When you run a `.js` file using Node.js, it wraps your code inside a function and executes it as a standalone script:

```bash
node filename.js
```

This allows developers to use JavaScript for backend/server-side programming.

## 5. What Are Packages?

Packages in Node.js are reusable blocks of code that can be easily installed and managed using npm. They can be libraries, tools, or frameworks that help in developing applications.

* Packages are stored in the **node_modules** folder.
* The **package.json** file lists all installed packages and their versions.

## 6. Difference Between Packages and Modules

* **Module:** A single file or directory with JavaScript code that can be imported using `require()`.
* **Package:** A collection of modules bundled together, typically with a `package.json` file. It can include metadata, dependencies, and scripts.

| Feature       | Module                   | Package               |
| ------------- | ------------------------ | --------------------- |
| Scope         | Single file or directory | Collection of modules |
| Example       | `fs`, `http`             | `express`, `mongoose` |
| File Required | No                       | Yes, `package.json`   |

## 7. Install and Use the cat-me Package

**cat-me** is a fun npm package that prints random cat ASCII art.

### Steps:

1. Initialize npm (if not already done):

   ```bash
   npm init -y
   ```
2. Install cat-me:

   ```bash
   npm install cat-me
   ```
3. Use it in your code:

   ```js
   const catMe = require("cat-me");
   console.log(catMe());
   ```
4. Run the file:

   ```bash
   node filename.js
   ```

## 8. Introduction to HTTP Module

The **http** module in Node.js allows you to create a web server that can handle HTTP requests and responses.

### Example:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello from Node.js HTTP module!');
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
```

This code starts a server on port 3000 and responds with plain text when accessed.
