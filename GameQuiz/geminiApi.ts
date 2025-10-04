import axios from 'axios';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizFetchResult {
  questions: QuizQuestion[];
  error?: string;
}

export interface GeminiQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const SUPPORTED_COURSES = [
  'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'HTML5', 'CSS3', 'Redux',
  'Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'Docker', 'Prisma ORM', 'Git', 'GitHub', 'Python'
];

const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function testGeminiApi(apiKey: string) {
  const prompt = 'Say hello world as a JSON object: {"message": "hello world"}';
  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      }
    );

    const text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Gemini raw response:', text);

    try {
      const obj = JSON.parse(text);
      console.log('Parsed Gemini response:', obj);
      return obj;
    } catch (err) {
      console.error('Failed to parse Gemini response:', err, response.data);
      return text;
    }
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (err.response) {
      console.error('Gemini API request failed:', err.response.status, err.response.data);
    } else {
      console.error('Gemini API request failed:', err.message);
    }
    return null;
  }
}

export async function generateCourseQuizQuestions(
  course: string,
  apiKey: string,
  numQuestions = 18
): Promise<GeminiQuizQuestion[] | string> {
  const prompt = `Generate ${numQuestions} multiple-choice questions about ${course} only. 
  Each question should be about ${course} concepts, syntax, or features. 
  Do not include questions about other programming languages, databases, or general computer science. 
  Each question should have 4 options, only one correct answer. 
  Return ONLY a valid JSON array, with NO explanation, markdown, or extra text. 
  The output should be exactly: [{"question": "...", "options": ["...","...","...","..."], "correctAnswer": "..."}]`;

  try {
    const response = await axios.post(
      GEMINI_API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-goog-api-key': apiKey,
        },
      }
    );

    let text = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    console.log('Gemini raw response:', text);

    text = text.replace(/```json|```/g, '').trim();

    try {
      const arr = JSON.parse(text);
      if (Array.isArray(arr)) {
        return arr;
      } else {
        return 'Gemini did not return a valid array.';
      }
    } catch {
      return 'Failed to parse Gemini response as JSON.';
    }
  } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (err.response) {
      return `Gemini API request failed: ${err.response.status} ${JSON.stringify(
        err.response.data
      )}`;
    } else {
      return `Gemini API request failed: ${err.message}`;
    }
  }
}
