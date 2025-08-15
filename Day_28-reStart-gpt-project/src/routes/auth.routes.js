
const express = require('express')

const authRoutes = express.Router();
const {postRegisterController,postLoginController } = require('../controllers/auth.controller');

/** Regiseter Routes */

authRoutes.post('/register', postRegisterController);

/** Login Routes */

authRoutes.post('/login',postLoginController)

module.exports = authRoutes;