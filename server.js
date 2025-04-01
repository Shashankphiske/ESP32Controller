const express = require('express');
const app = express();
const axios = require('axios');  // To forward requests to ESP32
const cors = require("cors");

const ESP32_IP = 'http://<ESP32_IP>/';  // Replace with your ESP32 IP address

app.use(express.json());

const corsOptions = {
    origin: 'http://127.0.0.1:5500',  // Replace with the front-end domain
    methods: 'GET,POST',  // Allowed methods
    allowedHeaders: 'Content-Type,Authorization'  // Allowed headers
};

app.use(cors(corsOptions));

app.post('/sendCommand', async (req, res) => {
    const { command } = req.body;

    console.log(command)
    
    if (command !== 'left' && command !== 'right') {
        return res.status(400).send('Invalid command');
    }
    return res.status(200).send("Command Valid");
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
