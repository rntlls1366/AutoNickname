require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");


async function callChatGPT(prompt) {    //OpenAI로 메시지에 대한 답변을 요청하는 함수

  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });

  try {
    const openai = new OpenAIApi(configuration);

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: prompt}],
    });
    return response.data.choices[0].message;

  } catch (error) {
    console.error('Error calling ChatGPT API:', error);
    return null;
  }
}

module.exports = { callChatGPT };