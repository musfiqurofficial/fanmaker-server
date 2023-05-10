const cors = require("cors");
const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const upload = multer();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.post("/submit-form", upload.single("file"), (req, res) => {
  // Get form data from req.body and req.file
  const { old, english, OnlyFans, face, subsOnlyFans, willingToInvest, next6months, createContent, TikTokLink, country, language, FullName, email,  PhoneNumber, expectations } = req.body;
  const file = req.file;

  console.log(req.body.email);

  // Create Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "musfiqurofficial1999@gmail.com",
      pass: "aajmymaywdhnksbv",
    },
  });

  // Set up email options
  const mailOptions = {
    from: email,
    to: "musfiqurofficial1999@gmail.com",
    subject: "Form submission",
    html: `
      <p>${FullName} Email: ${email}</p>
      <p>Full Name: ${FullName}</p>
      <p>Phone Number: ${PhoneNumber}</p>
      <br/>
      <p>01 Are you over +18 years old: ${old}</p>
      <p>02 Do you speak english?: ${english}</p>
      <p>03 Are you already active on OnlyFans?: ${OnlyFans}</p>
      <p>04 Are you comfortable showing everything including your face?: ${face}</p>
      <p>05 How many subs do you already have on OnlyFans?: ${subsOnlyFans}</p>
      <p>06 How much time are you willing to invest per day? (content creation): ${willingToInvest}</p>
      <p>07 What is your monthly income goal for the next 6 months?: ${next6months}</p>
      <p>08 Which cell phone do you use to create content?: ${createContent}</p>
      <p>09 Social Media Links (OnlyFans, Instagram, TikTok...): ${TikTokLink}</p>
      <p>10 Which country are you from?: ${country}</p>
      <p>11 What language do you speak?: ${language}</p>
      <p>12 What language do you speak?: ${language}</p>
      <p>15 What are your expectations from working with us?: ${expectations}</p>

      <p>Please upload high quality picture of your face & body: ${file.originalname}</p>
    `,
    attachments: [
      {
        filename: file.originalname,
        content: file.buffer,
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).send("Error sending email");
    } else {
      console.log("Email sent: " + info.response);
      res.status(200).send("Email sent successfully");
    }
  });
});

app.get("/", (req, res) => {
  res.send("<h1 style='color: green'> Server Home Page </h1>");
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`server is running: http://localhost:${port}`);
});
