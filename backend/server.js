const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors"); // Import cors middleware
const db = require("./models");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// Configure CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
    credentials: true, // Allow credentials such as cookies to be sent
  })
);

// Sync database
db.sequelize
  .sync({ force: true })
  .then(() => console.log("Database synced"))
  .catch((err) => console.error("Error syncing database:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;
