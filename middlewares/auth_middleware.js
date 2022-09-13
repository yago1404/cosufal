const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/user_repository');

const authMiddleware = async function (req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization || authorization.search('Bearer')) return res.status(403).json({'status': 403, 'result': {'message': 'É preciso fazer login para continuar'}});
    jwt.verify(authorization.replace("Bearer ", ""), process.env.SECRET, {}, async (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(403).json({'status': 403, 'result': {'message': err.message}});
        }
        let user = await userRepository.findUserById(decoded.id);
        if (!user) return res.status(404).json({'status': 404, 'result': {'message': 'Usuário não encontrado'}});
        req.user = user;
        next();
    });
}

module.exports = { authMiddleware };