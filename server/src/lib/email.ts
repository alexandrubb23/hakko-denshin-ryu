import sgMail from "@sendgrid/mail";
import { env } from "../env.js";

sgMail.setApiKey(env.SENDGRID_API_KEY);

export const sendInvitationEmail = async (
  to: string,
  name: string,
  inviteUrl: string,
): Promise<void> => {
  if (env.NODE_ENV === "test") return;

  await sgMail.send({
    from: env.SENDGRID_FROM_EMAIL,
    to,
    subject: "You've been invited to Senshinkan Romania",
    html: `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head>
<body style="font-family: sans-serif; background: #f4f4f4; margin: 0; padding: 32px;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="520" cellpadding="0" cellspacing="0"
          style="background: #ffffff; border-radius: 8px; padding: 40px; border: 1px solid #e0e0e0;">
          <tr>
            <td>
              <h2 style="margin: 0 0 8px; color: #1a1a2e;">Senshinkan Romania</h2>
              <p style="color: #555; margin: 0 0 24px;">
                Hi <strong>${name}</strong>,
              </p>
              <p style="color: #555; margin: 0 0 24px;">
                You have been added to the Senshinkan Romania member portal.
                Click the button below to set your password and activate your account.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 0 0 24px;">
                <tr>
                  <td align="center">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center"
                          style="background: #3b1f8c; border-radius: 6px; padding: 12px 28px;">
                          <a href="${inviteUrl}"
                            style="font-size: 15px; font-weight: 700; font-family: sans-serif;
                                   color: #ffffff; text-decoration: none; display: block;
                                   mso-padding-alt: 0;">
                            <font color="#ffffff">Set Your Password</font>
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              <p style="color: #999; font-size: 13px; margin: 0;">
                This link will expire in 7 days. If you did not expect this invitation,
                you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  });
};
