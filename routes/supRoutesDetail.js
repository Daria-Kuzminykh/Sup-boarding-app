const {Router} = require('express');
const router = Router();
const Route = require('../models/SupRoute');

router.get('/:id', async (req, res) => {
	try {
		const supRoute = await Route.findById(req.params.id);
		if (!supRoute) return res.status(404).json({ message: 'Данный маршрут не найден((' });
		supRoute.clicks++;
		await supRoute.save();
		res.json(supRoute);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

module.exports = router;