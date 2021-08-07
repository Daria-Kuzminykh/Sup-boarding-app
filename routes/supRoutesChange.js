const {Router} = require('express');
const router = Router();
const Route = require('../models/SupRoute');
const auth = require('../middleware/auth.middleware');

router.get('/:id', async (req, res) => {
	try {
		const supRoute = await Route.findById(req.params.id);
		if (!supRoute) return res.status(404).json({ message: 'Данный маршрут не найден((' });

		res.json(supRoute);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

router.patch('/', auth, async (req, res) => {
	try {
		const user = req.user.userId;
		const route = await Route.findById(req.body._id);
		if (!route) return res.status(404).json({ message: 'Данный маршрут не найден((' });
		if (String(user) !== String(route.owner)) return res.status(400).json({ message: 'Изменять маршрут может только его автор' });

		const {region, place, name, level, time, fotoLink, descr, plus, minus, _id, stravaLink, coordinatesLink, coverChoice} = req.body;
		await Route.findByIdAndUpdate(_id, {region, place, name, level, time, fotoLink, descr, plus, minus, stravaLink, coordinatesLink, coverChoice}, {
			useFindAndModify: false,
		});

		res.status(200).json({ message: 'Маршрут изменен' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;