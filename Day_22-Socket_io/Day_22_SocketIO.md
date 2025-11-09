# Day 22 of Backend Development - Socket.io

## 🧠 Topic: Event-Based Communication (Data Sharing)

Socket.io is a JavaScript library that enables **real-time, bidirectional communication** between the client (frontend) and the server (backend).  
It works on an **event-based model**, where both sides can send and receive events.

---

## ⚙️ Event-Based Communication

In Socket.io, data sharing happens through events.  
There are two types of events:

### 1️⃣ In-built Events

Socket.io provides some built-in events for common communication needs.

| Event | Description |
|--------|-------------|
| `connect` | Triggered when a client successfully connects to the server. |
| `disconnect` | Triggered when a client disconnects from the server. |

Example:
```js
// Backend (server.js)
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
```

---

### 2️⃣ Custom Events (User-Defined Events)

These are events **created by the developer** to send or receive custom data between the client and server.

### 🔹 How to Perform Custom Events

| Function | Purpose |
|-----------|----------|
| `socket.emit()` | Sends (fires) an event along with data. |
| `socket.on()` | Listens for a specific event and handles the received data. |

#### Example – Communication Flow

##### 🖥️ Frontend (Client)
```js
// Send message to backend
socket.emit("chatMessage", "Hello from Frontend");

// Listen for response from backend
socket.on("serverReply", (msg) => {
  console.log("Message from Server:", msg);
});
```

##### ⚙️ Backend (Server)
```js
io.on("connection", (socket) => {
  console.log("Client connected");

  // Listen for frontend event
  socket.on("chatMessage", (msg) => {
    console.log("Message from Frontend:", msg);

    // Emit response back to frontend
    socket.emit("serverReply", "Hello from Backend");
  });
});
```

---

## 🔄 Summary

| Direction | Fire (emit) | Listen (on) |
|------------|--------------|-------------|
| Frontend ➜ Backend | Frontend emits → Backend listens |
| Backend ➜ Frontend | Backend emits → Frontend listens |

---

### ✅ Key Takeaways

- Socket.io enables **real-time communication** between frontend and backend.  
- Uses an **event-driven** approach for data transfer.  
- Supports **in-built** and **custom** events.  
- `emit` → send data, `on` → receive data.

---

**Example Use Cases:**
- Real-time chat apps  
- Live notifications  
- Multiplayer games  
- Live dashboards  
