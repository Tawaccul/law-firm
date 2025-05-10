const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Замените на ваш email
    pass: 'your-email-password' // Замените на ваш пароль
  }
});

app.post('/send-email', (req, res) => {
  const { name, phone, email } = req.body;

  const mailOptions = {
    from: 'your-email@gmail.com', // Замените на ваш email
    to: 'mka.solidarnost@gmail.com',
    subject: 'Новая заявка с формы обратной связи',
    text: `Имя: ${name}\nТелефон: ${phone}\nПочта: ${email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
