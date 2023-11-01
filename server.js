const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');     

const cookieParser = require("cookie-parser");

const app = express();
const PORT = 4000;
const { u_router } = require("./routes/users.router.js");
const { a_router } = require("./routes/articles.router.js");
const { c_router } = require("./routes/categories.router.js");
const { t_router } = require("./routes/threads.router.js");
const { comment_router } = require("./routes/comments.router.js");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

app.use("/users", u_router);
app.use("/articles", a_router);
app.use("/categories", c_router);
app.use("/threads", t_router);
app.use("/comments", comment_router);
    

app.get("/api", (req, res) => {
    res.json({
        message: "Hello world",
    });
});

// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});