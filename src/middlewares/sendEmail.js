import nodemailer from 'nodemailer';

const sendMail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.HOST,
      port: process.env.PORT,
      secure: true,
      auth: {
        user: process.env.HOST,
        pass: process.env.HOST,
      },
    });
    await transporter.sendMail({
      from: process.env.HOST,
      to: email,
      subject: subject,
      text: text,
    });
  } catch (error) {
    console.log(error, 'email not sent');
  }
};

module.exports = sendMail;
