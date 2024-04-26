const db = require("../models");
require("dotenv").config();
import { sendSimpleEmail } from "./emailService";

let postBookAppointment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await sendSimpleEmail({
          receiverEmail: data.email,
          patientName: 'Hỏi dân IT patient',
          time: '8:00 - 9:00 Chủ nhật 1/8/2021',
          doctorName: "Erik",
          redirectLink: 'https://www.youtube.com/@hoidanit'
        })
        // upsert patient
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }

        // create a booking record
        resolve({
          errCode: 0,
          errMessage: "Save info patient succeed!",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  postBookAppointment,
};
