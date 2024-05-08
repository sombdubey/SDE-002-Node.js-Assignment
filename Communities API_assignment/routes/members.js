const express = require('express')
const { handleAddMembers, handleRemoveMembers } = require('../controllers/members')
const {restrictLoggedIn, isCommunityAdmin} = require('../middlewares/auth')

const router = express.Router()

router.route('/')
    .post(restrictLoggedIn, isCommunityAdmin, handleAddMembers)

router.route('/:id')
    .delete(restrictLoggedIn, isCommunityAdmin, handleRemoveMembers)

module.exports = router