import nodemailer from 'nodemailer';

// Replace with your real Gmail and app password

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ansh.pasricha2005@gmail.com',         // Your Gmail
    pass: 'yvod asje enot swcp'       // App Password (not your Gmail password)
  }
});

export const sendEmail = async (to, subject, text ) => {
  const mailOptions = {
    from: 'ansh.pasricha2005@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};
