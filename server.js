const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();

const emailSender = process.env.EMAIL_SENDER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailRecipient = process.env.EMAIL_RECIPIENT;


// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: emailSender,
        pass: emailPassword,
    },
});

// Function to send email
const sendEmail = () => {
    const mailOptions = {
        from: emailSender,
        to: emailRecipient,
        subject: 'Website Visit Notification',
        text: 'Someone visited your website!',
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

// Home route
app.get('/', (req, res) => {
    // Send an email when the website is visited
    sendEmail();

    // Respond to the visitor
    res.send('<h1>Gooby has been found!!/h1>');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
