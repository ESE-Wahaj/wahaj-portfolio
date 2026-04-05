import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendContactEmail(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
    to: 'contactwahajnaveed@gmail.com',
    subject: `[Portfolio] ${data.subject} - from ${data.name}`,
    html: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6B6B;">New Contact Message</h2>
        <p><strong>From:</strong> ${data.name} (${data.email})</p>
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <div style="background: #FFF8F0; padding: 16px; border-radius: 12px; border-left: 4px solid #FF6B6B;">
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        </div>
      </div>
    `,
  });

  await transporter.sendMail({
    from: `"Wahaj Naveed" <${process.env.SMTP_USER}>`,
    to: data.email,
    subject: `Thanks for reaching out, ${data.name}!`,
    html: `
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #FF6B6B;">Hi ${data.name}!</h2>
        <p>Thank you for getting in touch. I've received your message and will get back to you soon!</p>
        <p><strong>Your message:</strong></p>
        <div style="background: #FFF8F0; padding: 16px; border-radius: 12px;">
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        </div>
        <br/>
        <p>Best,<br/>Wahaj Naveed<br/>contactwahajnaveed@gmail.com</p>
      </div>
    `,
  });
}
