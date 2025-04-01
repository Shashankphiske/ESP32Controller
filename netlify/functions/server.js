const express = require('express');
const app = express();
const axios = require('axios');  // To forward requests to ESP32
const cors = require("cors");
const path = require('path');  // For serving static files
const serverless = require("serverless-http");
const bodyParser = require("body-parser");
const ESP32_IP = 'http://<ESP32_IP>/';  // Replace with your ESP32 IP address
const helmet = require("helmet");

// Serve static files from the 'public' directory

const corsOptions = {
    origin: '*',  // Replace with the front-end domain
    methods: 'GET, POST',  // Allowed methods
    allowedHeaders: 'Content-Type, Authorization'  // Allowed headers
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(helmet());

app.use(cors(corsOptions));

app.post("/.netlify/functions/server/sendCommand", async (req, res) => {
    const body = JSON.parse(req.body);
    const command = body.command;
    console.log(command);
    return res.status(200).json({
        message : command,
        success : true
    });
})

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

module.exports.handler = serverless(app);
