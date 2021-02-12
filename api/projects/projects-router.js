// Write your "projects" router here!
const express = require("express")
const router = express.Router() 
const Projects = require("./projects-model")
const mw = require("../middleware/middleware")


router.get("/",(req, res) => {
    Projects.get().then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
    })
})

router.get("/:id",mw.validateProjectId,(req, res) => {
    res.status(200).json(req.id)
})

router.get("/:id/actions",mw.validateProjectId,(req, res) => {
    const { id } = req.params
    Projects.getProjectActions(id).then(actions => {
        res.status(200).json(actions)
    })
})

router.post("/",mw.validateProjectBody,(req, res) => {
    const { name, description, completed } = req.body
    Projects.insert({name, description, completed}).then(newaction => {
    res.status(201).json({message:"project was added"})
    })
})

router.put("/:id",mw.validateProjectBody,mw.validateProjectId,(req, res) => {
    const { id } = req.params
    const body = req.body
    Projects.update(id, body).then(update => {
        res.status(200).json(update,{message:"project was updated"})
    })
    .catch(err => {
        res.status(500).json({message:`server error: ${err.message}`})
    })
})

router.delete("/:id",(req, res) => {
    const { id } = req.params
    Projects.remove(id).then(() => {
        res.status(200).json({message:"project deleted"})
    })
})

module.exports = router;