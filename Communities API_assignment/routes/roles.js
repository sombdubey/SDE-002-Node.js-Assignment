const express = require('express');
const { handleGetRoles, handlePostRoles } = require('../controllers/roles');

const routes = express.Router()

routes.route('/')
    .post(handlePostRoles)
    .get(handleGetRoles)


module.exports = routes