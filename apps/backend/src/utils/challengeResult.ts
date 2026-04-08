import routerResponse from "../lib/openrouter"

export default async function challengeResponse(code: string | JSON): Promise<
  | {
      score: number
    }
  | undefined
> {
  try {
    const result = routerResponse(code)
    console.log("result here:", result)
    return {
      score: 0,
    }
  } catch (error) {
    console.error("something got wrong!", error)
  }
}
