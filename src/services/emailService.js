require("dotenv").config();
const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: '"Hỏi Dân IT 👻" <cmnqpart2@gmail.com>', // sender address
    to: dataSend.receiverEmail, // list of receivers
    subject: "Thông tin đặt lệnh khám bệnh ✔", // Subject line
    html: getBodyHTMLEmail(dataSend), // html body
  });
};

let getBodyHTMLEmail = (dataSend) => {
  let result = '';
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Hỏi Dân IT</p>
    <p>Thông tin đặt lịch khám bệnh</p>
    <div><b>Thời gian: ${dataSend.time}</b></div>
    <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

    <p>Nếu các thông tin trên là đúng sự thật vui lòng click vào đường link bên dưới để xác nhận hoàn tất thủ tục đặt lịch khám bệnh</p>
    <div>
        <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
    </div>

    <div>Xin chân thành cám ơn</div>
  `
  }

  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you scheduled an online medical examination on Ask Dan IT</p>
    <p>Information on scheduling medical examinations</p>
    <div><b>Time: ${dataSend.time}</b></div>
    <div><b>Doctor: ${dataSend.doctorName}</b></div>

    <p>If the above information is true, please click on the link below to confirm and complete the medical appointment booking procedure.</p>
    <div>
        <a href="${dataSend.redirectLink}" target="_blank">Click here</a>
    </div>

    <div>Thank you very much</div>
  `
  }

  return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
  let result = '';
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Hỏi Dân IT</p>
    <p>Thông tin đơn thuốc/hóa đơn được gửi trong file đính kèm</p>

    <div>Xin chân thành cám ơn</div>
  `
  }

  if (dataSend.language === "en") {
    result = `
    <h3>Dear ${dataSend.patientName}!</h3>
    <p>You received this email because you scheduled an online medical examination on Ask Dan IT</p>
    <p>Information on scheduling medical examinations</p>
    

    <div>Thank you very much</div>
  `
  }

  return result;
}

let sendAttachment = async (dataSend) => {
  return new Promise(async(resolve, reject) => {
    try {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });
    
      const info = await transporter.sendMail({
        from: '"Hỏi Dân IT 👻" <cmnqpart2@gmail.com>', // sender address
        to: dataSend.email, // list of receivers
        subject: "Kết quả đặt lệnh khám bệnh ✔", // Subject line
        html: getBodyHTMLEmailRemedy(dataSend), // html body
        attachments: {   // encoded string as an attachment
          filename: `remedy-${dataSend.patientId}-${new Date().getTime()}.png`,
          content: dataSend.imgBase64.split("base64,")[1],
          encoding: 'base64'
      },
      });

      resolve()
    } catch (error) {
      reject(error)
    }
  
  
})
};

module.exports = {
  sendSimpleEmail,
  sendAttachment
};
