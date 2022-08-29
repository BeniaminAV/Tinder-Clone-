const PORT = 8000;
const express = require("express");
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bcrypt = require("bcrypt");
const uri =
  "mongodb+srv://Beniamin99:cacamaca@Cluster0.28wxahk.mongodb.net/?retryWrites=true&w=majority";
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello to my app");
});

app.post("/signup", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  const generateUserId = uuidv4();
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return res.status(409).send("User already exists. Please login");
    }

    const sanitizedEmail = email.toLowerCase();

    const data = {
      user_id: generateUserId,
      email: sanitizedEmail,
      hashed_password: hashedPassword,
    };

    const insertedUser = await users.insertOne(data);

    const token = jwt.sign(insertedUser, sanitizedEmail, {
      expiresIn: 60 * 24,
    });

    res.status(201).json({ token, userId: generateUserId });
  } catch (err) {
  } finally {
    await client.close();
  }
});

app.post("/login", async (req, res) => {
  const client = new MongoClient(uri);
  const { email, password } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const user = await users.findOne({ email });

    const correctPassword = await bcrypt.compare(
      password,
      user.hashed_password
    );

    if (user && correctPassword) {
      const token = jwt.sign(user, email, {
        expiresIn: 60 * 24,
      });
      res.status(201).json({ token, userId: user.user_id, email });
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
});

app.get("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const userId = req.query.userId;

  console.log("userId", userId);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const user = await users.findOne(query);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/gendered-users", async (req, res) => {
  const client = new MongoClient(uri);
  const gender = req.query.gender;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");
    const query = { gender_identify: { $eq: gender } };
    const foundUsers = await users.find().toArray();

    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.put("/user", async (req, res) => {
  const client = new MongoClient(uri);
  const formData = req.body.formData;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: formData.user_id };
    const updateDocument = {
      $set: {
        first_name: formData.first_name,
        dob_day: formData.dob_day,
        dob_month: formData.dob_month,
        dob_year: formData.dob_year,
        show_gender: formData.show_gender,
        gender_identify: formData.gender_identify,
        gender_interest: formData.gender_interest,
        url: formData.url,
        about: formData.about,
        matches: formData.matches,
      },
    };
    const insertedUser = await users.updateOne(query, updateDocument);
    res.send(insertedUser);
  } finally {
    await client.close();
  }
});

app.get("/users", async (req, res) => {
  const client = new MongoClient(uri);
  const userIds = JSON.parse(req.query.userIds);
  console.log(userIds);

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const pipeline = [
      {
        $match: {
          user_id: {
            $in: userIds,
          },
        },
      },
    ];
    const foundUsers = await users.aggregate(pipeline).toArray();
    console.log(foundUsers);
    res.send(foundUsers);
  } finally {
    await client.close();
  }
});

app.put("/addmatch", async (req, res) => {
  const client = new MongoClient(uri);
  const { userId, matchesUserId } = req.body;

  try {
    await client.connect();
    const database = client.db("app-data");
    const users = database.collection("users");

    const query = { user_id: userId };
    const updateDocument = {
      $push: { matches: { user_id: matchesUserId } },
    };
    const user = await users.updateOne(query, updateDocument);
    res.send(user);
  } finally {
    await client.close();
  }
});

app.get("/messages", async (req, res) => {
  const { userId, correspondingUserId } = req.query;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const query = {
      from_userId: userId,
      to_userId: correspondingUserId,
    };
    const foundMessages = await messages.find(query).toArray();
    res.send(foundMessages);
  } finally {
    await client.close();
  }
});

app.post("/message", async (req, res) => {
  const client = new MongoClient(uri);
  const message = req.body.message;

  try {
    await client.connect();
    const database = client.db("app-data");
    const messages = database.collection("messages");

    const insertedMessage = await messages.insertOne(message);
    res.send(insertedMessage);
  } finally {
    await client.close();
  }
});

app.listen(PORT, () => console.log("Server running on Port" + PORT));
