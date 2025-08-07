// email/sendVerificationEmail.js
const transporter = require('./transporter.service');

const sendVerificationEmail = async (toEmail, token) => {
  console.log(token)
  const verificationLink = `http://localhost:5173/verify-email?token=${token}`; // update with frontend URL
  
  await transporter.sendMail({  
    from: `"My App" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Verify Your Email",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
    `
  });
};

module.exports = sendVerificationEmail;
