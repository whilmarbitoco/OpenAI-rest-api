const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");


const app = express();

app.use(bodyParser.json());

const apikey = "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";


const configuration = new Configuration({
  apiKey: apikey
});
const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send("Node.js Rest Api with express.js for OpenAI by Whilmar Bitoco")
})

app.post("/api", async (req, res) => {
  const { msg } = req.body;

  try { 
     const com = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg,
    max_tokens: 2048, 
    temperature: 0,
    top_p:1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0
    
  });
  res.json({
    status: 200,
    respond: com.data.choices[0].text
  })
console.log("successful")
  } catch(e) {

res.json({
    status: 500,
    respond: e
  })
console.log(`Error: ${e}`)
}
})
  
  
  
  
const PORT = 800
app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`)
});