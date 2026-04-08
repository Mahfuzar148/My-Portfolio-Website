import nodemailer from "nodemailer";

const mailUser = process.env.SMTP_USER;
const mailPass = process.env.SMTP_PASS;
const mailHost = process.env.SMTP_HOST || "smtp.gmail.com";
const mailPort = Number(process.env.SMTP_PORT || 587);
const mailRecipient = process.env.CONTACT_RECEIVER_EMAIL || "mahfuzar148@gmail.com";

function createTransporter() {
  if (!mailUser || !mailPass) {
    return null;
  }

  return nodemailer.createTransport({
    host: mailHost,
    port: mailPort,
    secure: mailPort === 465,
    auth: {
      user: mailUser,
      pass: mailPass,
    },
  });
}

function createResponse(statusCode, body) {
  return {
    statusCode,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Content-Type",
    },
    body: JSON.stringify(body),
  };
}

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return createResponse(200, { ok: true });
  }

  if (event.httpMethod !== "POST") {
    return createResponse(405, {
      ok: false,
      message: "Method not allowed.",
    });
  }

  const transporter = createTransporter();

  if (!transporter) {
    return createResponse(500, {
      ok: false,
      message: "SMTP is not configured. Set SMTP_USER and SMTP_PASS in Netlify environment variables.",
    });
  }

  let payload = {};

  try {
    payload = JSON.parse(event.body || "{}");
  } catch (_error) {
    return createResponse(400, {
      ok: false,
      message: "Invalid request body.",
    });
  }

  const name = String(payload.name || "").trim();
  const email = String(payload.email || "").trim();
  const subject = String(payload.subject || "").trim() || "General inquiry";
  const message = String(payload.message || "").trim();

  if (!name || !email || !message) {
    return createResponse(400, {
      ok: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${mailUser}>`,
      to: mailRecipient,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return createResponse(201, {
      ok: true,
      message: "Message sent successfully.",
    });
  } catch (error) {
    return createResponse(500, {
      ok: false,
      message:
        error?.code === "EAUTH"
          ? "SMTP authentication failed. Check SMTP_USER and SMTP_PASS."
          : "Unable to send the message right now.",
    });
  }
};