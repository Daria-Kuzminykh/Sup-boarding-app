const {Router} = require('express');
const router = Router();
const Route = require('../models/SupRoute');
const auth = require('../middleware/auth.middleware');

router.get('/:id', async (req, res) => {
	try {
		const supRoute = await Route.findById(req.params.id);
		res.json(supRoute);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

router.patch('/', auth, async (req, res) => {
	try {
		const {region, place, name, level, time, fotoLink, descr, plus, minus, _id} = req.body;
		await Route.findByIdAndUpdate(_id, {region, place, name, level, time, fotoLink, descr, plus, minus}, {
			useFindAndModify: false,
		});

		res.status(200).json({ message: 'Маршрут изменен' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;