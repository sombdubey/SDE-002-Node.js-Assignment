const Member = require('../models/members')

async function handleAddMembers(req, res){
    const { community, user, role } = req.body;

    const result = await Member.create({
        community,
        user,
        role
    })
    
    delete result.updatedAt;
    delete result.__v;

    return res.json({
        status: true,
        content: {
            data: result
        }
    })
}

async function handleRemoveMembers(req, res){
    const id = req.params.id;
    Member.findOneAndDelete({
        _id: id
    }).then((result)=>{
        return res.status(200).json({
            status: true
        })
    }).catch((error)=>{
        return res.status(500).json({
            status: false,
            msg: error.message
        })
    })
}

module.exports = {
    handleAddMembers,
    handleRemoveMembers
}