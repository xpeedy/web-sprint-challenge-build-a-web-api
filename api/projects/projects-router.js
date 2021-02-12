// Write your "projects" router here!
const express = require("express")
const router = express.Router() 
const projects = require("./projects-model")
const mw = require("../middleware/middleware")

module.exports = router;