const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

app.post("/assistance", async (req, res) => {
  const { message } = req.body;

  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const chat = model.startChat({ history: [] });

  const result = await chat.sendMessage(message);
  const response = await result.response;
  const text = await response.text();

  res.json({ text });
});

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

app.get("/prediction", (req, res) => {
  res.sendFile("prediction.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: __dirname });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
