const request = require("request");
const dotenv = require("dotenv");
const express = require("express");
const app = express();

dotenv.config();
app.use(express.json());

const url_line_notification = "https://notify-api.line.me/api/notify";

const setText = (data) => {
  let message = `\bแจ้งเตือนสมัครสมาชิก!
ชื่อ : ${data.firstname} ${data.lastname} 
อีเมลล์ : ${data.email}
ชื่อผู้ใช้ : ${data.username}
เบอร์โทร : ${data.phone}
วันที่สมัคร : ${new Date()}`;

  request(
    {
      method: "POST",
      uri: url_line_notification,
      header: {
        "Content-Type": "multipart/form-data",
      },
      auth: {
        bearer: process.env.TOKEN,
      },
      form: {
        message: message,
      },
    },
    (err, httpResponse, body) => {
      if (err) {
        console.log(err);
      } else {
        console.log(body);
      }
    }
  );
};

module.exports = setText;
