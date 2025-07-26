import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';

// Create transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any SMTP
  auth: {
    user: 'ansh.pasricha2005@gmail.com',
    pass: 'yvod asje enot swcp'       
  }
});

const sendUserProfile = async (user, email) => {
  const mailOptions = {
    from: 'ansh.pasricha2005@gmail.com',
    to: email,
    subject: 'New User Profile Submission',
    html: `
      <h3>User Profile</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
      <p><strong>Age:</strong> ${user.age}</p>
      <p><strong>Experience:</strong> ${user.experience} years</p>
      <p><strong>Profile Picture:</strong> Attached below</p>
      <p><strong>Resume:</strong> Attached below</p>
    `,
    attachments: [
      {
        filename: 'ProfilePicture.jpg',
        path: path.join(process.cwd(), 'public', 'uploads' ,user.profilePic) // convert to absolute path
      },
      {
        filename: 'Resume.pdf',
        path: path.join(process.cwd(), 'public', 'uploads' ,user.resume) // convert to absolute path
      }
    ]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};
export default sendUserProfile;
