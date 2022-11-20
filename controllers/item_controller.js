const express = require("express");
const { authMiddleware } = require("../middlewares/auth_middleware");
const router = express.Router();
const itensRepository = require("../repositories/item_repository")
const imageRepository = require("../repositories/image_repository")

router.get('/get-all-itens', authMiddleware, async (req, res) => {
    let itens = await itensRepository.getAllItens();
    return res.status(200).json({'status': 200, 'result': {'itens': itens}});
});

router.post('/post-item', authMiddleware, async (req, res) => {
    let body = req.body;
    if (body.name === undefined || body.description === undefined || body.location === undefined || body.amount === undefined) {
        return res.status(400).json({'status': 400, 'result': {'message': 'Bad request'}});
    }
    await itensRepository.addItem(body);
    if (body.images !== undefined) {
        for (let image of body.images) {
            await imageRepository.insertImage(image);
        }
    }
    return res.status(200).json({'status': 200, 'result': {'message': 'success on save ' + body.name}});
});

module.exports = router;