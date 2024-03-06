import db from "../models/index";
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll();
    return res.render("homepage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(e);
  }
};

let getCRUD = (req, res) => {
  return res.render("crud.ejs");
};

let postCRUD = async (req, res) => {
  let message = await CRUDService.createNewUser(req.body);
  console.log("message: ", message);
  return res.send("post crud server");
};

let displayGetCRUD = async (req, res) => {
  let data = await CRUDService.getAllUser();
  return res.render("display-crud.ejs", {
    dataTable: data,
  });
};

let getEditCRUD = async (req, res) => {
  let userId = req.query.id;
  console.log("userId: ", userId);
  if (userId) {
    let userData = await CRUDService.getUserInfoById(userId);
    if (userData) {
      return res.render("editCrud.ejs", {
        user: userData,
      });
    }
  } else {
    return res.send("user not found");
  }
};

let putCRUD = async (req, res) => {
  let data = req.body;
  let allUsers = await CRUDService.updateUserData(data);
  return res.render("display-crud.ejs", {
    dataTable: allUsers,
  });
};

let deleteCRUD = async (req, res) => {
  let id = req.query.id;
  if(id) {
    await CRUDService.deleteUserById(id)
    return res.send('Delete user succeed!')
  }else {
    return res.send('User not found')
  }
}

module.exports = {
  getHomePage: getHomePage,
  getCRUD: getCRUD,
  postCRUD: postCRUD,
  displayGetCRUD: displayGetCRUD,
  getEditCRUD: getEditCRUD,
  putCRUD: putCRUD,
  deleteCRUD
};
