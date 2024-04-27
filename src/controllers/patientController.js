import patientService from '../services/patientService'

let postBookAppointment = async(req, res) => {
    try {
        let infor = await patientService.postBookAppointment(req.body)
        return res.status(200).json(infor)
      } catch (error) {
        console.log("error: ", error);
        return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from the server'
        })
      }
}

let postVerifyBookAppointment = async(req, res) => {
  try {
      let infor = await patientService.postVerifyBookAppointment(req.body)
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
    postBookAppointment,
    postVerifyBookAppointment
}