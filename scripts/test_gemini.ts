import { GoogleGenerativeAI } from '@google/generative-ai';

async function run() {
  try {
    const genAI = new GoogleGenerativeAI('AIzaSyABjCLUk4AKJZUGDQj7z0IV43Rtid6b1rk');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent('Say hello!');
    console.log(result.response.text());
  } catch (error: any) {
    console.error('Error:', error.message);
  }
}

run();
