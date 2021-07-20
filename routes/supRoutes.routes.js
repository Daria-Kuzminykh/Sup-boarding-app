const {Router} = require('express');
const router = Router();
const Route = require('../models/SupRoute');
const auth = require('../middleware/auth.middleware');

router.get('/:region', async (req, res) => {
	try {
		const routes = await Route.find( { region: req.params.region });
		const routesPreview = routes.map(route => {
			return {
				place: route.place,
				name: route.name,
				level: route.level,
				time: route.time,
				ownerFullName: route.ownerFullName,
				id: route._id,
			}
		});
		res.json(routesPreview);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		const route = Route.findById(req.params.id);

		if (route) {
			await route.deleteOne();
		} else {
			return res.status(404).json({ message: 'Маршрут не найден' });
		}

		res.status(200).json({ message: 'Маршрут удален' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;