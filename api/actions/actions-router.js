// Write your "actions" router here!
const express = require("express")
const router = express.Router() 
const Actions = require("./actions-model")
const mw = require("../middleware/middleware")


router.get("/",(req, res) => {
    Actions.get().then(actions => {
        !actions?
        res.status(404).json({message:"user not found"}) :
        res.status(200).json(actions)
    })
})

router.get("/:id",mw.validateId,(req, res) => {
    res.status(200).json(req.id)
})

router.post("/",mw.validatebody,(req, res) => {
    const { project_id, description, notes, completed } = req.body
    Actions.insert({project_id, description, notes, completed}).then(newaction => {
    res.status(201).json({message:"action was added"})
    })
})

router.put("/:id",mw.validateId,mw.validatebody,(req, res) => {
    const { id } = req.params
    const body = req.body
    Actions.update(id, body).then(update => {
        res.status(200).json(update,{message:"action was updated"})
    })
    .catch(err => {
        res.status(500).json({message:`server error: ${err.message}`})
    })
})

router.delete("/:id",mw.validateId,(req, res) => {
    const { id } = req.params
    Actions.remove(id).then(() => {
        res.status(200).json({message:"action deleted"})
    })
})

module.exports = router;