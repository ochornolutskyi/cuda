const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.ukr.net',
    port: 465,
    secure: true,
    auth: {
        user: 'cuda.test@ukr.net',
        pass: '0123456789cuda'
    }
});

const mailer = function(message){
  transporter.sendMail(message, function(err, info){
    if(err) return console.log(err);
    console.log('Email sent to: ', info);
  });
}

module.exports = mailer;