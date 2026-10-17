const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/auth/google", async (req, res) => {
  const { credential } = req.body;

  try {
    const response = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${credential}`
    );

    const { email, name, picture } = response.data;

    // Tạo user nếu chưa có trong DB
    // vd: user = { email, name, avatar: picture }

    return res.json({
      success: true,
      user: { email, name, picture }
    });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid Google token" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
