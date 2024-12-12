const express = require("express");
const connectDB = require("./config/dbConfig");
require("dotenv").config();
const colors = require("colors");
const errorHandler = require("./middleware/errorhandler");
const path = require("path")

const app = express();
const PORT = process.env.PORT || 5000;

// DB CONNETION
connectDB();

// Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({
    msg: "WELCOME TO COMPLAINT BOX API",
  });
});

// Ticket Routes
app.use("/api/ticket", require("./routes/ticketRoutes"))

// User Routes
app.use("/api/user", require("../backend/routes/userRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// Error Handler
app.use(errorHandler);

let NODE_ENV = "production"
if(NODE_ENV === "production"){
  const _dirname = path.resolve();
  app.use("/uploads", express.static("/var/data/uploads"));
  app.use(express.static(path.join(_dirname,"/frontend/dist")));
 
  app.get("*", (req,res) => 
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
)
}
else{
  const _dirname = path.resolve();
  app.use("/uploads", express.static(path.join(_dirname, "/uploads")));
  app.get("/",(req,res) => {
    res.send("API is running...");
  });
}

app.listen(PORT, () => {
  console.log(`Server is running at PORT : ${PORT}`.bgBlue.black);
});
