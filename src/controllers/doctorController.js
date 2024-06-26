import doctorService from "../services/doctorService";

let getTopDoctorHome = async (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    limit = 10;
  }

  try {
    let response = await doctorService.getTopDoctorHome(+limit);
    return res.status(200).json(response);
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      message: "Error from server...",
    });
  }
};

let getAllDoctors = async(req, res) => {
  try {
    let doctors = await doctorService.getAllDoctors()
    return res.status(200).json(doctors)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let postInfoDoctor = async(req, res) => {
  try {
    let response = await doctorService.saveDetailInfoDoctor(req.body)
    return res.status(200).json(response)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let getDetailDoctorById = async(req, res) => {
  try {
    let infor = await doctorService.getDetailDoctorById(req.query.id)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let bulkCreateSchedule = async(req, res) => {
  try {
    let infor = await doctorService.bulkCreateSchedule(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let getScheduleByDate = async(req, res) => {
  try {
    let infor = await doctorService.getScheduleByDate(req.query.doctorId, req.query.date)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let getExtraInfoDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getExtraInfoDoctorById(req.query.doctorId)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let getProfileDoctorById = async (req, res) => {
  try {
    let infor = await doctorService.getProfileDoctorById(req.query.doctorId)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let getListPatientForDoctor = async(req, res) => {
  try {
    let infor = await doctorService.getListPatientForDoctor(req.query.doctorId, req.query.date)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

let sendRemedy = async(req, res) => {
  try {
    let infor = await doctorService.sendRemedy(req.body)
    return res.status(200).json(infor)
  } catch (error) {
    console.log("error: ", error);
    return res.status(200).json({
      errCode: -1,
      errMessage: 'Error from the server'
    })
  }
}

module.exports = {
  getTopDoctorHome,
  getAllDoctors,
  postInfoDoctor,
  getDetailDoctorById,
  bulkCreateSchedule,
  getScheduleByDate,
  getExtraInfoDoctorById,
  getProfileDoctorById,
  getListPatientForDoctor,
  sendRemedy
};
