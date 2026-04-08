import STRICT_EVALUATOR_PROMPT from "../constants/prompt"

export default async function routerResponse(code: string | JSON) {
  try {
    let response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-20b:free",
          messages: [
            {
              role: "user",
              content: "How many r's are in the word 'strawberry'?",
            },
            {
              role: "system",
              content: STRICT_EVALUATOR_PROMPT,
            },
          ],
          reasoning: { enabled: false },
        }),
      }
    )

    const result = await response.json()
    response = result.choices[0].message

    return response
  } catch (error) {
    console.error("something got wrong")
  }
}
