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

router.get("/:id",mw.validateId,(req, res) => {
    res.status(200).json(req.id)
})

router.get("/:id/actions",(req, res) => {
    
})

router.post("/",mw.validateProjectBody,(req, res) => {
    const { name, description, completed } = req.body
    Actions.insert({name, description, completed}).then(newaction => {
    res.status(201).json({message:"action was added"})
    })
})

router.put("/:id",mw.validateProjectBody,mw.validateId,(req, res) => {
    const { id } = req.params
    const body = req.body
    Actions.update(id, body).then(update => {
        res.status(200).json(update,{message:"action was updated"})
    })
    .catch(err => {
        res.status(500).json({message:`server error: ${err.message}`})
    })
})

router.delete("/:id",(req, res) => {
    const { id } = req.params
    Actions.remove(id).then(() => {
        res.status(200).json({message:"action deleted"})
    })
})

module.exports = router;