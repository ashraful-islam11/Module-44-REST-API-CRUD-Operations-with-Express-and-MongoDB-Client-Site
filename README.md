
# Module 44: MongoDB CRUD Operations

এই মডিউলে MongoDB Atlas ব্যবহার করে ডেটাবেজ তৈরি ও সংযোগ করা এবং Express.js সার্ভারের মাধ্যমে CRUD Operations শেখা হয়েছে। পাশাপাশি Next.js ক্লায়েন্ট থেকে API Request পাঠিয়ে ডেটা দেখানো, নতুন ডেটা তৈরি, নির্দিষ্ট ডেটা খুঁজে বের করা, মুছে ফেলা এবং আপডেট করার অনুশীলন করা হয়েছে।

## 44-1: Database Setup — Creating a MongoDB Atlas Account

### 1. Server Setup

প্রথমে Node.js প্রজেক্ট তৈরি করে Express.js সার্ভার সেটআপ করতে হবে।

**Step 1: Initialize the project**

টার্মিনালে চালাতে হবে:

```bash
npm init -y
```

**Step 2: Enable ES Modules**

`package.json` ফাইলে নিচের প্রপার্টিটি যোগ করতে হবে:

```json
"type": "module"
```

এর ফলে `import` এবং `export` ব্যবহার করা যাবে।

**Step 3: Create the server file**

প্রজেক্টের root directory-তে `index.js` ফাইল তৈরি করতে হবে।

**Step 4: Install Express and CORS**

```bash
npm install express cors
```

- `express`: সার্ভার ও API Route তৈরি করতে ব্যবহৃত হয়।
- `cors`: ভিন্ন Origin থেকে আসা Request নিয়ন্ত্রণ করতে ব্যবহৃত হয়।

**Step 5: Configure Middleware**

```js
app.use(cors());
app.use(express.json());
```

- `cors()` ক্লায়েন্ট ও সার্ভারের মধ্যে Cross-Origin Request অনুমোদনের ব্যবস্থা করে।
- `express.json()` JSON Request Body-কে JavaScript Object-এ রূপান্তর করে, যাতে `req.body` থেকে ডেটা পাওয়া যায়।

Express.js-এর বিস্তারিত জানতে [Express.js Documentation](https://expressjs.com/) অনুসরণ করা যায়।

---

## 2. MongoDB Atlas Setup

### Step 1: Create an Account

MongoDB Atlas-এ অ্যাকাউন্ট তৈরি করে লগইন করতে হবে।

Website: https://www.mongodb.com/atlas

### Step 2: Configure Database Access

Database Access থেকে Database User তৈরি করতে হবে এবং Username ও Password নির্ধারণ করতে হবে।

### Step 3: Configure Network Access

Network Access থেকে উপযুক্ত IP Address-এর অনুমতি দিতে হবে, যাতে সার্ভার MongoDB Atlas-এর সঙ্গে সংযোগ করতে পারে।

### Step 4: Connect MongoDB

MongoDB Atlas-এর Connect অপশন থেকে Node.js Driver-এর Connection Instructions অনুসরণ করতে হবে।

### Step 5: Install dotenv

টার্মিনালে চালাতে হবে:

```bash
npm install dotenv
```

প্রজেক্টের root directory-তে `.env` ফাইল তৈরি করে প্রয়োজনীয় Environment Variable রাখতে হবে।

উদাহরণ:

```env
MONGODB_URL=your_mongodb_connection_string
```

এখানে নিজের প্রকৃত Connection String ব্যবহার করতে হবে। Password-সহ `.env` ফাইল কখনো GitHub-এ প্রকাশ করা যাবে না।

### Step 6: Add Sample Data

MongoDB Atlas-এর Browse Collections থেকে Database ও Collection তৈরি করে কিছু Sample User Data যোগ করতে হবে।

এই মডিউলে Database-এর নাম:

`simpleCurdDB`

Collection-এর নাম:

`users`

### Step 7: Read MongoDB Documentation

একাধিক Document পড়ার জন্য MongoDB Node.js Driver-এর `find()` এবং Cursor সম্পর্কিত Documentation অনুসরণ করা হয়েছে।

Documentation: https://www.mongodb.com/docs/drivers/node/current/crud/query/retrieve/

---

## 3. Connect to Database and Read Users

MongoDB থেকে ডেটা পড়ার আগে Database এবং Collection নির্বাচন করতে হবে।

```js
const createClient = await connectToMongoDB();

const db = createClient.db("simpleCurdDB");

const users = db.collection("users");
```

এখানে:

- `connectToMongoDB()` MongoDB-এর সঙ্গে সংযোগ তৈরি করে।
- `db()` নির্দিষ্ট Database নির্বাচন করে।
- `collection()` নির্দিষ্ট Collection নির্বাচন করে।

### GET: Read All Users

```js
app.get("/users", async (req, res) => {
    const cursor = users.find({});
    const allUsers = await cursor.toArray();

    res.send(allUsers);
});
```

**কীভাবে কাজ করে?**

1. `users.find({})` Collection-এর সব Document খোঁজার জন্য একটি Cursor তৈরি করে।
2. `cursor.toArray()` Cursor-এর Document-গুলোকে Array-তে রূপান্তর করে।
3. `res.send(allUsers)` ক্লায়েন্টের কাছে ডেটা পাঠায়।

সার্ভার চালু থাকা অবস্থায় নিচের URL-এ গেলে User Data দেখা যাবে:

`http://localhost:5000/users`

---

## 4. Client Setup with Next.js and shadcn/ui

সার্ভারের পাশাপাশি একটি Client Project তৈরি করা হয়েছে।

### Installation

প্রথমে `simple-curd-clients` নামে একটি ফোল্ডার তৈরি করতে হবে।

এরপর ওই ফোল্ডারে টার্মিনাল খুলে চালাতে হবে:

```bash
npx shadcn@latest init -t next
```

ইনস্টলেশনের সময় প্রয়োজন অনুযায়ী Project Name, UI Style এবং অন্যান্য সেটআপ নির্বাচন করতে হবে।

### GET: Display Users

Next.js-এর App Router-এ `app/users/page.tsx` ফাইল তৈরি করে Server API থেকে User Data Fetch করা যায়।

এরপর `map()` ব্যবহার করে প্রতিটি User-এর Data Card-এর মধ্যে দেখানো যায়।

এভাবেই সার্ভার থেকে ডেটা নিয়ে ক্লায়েন্টে প্রদর্শন করা হয়।

---

## 5. CREATE: Add a New User

নতুন ডেটা তৈরি করার জন্য HTTP `POST` Method ব্যবহার করা হয়।

### Client Side

নতুন User তৈরির জন্য `app/users/new/page.tsx`-এ একটি Form তৈরি করা হয়েছে।

```tsx
const handleCreateNewUser = async (
    e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    const response = await fetch("http://localhost:5000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userData)
    });

    const afterSubmit = await response.json();

    if (afterSubmit.insertedId) {
        console.log("User added successfully!");
    }
};
```

**কীভাবে কাজ করে?**

- `e.preventDefault()` Form-এর স্বাভাবিক Submit আচরণ বন্ধ করে।
- `FormData` Form-এর Input থেকে ডেটা সংগ্রহ করে।
- `Object.fromEntries()` Form Data-কে Object-এ রূপান্তর করে।
- `JSON.stringify()` Object-কে JSON String-এ রূপান্তর করে।
- `fetch()` POST Request-এর মাধ্যমে সার্ভারে ডেটা পাঠায়।
- `response.json()` সার্ভারের JSON Response পড়ে।
- `insertedId` থাকলে বোঝা যায় নতুন Document Insert হয়েছে।

Fetch API Documentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

### Server Side

```js
app.post("/users", async (req, res) => {
    const newUser = req.body;

    console.log("Adding new user:", newUser);

    const result = await users.insertOne(newUser);

    res.send(result);
});
```

**কীভাবে কাজ করে?**

1. `req.body` থেকে ক্লায়েন্টের পাঠানো ডেটা নেওয়া হয়।
2. `insertOne()` MongoDB Collection-এ নতুন Document যোগ করে।
3. `res.send(result)` Insert Operation-এর ফলাফল ক্লায়েন্টকে পাঠায়।

---

## 6. READ: Get a Single User by ID

একটি নির্দিষ্ট User-এর Details দেখার জন্য Dynamic Route ব্যবহার করা হয়।

### Server Side

```js
app.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    const query = {
        _id: new ObjectId(id)
    };

    const result = await users.findOne(query);

    res.send(result);
});
```

এখানে `ObjectId` ব্যবহারের জন্য MongoDB Driver থেকে এটি Import করতে হবে:

```js
import { ObjectId } from "mongodb";
```

**কীভাবে কাজ করে?**

- `:id` একটি Dynamic Route Parameter।
- `req.params.id` URL থেকে ID সংগ্রহ করে।
- URL থেকে পাওয়া ID String হলেও MongoDB-এর `_id` সাধারণত `ObjectId` হয়।
- `new ObjectId(id)` String-কে ObjectId-তে রূপান্তর করে।
- `findOne(query)` নির্দিষ্ট ID-এর সঙ্গে মিলে যাওয়া Document খুঁজে বের করে।

উদাহরণ:

`http://localhost:5000/users/USER_ID`

এখানে `USER_ID`-এর জায়গায় MongoDB-এর প্রকৃত Document ID দিতে হবে।

---

## 7. DELETE: Remove a User

কোনো User-কে Database থেকে মুছে ফেলার জন্য HTTP `DELETE` Method ব্যবহার করা হয়।

### Server Side

```js
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;

    const query = {
        _id: new ObjectId(id)
    };

    const result = await users.deleteOne(query);

    res.send(result);
});
```

**কীভাবে কাজ করে?**

- URL থেকে User-এর ID সংগ্রহ করা হয়।
- `_id` দিয়ে নির্দিষ্ট Document খোঁজার জন্য Query তৈরি করা হয়।
- `deleteOne(query)` মিলে যাওয়া একটি Document মুছে দেয়।
- `res.send(result)` Operation-এর ফলাফল পাঠায়।

### Client Side

```tsx
const { _id } = user;

const router = useRouter();

const handleDeleteUser = async () => {
    const res = await fetch(
        `http://localhost:5000/users/${_id}`,
        {
            method: "DELETE"
        }
    );

    const afterDelete = await res.json();

    if (afterDelete.deletedCount > 0) {
        router.refresh();
    }
};
```

এখানে `useRouter()` Next.js-এর `next/navigation` থেকে Import করতে হবে।

```tsx
import { useRouter } from "next/navigation";
```

**কীভাবে কাজ করে?**

- `fetch()` দিয়ে DELETE Request পাঠানো হয়।
- `deletedCount` দিয়ে বোঝা যায় কতটি Document মুছে ফেলা হয়েছে।
- `router.refresh()` ব্যবহার করে বর্তমান Route-এর Server Components-এর ডেটা Refresh করা যায়।

---

## 8. UPDATE: Modify a User with PATCH

বিদ্যমান User-এর নির্দিষ্ট কিছু Field আপডেট করার জন্য HTTP `PATCH` Method ব্যবহার করা হয়।

MongoDB Update Documentation:

https://www.mongodb.com/docs/drivers/node/current/crud/update/modify/

### Server Side

```js
app.patch("/users/:id", async (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;

    const filter = {
        _id: new ObjectId(id)
    };

    const updateDoc = {
        $set: {
            name: updateUser.name,
            email: updateUser.email
        }
    };

    const result = await users.updateOne(filter, updateDoc);

    res.send(result);
});
```

**কীভাবে কাজ করে?**

- `req.params.id` থেকে নির্দিষ্ট User-এর ID নেওয়া হয়।
- `req.body` থেকে আপডেট করার ডেটা সংগ্রহ করা হয়।
- `filter` নির্ধারণ করে কোন Document আপডেট হবে।
- `$set` নির্দিষ্ট Field-এর Value পরিবর্তন করে।
- `updateOne()` মিলে যাওয়া Document আপডেট করে।
- `res.send(result)` Update Operation-এর ফলাফল পাঠায়।

### Client Side

```tsx
const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>
) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const updateUserData = Object.fromEntries(
        formData.entries()
    );

    const response = await fetch(
        `http://localhost:5000/users/${user._id}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updateUserData)
        }
    );

    const result = await response.json();

    if (result.modifiedCount > 0) {
        toast.success("Successfully updated user");
        router.refresh();
    }
};
```

**কীভাবে কাজ করে?**

1. Form থেকে আপডেট করা ডেটা সংগ্রহ করা হয়।
2. `Object.fromEntries()` দিয়ে ডেটাকে Object-এ রূপান্তর করা হয়।
3. `JSON.stringify()` দিয়ে JSON String তৈরি করা হয়।
4. PATCH Request-এর মাধ্যমে সার্ভারে ডেটা পাঠানো হয়।
5. সার্ভার MongoDB-তে নির্দিষ্ট User-এর তথ্য আপডেট করে।
6. `modifiedCount` বেশি হলে সফল পরিবর্তনের পর Toast Message দেখানো হয় এবং Route Refresh করা হয়।

---

## 9. CRUD Operations Summary

| Operation | HTTP Method | MongoDB Method | কাজ |
|---|---|---|---|
| Create | POST | `insertOne()` | নতুন Document যোগ করা |
| Read All | GET | `find()` | সব Document পড়া |
| Read One | GET | `findOne()` | নির্দিষ্ট Document পড়া |
| Update | PATCH | `updateOne()` | নির্দিষ্ট Field আপডেট করা |
| Delete | DELETE | `deleteOne()` | Document মুছে ফেলা |

## 10. What I Learned

এই মডিউলে অনুশীলনের মাধ্যমে যেসব বিষয় শেখা হয়েছে:

- Node.js Project Setup এবং Express.js Server তৈরি।
- Middleware হিসেবে `cors()` ও `express.json()` ব্যবহার।
- MongoDB Atlas-এ Database ও Collection তৈরি এবং সংযোগ।
- Environment Variable ব্যবহারের জন্য `dotenv` সেটআপ।
- MongoDB থেকে একাধিক ও নির্দিষ্ট Document পড়া।
- Express.js-এর মাধ্যমে GET, POST, PATCH এবং DELETE API তৈরি।
- Next.js Client থেকে `fetch()` ব্যবহার করে API Request পাঠানো।
- Form Data সংগ্রহ ও JSON-এ রূপান্তর।
- CRUD Operation-এর ফলাফল দেখে Client UI Refresh করা।

