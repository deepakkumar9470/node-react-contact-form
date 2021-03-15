require("dotenv").config();
const express = require('express');
const nodemailer = require('nodemailer');
const PORT = process.env.PORT || 5001
const cors = require("cors")
const app = express();



// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors())


 app.post('/send', cors(), async (req, res) => {
    const {name ,phone, message} =  req.body;
    
    const output = `
        <p>You have a new contact request form Scizers</p>
        <h3>Contact Details</h3>
        <ul>  
        <li>Name: ${name}</li>
        <li>Phone: ${phone}</li>
        </ul>
        <h3>Message</h3>
        <p>${message}</p>
      `;
    const transporter = await nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated maittrap.io user
            pass: process.env.SMTP_PASS  // generated maittrap.io password
        },
        tls:{
        rejectUnauthorized:false
        }
    });

      await transporter.sendMail({
         from : `Nodemailer Contact`+ process.env.MAIL_FROM,
         to : process.env.MAIL_TO,
         subject : "Node Contact Request",
         text : "Hello Scizers",
         html : output
      });

  });

  app.listen(PORT, ()=>{
      console.log(`Server started at port ${PORT}`)
  })