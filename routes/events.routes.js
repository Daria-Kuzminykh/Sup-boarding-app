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
});

router.get('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ message: 'Данное событие не найдено((' });

		res.json(event);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.delete('/:id', auth, async (req, res) => {
	try {
		const event = await Event.findById(req.params.id);
		if (!event) return res.status(404).json({ message: 'Данное событие не найдено((' });
		const user = req.user.userId;
		if (String(user) !== String(event.owner)) return res.status(400).json({ message: 'Удалять событие может только его автор' });

		await event.deleteOne();

		res.status(200).json({ message: 'Событие удалено' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.patch('/change', auth, async (req, res) => {
	try {
		const user = req.user.userId;
		const event = await Event.findById(req.body._id);
		if (String(user) !== String(event.owner)) return res.status(400).json({ message: 'Изменять событие может только его автор' });

		const {name, place, descr, contacts, contactTel, dateEvent, _id} = req.body;
		await Event.findByIdAndUpdate(_id, {name, place, descr, contacts, contactTel, dateEvent}, {
			useFindAndModify: false,
		});

		res.status(200).json({ message: 'Событие изменено' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

module.exports = router;