const express = require("express");
const { authMiddleware } = require("../middlewares/auth_middleware");
const router = express.Router();
const itensRepository = require("../repositories/item_repository")

router.get('/get-all-itens', authMiddleware, async (req, res) => {
    let itens = await itensRepository.getAllItens();
    return res.status(200).json({'status': 200, 'result': {'itens': itens}});
});

module.exports = router;