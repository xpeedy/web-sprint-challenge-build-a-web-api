const Actions = require("../actions/actions-model")
const router = require("../actions/actions-router")
const Projects = require("../projects/projects-model")


const validateId = (req, res, next) => {
    const { id } = req.params
    Actions.get(id).then(id => {
        !id?
        res.status(404).json({message:"id not found"}) :
        req.id = id
        next()
    })
    .catch(err => {
        res.status(500).json({message:`server error: ${err.message}`})
    })
}

const validatebody = (req, res, next) => {
    const { project_id, description, notes, completed } = req.body
    !project_id || !description || !notes || !completed ?
    res.status(400).json({message:"fields are required"}) :
    next()
}

// const validateId = (req, res, next) => {
    
// }

const validateProjectBody = (req, res, next) => {
    const { name, description, completed } = req.body
    !name || !description || !completed ?
    res.status(400).json({message:"fields are required"}) :
    next()
}

module.exports = {
    validateId,
    validatebody,
    validateProjectBody
}