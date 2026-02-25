//Som hjälp/stöd användes https://www.youtube.com/watch?v=IUK98wrWsto&t=105s
// npm install openai@^0.0.0
// Måste laga kredits i gpt för att få ai och funkka
import { OpenAI } from 'openai';

const key = import.meta.env.VITE_OPENAI_KEY;

const openai = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export default openai;