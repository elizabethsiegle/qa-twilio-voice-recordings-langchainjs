"use strict";
const express = require('express');
const res = require('express/lib/response');
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

let recentTranscription;
// Returns TwiML which prompts the caller to record a message
app.post('/record', (request, response) => {
    // Use the Twilio Node.js SDK to build an XML response
    const twiml = new VoiceResponse();
    twiml.say('Hello. Please leave a message after the beep.');
    // Use <Record> to record the caller's message, transcribe and pass to /handle_transcription
    twiml.record({
        transcribe: true,
        transcribeCallback: '/handle_transcription'});
    
    // End the call with <Hangup>
    twiml.hangup();
    // Render the response as XML in reply to the webhook request
    response.type('text/xml');
    response.send(twiml.toString());
});
app.post('/handle_transcription', (request, response) => {
    recentTranscription = request.body.TranscriptionText; //could store this in a database

})
app.get('/recent_transcription', (request, response) => {
    return response.json({recentTranscription});
})
// Create an HTTP server and listen for requests on port 3000
app.listen(3000);
