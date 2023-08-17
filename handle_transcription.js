import 'dotenv/config'; //"type": "module", in package.json
import { OpenAI } from "langchain/llms/openai";
import { loadQAStuffChain } from 'langchain/chains';
import { Document } from "langchain/document";

(async () => {
  const llm = new OpenAI({temperature:0.7}); //temperature optional parameter for randomness/creativity
  const chain = loadQAStuffChain(llm);
  const url = "https://lizzie.ngrok.dev/recent_transcription"; //http://localhost:3000/recent_transcription
  const res = await fetch(url);
  const json = await res.json();
  const doc = new Document({ pageContent: json.recentTranscription }); 

  const response = await chain.call({
    input_documents: [doc],
    question: "Great moments are born from what?", //insert question
  });
  console.log(response.text);
})();