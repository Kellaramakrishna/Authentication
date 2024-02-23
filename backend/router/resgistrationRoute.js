const express = require("express");
const router = express.Router();
const registration=require("../controllers/registration")

router.post("/create-user",registration.userRegistration)

module.exports=router