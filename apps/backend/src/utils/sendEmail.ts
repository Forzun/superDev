import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendEmail(email: string, token: string) {
  const magicLink = `http://localhost:3000/${process.env.FRONTEND_URL}?token=${token}`

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: "delivered@resend.dev",
    subject: "logining into your account",
    html: `
      <h2>Login to Your App</h2>
      <p>Click the button below to log in. This link expires in 15 minutes.</p>
      <a href="${magicLink}" style="
        display: inline-block;
        padding: 12px 24px;
        background-color: #4F46E5;
        color: white;
        text-decoration: none;
        border-radius: 6px;
        font-weight: bold;
      ">
        Log In
      </a>
      <p>Or copy this link: ${magicLink}</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  })

  if (error) {
    console.error("Failed to send magic link:", error)
    throw new Error(error.message)
  }
}
