import { MailService } from '@sendgrid/mail';
import { ContactFormData } from '@shared/schema';

const sendgridApiKey = process.env.SENDGRID_API_KEY;
const mailService = new MailService();

if (sendgridApiKey) {
  mailService.setApiKey(sendgridApiKey);
}

export async function sendContactFormEmail(data: ContactFormData): Promise<boolean> {
  if (!sendgridApiKey) {
    console.warn('SENDGRID_API_KEY is not set. Email functionality is disabled.');
    return false;
  }

  try {
    const { name, email, subject, message } = data;
    
    await mailService.send({
      to: 'blaire@blairedelanne.com',
      from: 'noreply@blairedelanne.com', // This must be a verified sender in your SendGrid account
      subject: `Contact from Webpage: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}
      `,
      html: `
<strong>Name:</strong> ${name}<br>
<strong>Email:</strong> ${email}<br>
<strong>Subject:</strong> ${subject}<br>
<strong>Message:</strong><br>
${message.replace(/\n/g, '<br>')}
      `
    });
    
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}