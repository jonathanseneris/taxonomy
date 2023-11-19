import sgMail from "@sendgrid/mail"

import { env } from "@/env.mjs"

sgMail.setApiKey(env.SENDGRID_API_KEY)

interface SendgridResponse {
  error?: string
}
export function sendVerificationEmail({ to, url }): Promise<SendgridResponse> {
  console.log("sendVerificationEmail", to, url)
  return new Promise((resolve, reject) => {
    const msg = {
      from: "hi@madge.io", // Change to your verified sender
      personalizations: [
        {
          to: [{ email: to }],
          dynamic_template_data: {
            login_url: url,
          },
        },
      ],
      template_id: "d-4929bc32e1b74438879784171dbff8d5",
    }
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent")
        resolve({})
      })
      .catch((error) => {
        console.error(error)
        reject({ error })
      })
  })
}
