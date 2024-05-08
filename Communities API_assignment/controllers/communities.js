const Community = require('../models/communities')
const Member = require('../models/members')
const slugify = require('slugify')

async function handleCreateCommunity(req, res){
    const {name} = req.body;
    const slug = slugify(name, { lower: true });
    const userId = req.user.id; 
    const result = await Community.create({
        name: name,
        slug: slug,
        owner: userId
    })

    const member = await Member.create({
        community: result._id,
        user: result.owner,
        role: '7115918095876943514'
    })

    return res.status(201).json({
        status: true,
        content: {
            data: result,
        }
    })
}

async function handleGetCommunity(req, res){
    const result = await Community.find({}).populate({path: 'owner', select: '_id name'});
    return res.status(200).json({
        status: true,
        content: {
            meta: {
                total: result.length,
                pages: 1,
                page: 1
            },
            data: result
        }
    })
}

async function handleGetAllMembers(req, res){
    const slug = req.params.id;
    const community = await Community.findOne({slug: slug})
    const members = await Member.find({community: community._id})
        .populate({path:'user', select: '_id, name'})
        .populate({path: 'role', select: '_id name'})

    res.json({
        status: true,
        content: {
            meta: {
                total: members.length,
                pages: 1,
                page: 1
            },
            data: members
        }
    })
}

async function handleGetMyOwnCommunities(req, res){
    const result = await Community.find({
        owner: req.user.id
    })

    res.status(200).json({
        status: true,
        content:{
            meta: {
                total: result.length,
                pages: 1,
                page: 1
            },
            data: result
        }
    })
}

async function handleGetMyJoinedCommunities(req, res){

    try {
        const members = await Member.find({
            user: req.user.id
        })
        const result = await Promise.all(members.map(async (member)=>{
            const { community } = member
            const communityInstance = await Community.findOne({_id: community}).populate({path: 'owner', select: '_id name'})
            return communityInstance;
        }));
    
        return  res.status(200).json({
            status: true,
            content: {
                meta: {
                    total: result.length,
                    pages: 1,
                    page:1
                },
                data: result
            }
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            content: {
                data: error.message
            }
        })
    }
}

module.exports = {
    handleCreateCommunity,
    handleGetCommunity,
    handleGetAllMembers,
    handleGetMyOwnCommunities,
    handleGetMyJoinedCommunities
}