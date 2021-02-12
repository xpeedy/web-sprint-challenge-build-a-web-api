const express = require('express');
const server = express();

const actionsRouter = require("./actions/actions-router")
const projectsRouter = require("./projects/projects-router")
const mw = require("./middleware/middleware")

server.use("/api/projects", projectsRouter)
server.use("/api/actions", actionsRouter)
// Complete your server here!
// Do NOT `server.listen()` inside this file!

module.exports = server;
