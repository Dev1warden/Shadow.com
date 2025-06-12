const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Email sending route
app.post("/api/send-email", async (req, res) => {
  const { to, subject, body } = req.body;

  try {
    // Configure Nodemailer with Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your_gmail_address@gmail.com", // Replace with your Gmail address
        pass: "your_app_password", // Replace with your Gmail App Password
      },
    });

    // Email options
    const mailOptions = {
      from: "your_gmail_address@gmail.com", // Replace with your Gmail address
      to, // Recipient email
      subject, // Email subject
      text: body, // Email body
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
