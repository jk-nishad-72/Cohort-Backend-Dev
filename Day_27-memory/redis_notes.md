# 📌 Redis – Notes for Backend Development

## **1. What is Redis?**
- Full form: **Remote Dictionary Server**  
- **In-memory key-value database** → Data RAM me store hota hai.  
- Extremely fast (microseconds me read/write).  
- Support for multiple data types:
  - String  
  - List  
  - Set  
  - Hash  
  - Sorted Set  
  - Streams  

---

## **2. Main Features**
1. **In-memory storage** → Fast data access.  
2. **Key-value based** data store.  
3. **Persistence option** → Disk pe bhi save kar sakte ho.  
4. **Pub/Sub system** → Real-time messaging.  
5. **High performance** → Caching, sessions, queues ke liye perfect.  

---

## **3. Redis vs MongoDB**
| Feature        | MongoDB (Disk-based)     | Redis (In-memory)         |
|----------------|-------------------------|---------------------------|
| Storage        | Disk                    | RAM (optional disk)       |
| Data Model     | JSON-like Documents     | Key-Value pairs           |
| Speed          | Fast                    | Very Fast                 |
| Use Cases      | General data storage    | Caching, queues, sessions |
| Querying       | Complex queries         | Simple key lookups        |
| Persistence    | Default persistent      | Optional persistent       |

---

## **4. Common Use Cases**
- **Caching** (e.g., storing API responses temporarily)  
- **Session management** (user login sessions)  
- **Real-time leaderboards** (Sorted Sets)  
- **Pub/Sub messaging**  
- **Rate limiting** (e.g., API calls per minute)  

---

## **5. Installing Redis**
### On Windows:
```bash
winget install Redis
```
or use **Docker**:
```bash
docker run --name redis -p 6379:6379 -d redis
```

### On Linux:
```bash
sudo apt update
sudo apt install redis-server
```

---

## **6. Using Redis with Backend (Node.js Example)**

### **Step 1 – Install Redis Client**
```bash
npm install redis
```

### **Step 2 – Connect to Redis**
```javascript
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

console.log("✅ Connected to Redis");
```

---

### **Step 3 – Store & Retrieve Data**
```javascript
// Store data
await client.set('username', 'Jay');

// Get data
const value = await client.get('username');
console.log(value); // Output: Jay
```

---

### **Step 4 – Use for Caching**
```javascript
import express from 'express';
import fetch from 'node-fetch';

const app = express();

app.get('/data', async (req, res) => {
    const cacheData = await client.get('apiData');

    if (cacheData) {
        console.log('Serving from Redis Cache');
        return res.send(JSON.parse(cacheData));
    }

    const apiResponse = await fetch('https://api.example.com/data');
    const data = await apiResponse.json();

    // Store in Redis for 1 hour
    await client.setEx('apiData', 3600, JSON.stringify(data));

    console.log('Serving from API');
    res.send(data);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

---

### **Step 5 – Close Connection**
```javascript
await client.quit();
```

---

## **7. Tips**
- Always set an **expiry time** for cache data (`setEx`) to avoid old data issues.  
- Use Redis along with **MongoDB** → MongoDB for main data storage, Redis for caching.  
- For large-scale apps, use **Redis Cluster** for distributed caching.  
