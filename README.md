# Question-answering over Twilio voice recordings with LangChain.js

### Prerequisites
- A Twilio account - [sign up for a free Twilio account here](https://www.twilio.com/try-twilio)
- A Twilio phone number with Voice capabilities - [learn how to buy a Twilio Phone Number here](https://support.twilio.com/hc/en-us/articles/223135247-How-to-Search-for-and-Buy-a-Twilio-Phone-Number-from-Console)
- Node.js (version 18 or above) installed - [download Node.js here](https://nodejs.org/)
- OpenAI account and API key – [make an OpenAI account here](https://openai.com/api/) and [get an OpenAI API Key here](https://platform.openai.com/account/api-keys)
- [ngrok](https://ngrok.com/download), a handy utility to connect the development version of our Python application running on your machine to a public URL that Twilio can access.

Your _.env_ file should contain one line:
```bash
OPENAI_API_KEY= {REPLACE-WITH-YOUR-OPENAI-API-KEY}
```
### record.js
Records an inbound phone call to a Twilio phone number and transcribe the call

Run the file with `node record.js` and in another terminal tab, run `ngrok http 3000`. Grab that forwarding URL so you can configure your purchased Twilio phone number to send a request to your web application.
<img width="684" alt="ngrok" src="https://github.com/elizabethsiegle/qa-twilio-voice-recordings-langchainjs/assets/8932430/f215b26d-e0f7-4990-b19e-db6d74b2d6c1">
Configure your Twilio phone # with the ngrok url so after calling the Twilio phone number, your application runs:
<img width="687" alt="configure twilio number" src="https://github.com/elizabethsiegle/qa-twilio-voice-recordings-langchainjs/assets/8932430/50306856-b8a6-4650-b256-e178b1ea10e9">

In your ngrok tab, you can see the `/record` and `/handle_transcription` endpoints were hit. 
<img width="685" alt="endpoints hit in terminal" src="https://github.com/elizabethsiegle/qa-twilio-voice-recordings-langchainjs/assets/8932430/cb29d4f5-c9eb-4458-81a3-131a2ead5be1">

Now go to your local web server in the browser and append _/recent_transcription_ (http://localhost:3000/recent_transcription). You can see the audio recording there in the browser! 
<img width="680" alt="transcription in browser" src="https://github.com/elizabethsiegle/qa-twilio-voice-recordings-langchainjs/assets/8932430/e9a87cdc-e7a4-4baa-b039-23e6009af4f9">

### handle_transcription.js
Code imports OpenAI so we can use their models, LangChain's loadQAStuffChain to make a chain with the LLM, and Document so we can create a Document the model can read from the audio recording transcription

Now, running the file (containing the speech from the movie Miracle) with `node handle_transcription.js` should yield the following output:

<img width="672" alt="print output to terminal" src="https://github.com/elizabethsiegle/qa-twilio-voice-recordings-langchainjs/assets/8932430/70e475fc-c1f2-4866-8d8f-a824431905f8">
