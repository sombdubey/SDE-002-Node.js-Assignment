const { getToken } = require("../services/auth")
const Community = require('../models/communities')
const Member = require("../models/members")

async function restrictLoggedIn(req, res, next){
    const token = req.cookies?.token
   
    if(!token) return res.status(401).json({
        status: false,
        msg: "unauthorized"
    })
    const user = await getToken(token)

    if(!user) return res.status(401).json({
        status: false,
        msg: 'token is invalid'
    })
    req.user = user
   
    next()
}

async function isCommunityAdmin(req, res, next){
    const member = await Member.findOne({_id: req.params.id});
    let { community } = req.body;
    if(community === undefined) community = member.community
    Community.findOne({_id: community})
    .then((result)=>{
        if(result.owner.toString() !== req.user.id) return res.status(405).json({
            status: false,
            data: "Access Denied"
        })
        next();
    }).catch((error)=>{
        return res.status(500).json({
            status: false,
            data: error.message
        })
    })
}

async function isLoggedIn(req, res, next){
    const token = req.cookies?.token
    req.token = token
    next()
}

module.exports = {
    restrictLoggedIn,
    isCommunityAdmin,
    isLoggedIn
}
