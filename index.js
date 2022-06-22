// Importing all required libraries.
const express = require("express");
const cors = require("cors");
const VoiceResponse = require('twilio').twiml.VoiceResponse;

// Instacing the app with express.
const app = express();

// Setting up some important server properties.
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

// Instacing the application router.
const router = express.Router();

router.get("/:pin", async (req, res) => {

    // Getting the pin code from request body.
    const { pin } = req.params;
    
    // Create TwiML response
    const twiml = new VoiceResponse();

    const str = `Hello! Your Hurb Pin Code is ${pin}`;

    // Setting up the message.
    twiml.say({ voice: "alice" }, str);

    // Wrinting the response header.
    res.writeHead(200, { 'Content-Type': 'text/xml' });

    // Sending the response.
    res.end(twiml.toString());

})

app.use("/", router);

// Setting up the application port.
const port = process.env.PORT || 4010;

// Listening port...
app.listen(port, error => {
    // Printing the server status on screen.
    error ?
    console.log(`There was an error while starting server...\n ${error}`) :
    console.log(`🚀 Server started successfully. Listening http://localhost:${port}.`);

})