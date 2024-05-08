const Role = require('../models/roles')


const handlePostRoles = async (req, res) =>{
    const {name} = req.body;
    const result = await Role.create({
        name
    })
    res.status(201).json(result);
}

const handleGetRoles = async (req, res) => {
    const result = await Role.find({});
    res.json(result)
}

module.exports = {handleGetRoles, handlePostRoles}