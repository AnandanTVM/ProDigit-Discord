const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  secure: false,
  auth: {
    user: "anandan1999n@gmail.com",
    pass: "bcniibqgpywnddkl"
  },
  tls: { rejectUnauthorized: false },
});
module.exports = {
  SendOTP: (otp, tomail, name) =>
    new Promise((resolve, reject) => {
      try {
        const mailOptions = {
          from: process.env.AUTH_EMAIL,
          to: tomail,
          subject: "Prodigit OTP alert ",
          html: `<h2>Dear ${name} ,<h2/>  <p><h3>Greetings from Prodigit</h3> </p><h4><p>
                 Your 4 digit One Time Password is<h2> <b>${otp} </b></h2>.This code <b> expires in 1 houre</b>.. Never share this OTP with anyone. 
                 For any assistance, please contact www.Prodigit.com</p> </h4>`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("here");

            console.log(error);
            reject(error);
          } else {
            console.log(process.env.AUTH_EMAIL);
            console.log(process.env.AUTH_EMAIL_TEST_PAS);
            console.log(`Email sent: ${info.response}`);
            resolve(info.response);
          }
        });
      } catch (error) {
        reject(error);
      }
    }),
};
