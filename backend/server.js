const express = require("express");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middleware/errorhandler");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// DB CONNECTION
connectDB();

// Body-Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/ticket", require("./routes/ticketRoutes"));
app.use("/api/user", require("../backend/routes/userRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Uploads Folder Static Serving
const uploadPath =  path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadPath));

// Error Handler Middleware
app.use(errorHandler);
console.log("Current NODE_ENV:", process.env.NODE_ENV);
// Serve Frontend for Production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.resolve(__dirname, "../frontend", "dist");
  app.use(express.static(frontendPath));
  console.log("Resolved frontend path:", frontendPath);

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
} else {
  // Development Environment
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running at PORT: ${PORT}`.bgBlue.black);
});
