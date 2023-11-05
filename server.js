const express = require("express");
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');     
const nodemailer = require("nodemailer");
const fs = require('fs')

const cookieParser = require("cookie-parser");
const app = express();
const PORT = 4000;
const { u_router } = require("./routes/users.router.js");
const { a_router } = require("./routes/articles.router.js");
const { c_router } = require("./routes/categories.router.js");
const { t_router } = require("./routes/threads.router.js");
const { verifyToken } = require("./middlewares/verifyToken.js");
const { comment_router } = require("./routes/comments.router.js");
const { changeAvatar } = require("./controllers/users.controller.js")
const { cloudinary } = require('./utils/cloudinary.js')

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

app.post("/api/send-email", (req, res) => {
    const toEmail = req.body.to;
    const toUsername = req.body.username;

    console.log('Sending message to email =>', toEmail)

    let emailTemplate = fs.readFileSync("welcome_email.html", "utf8");
    emailTemplate = emailTemplate.replace("{{toUsername}}", toUsername)

    let transporter = nodemailer.createTransport({
        host: "smtp-relay.brevo.com", 
        port: 587, 
        auth: {
            user: process.env.APP_EMAIL, 
            pass: process.env.APP_PASS,
        },
    });

    let info = transporter.sendMail({
        from: `"Olim Helper" <${process.env.APP_EMAIL}>`,
        to: toEmail,
        subject: "Welcome to Olim Helper!",
        html: emailTemplate,
    });

    info.then(() => {
        console.log("Email sent successfully");
        res.status(200).json({ message: "Email sent successfully" });
    }).catch((error) => {
        console.error("Email sending failed: ", error);
        res.status(500).json({ error: "Email sending failed" });
    });
});


// Upload avatar to Cloudinary

app.post('/api/upload', verifyToken, async (req, res) => {
    try {
        const fileStr = req.body.data;
        console.log(fileStr);
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'dev_setups',
        });
        await changeAvatar(uploadResponse.url, req.user.username, res)
        console.log('avatar added')
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});
// Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.static(path.join(__dirname, "/client/build")));

// All other GET requests not handled before will return our React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});