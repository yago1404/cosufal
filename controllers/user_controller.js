const express = require("express");
const router = express.Router();
const userRepository = require('../repositories/user_repository');
const jwt = require("jsonwebtoken");

router.post('/auth', async (req, res) => {
    const { email, password } = req.body;
    let user = await userRepository.doLogin(email, password);
    if (!user) return res.status(401).json({'status': 401, 'result': {'message': 'Usuário ou senha incorretos'}});
    jwt.sign({'id': user.id}, process.env.SECRET, {expiresIn: '1800s'}, async (err, generatedToken) => {
        return res.status(200).json({'status': 200, 'result': {'accessToken': generatedToken, 'user': user}});
    });
});

module.exports = router;
