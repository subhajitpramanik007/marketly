import { env } from '@marketly/config';
import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';

const transport = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT) || 587,
  service: env.SMTP_SERVICE,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASSWORD,
  },
});

// Render HTML template
const renderTemplate = (
  filePath: string,
  templateName: string,
  data: Record<string, any>,
): Promise<string> => {
  const pathDirs = filePath.split('/');
  const templatePath = path.join(...pathDirs, `${templateName}.ejs`);
  //   const templatePath = path.join(
  //     process.cwd(),
  //     'apps',
  //     'packages',
  //     'lib',
  //     'public',
  //     'email-templates',
  //     `${templateName}.ejs`,
  //   );

  return ejs.renderFile(templatePath, data);
};

const sendEmail = async (
  to: string,
  subject: string,
  data: Record<string, any>,
  template: {
    path: string;
    name: string;
  },
) => {
  try {
    const html = await renderTemplate(template.path, template.name, data);

    await transport.sendMail({
      from: env.SMTP_FROM,
      to,
      subject,
      html,
    });
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export { sendEmail };
