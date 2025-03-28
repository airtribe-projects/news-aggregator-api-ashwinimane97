require('dotenv').config();
const express = require('express');
const app = express();
const authRoutes = require("./routes/authRoutes")
const preferenceRoutes = require("./routes/preferencesRoutes")
const connectDB = require('./dbConnect');
const newsRoutes = require('./routes/newsRoutes');

// connect to NoSQL DB.
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/users/preferences", preferenceRoutes);
app.use("/users", authRoutes);
app.use("/news", newsRoutes)

module.exports = app;