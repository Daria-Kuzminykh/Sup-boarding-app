const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const Event = require('../models/Event');

router.get('/', auth, async (req, res) => {
	try {
		const events = await Event.find();
		const eventsPreview = events.map(event => {
			return {
				place: event.place,
				name: event.name,
				dateEvent: event.dateEvent,
				ownerFullName: event.ownerFullName,
				id: event._id,
			}
		});
		res.json(eventsPreview);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

router.delete('/:id', auth, async (req, res) => {
	try {
		const event = Event.findById(req.params.id);

		if (event) {
			await event.deleteOne();
		} else {
			return res.status(404).json({ message: 'Событие не найдено' });
		}

		res.status(200).json({ message: 'Событие удалено' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

module.exports = router;