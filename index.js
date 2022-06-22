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

router.post("/:pin", async (req, res) => {

    res.type('text/xml')

    // Getting the pin code from request body.
    const { pin } = req.params;

    const splittedPin = pin.split("");

    // Create TwiML response
    const twiml = new VoiceResponse();

    const str = `Olá! O seu código Pin da plataforma Rurb para Parceiros é. ${splittedPin[0]}. ${splittedPin[1]}. ${splittedPin[2]}. ${splittedPin[3]}. Repetindo. O seu código Pin da plataforma Hurb para Parceiros é. ${splittedPin[0]}. ${splittedPin[1]}. ${splittedPin[2]}. ${splittedPin[3]}. Obrigado.`;

    // Setting up the message.
    twiml.say(str);

    res.send(twiml.toString())

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