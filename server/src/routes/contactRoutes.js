import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

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

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body ?? {};

  if (!name || !email || !message) {
    return res.status(400).json({
      ok: false,
      message: "Name, email, and message are required.",
    });
  }

  try {
    const record = {
      name: name.trim(),
      email: email.trim(),
      subject: subject?.trim() || "General inquiry",
      message: message.trim(),
    };

    const transporter = createTransporter();

    if (!transporter) {
      return res.status(500).json({
        ok: false,
        message:
          "Email service is not configured yet. Set SMTP_USER and SMTP_PASS in the server .env file.",
      });
    }

    await transporter.sendMail({
      from: `Portfolio Contact <${mailUser}>`,
      to: mailRecipient,
      replyTo: record.email,
      subject: `[Portfolio] ${record.subject}`,
      text: `Name: ${record.name}\nEmail: ${record.email}\nSubject: ${record.subject}\n\n${record.message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
          <h2 style="margin-bottom: 16px;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${record.name}</p>
          <p><strong>Email:</strong> ${record.email}</p>
          <p><strong>Subject:</strong> ${record.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${record.message.replace(/\n/g, "<br />")}</p>
        </div>
      `,
    });

    return res.status(201).json({
      ok: true,
      message: "Message sent to email successfully.",
      storage: "email",
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      message:
        error?.code === "EAUTH"
          ? "SMTP authentication failed. Check SMTP_USER and SMTP_PASS in the server .env file."
          : "Unable to send the message right now.",
    });
  }
});

export default router;