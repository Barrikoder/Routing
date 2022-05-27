const express = require("express");
const { get } = require("express/lib/response");

const appRouter = express.Router();
const { getAllUsers, getOneUser, createUser, updateUser, deleteUser } = require("../controllers/controllers.js");

appRouter.route("/").get(getAllUsers).post(createUser);
appRouter.route("/:id").get(getOneUser).put(updateUser).delete(deleteUser); 

module.exports = appRouter; 