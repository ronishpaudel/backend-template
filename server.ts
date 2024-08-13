import express from "express";
import cors from "cors";
import { db } from "./utils/db";
import { productRoute } from "./resources/product";
import { categoryRoute } from "./resources/category";
import { uploadImages } from "./middleware/multerMiddleware";
import { getAuth } from "firebase-admin/auth";
import { initializeApp, cert } from "firebase-admin/app";
import path from "path";

const app = express();

// init firebase admin sdkk
const serviceAccount = require(path.join(__dirname, "firebase.json"));
initializeApp({
  credential: cert(serviceAccount),
});

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.post("/auth/registration", async (req, res) => {
  const { token } = req.body;
  console.log({ token });
  if (!token) {
    return res.status(400).send("Missing token");
  }

  try {
    // Verifying token
    const decodedToken = await getAuth().verifyIdToken(token);
    const { email, name, picture } = decodedToken;
    console.log("Decoded Token:", decodedToken);
    console.log({ email, name, picture });

    let newUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    let hasUsername = false;

    if (!newUser) {
      newUser = await db.user.create({
        data: {
          email: email!,
          username: name,
          profilePic: picture!,
        },
      });
    } else {
      if (newUser.username) {
        hasUsername = true;
      } else {
        newUser = await db.user.update({
          where: {
            email: email,
          },
          data: {
            username: name,
          },
        });
      }
    }

    res.json({ ...newUser, hasUsername });

    console.log("User created successfully:", newUser);
  } catch (error) {
    console.error("User creation failed:", error);
    res.status(500).send("User creation failed");
  }
});

//  Route to get user information
app.get("/user/me", async (req, res) => {
  const token = req.headers.authorization;

  console.log({ token });

  if (!token) {
    return res.status(401).send("Unauthorized: No token provided");
  }

  try {
    // Verify the Firebase token
    const decodedToken = await getAuth().verifyIdToken(token);
    const { email } = decodedToken;

    const user = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    res.status(500).send("Failed to fetch user data");
  }
});

app.use(productRoute);
app.use(categoryRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", uploadImages, (req, res) => {
  try {
    res.json({
      message: "Images uploaded successfully",
      files: req.files,
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).send("Error uploading images");
  }
});

app.listen(3002, () => {
  console.log("Server is running on port http://localhost:3002");
});

export { app };
