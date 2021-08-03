const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const Event = require('../models/Event');

router.get('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ message: 'Данное событие не найдено((' });
		event.clicks++;
		await event.save();
		res.json(event);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;