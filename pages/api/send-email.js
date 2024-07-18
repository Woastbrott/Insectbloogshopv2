// pages/api/send-email.js
import sendgrid from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'henrionline08@gmail.com',
    from: 'your_verified_sendgrid_email@example.com', // Ersetze dies durch deine verifizierte SendGrid-E-Mail
    subject: `Kontaktanfrage von ${name}`,
    text: message,
    reply_to: email,
  };

  try {
    await sendgrid.send(msg);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error sending email' });
  }
};
