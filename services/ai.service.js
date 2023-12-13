import OpenAI from 'openai';

const openai = new OpenAI();

export default class AIService {
  constructor() {
    this.ai = new openai({ apiKey: process.env.OPENAI_API_KEY });
  }

  async getStatement(params) {
    const chatCompletion = await this.ai.chat.completions.create({
      messages: [{ role: 'user', content: 'Say this is a test' }],
      model: 'gpt-3.5-turbo',
    });

    console.log(chatCompletion.choices[0]);
    return chatCompletion.choices[0];
  }
}
