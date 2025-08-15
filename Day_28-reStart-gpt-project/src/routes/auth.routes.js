
const express = require('express')

const authRoutes = express.Router();
const {postRegisterController } = require('../controllers/auth.controller');

/** Regiseter Routes */

authRoutes.post('/register', postRegisterController);

module.exports = authRoutes;