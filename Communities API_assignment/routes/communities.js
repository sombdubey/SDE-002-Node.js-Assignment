const express = require('express')
const { handleCreateCommunity, handleGetCommunity, handleGetAllMembers, handleGetMyOwnCommunities, handleGetMyJoinedCommunities } = require('../controllers/communities')
const { restrictLoggedIn } = require('../middlewares/auth')
const { route } = require('./roles')

const router = express.Router()


router.route('/')
    .post(restrictLoggedIn, handleCreateCommunity)
    .get(handleGetCommunity)

router.route('/:id/members')
    .get(handleGetAllMembers)

router.route('/me/owner')
    .get(restrictLoggedIn, handleGetMyOwnCommunities)

router.route('/me/member')
    .get(restrictLoggedIn, handleGetMyJoinedCommunities)


module.exports = router