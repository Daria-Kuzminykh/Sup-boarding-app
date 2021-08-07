const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');
const User = require('../models/User');
const {check, validationResult} = require('express-validator');
const Route = require('../models/SupRoute');
const Event = require('../models/Event');
const bcrypt = require('bcryptjs');

router.get('/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		const supRoutes = await Route.find({ owner: req.params.id });

		const routesPreview = supRoutes.map(route => {
			return {
				place: route.place,
				name: route.name,
				level: route.level,
				time: route.time,
				ownerFullName: route.ownerFullName,
				id: route._id,
				coverChoice: route.coverChoice,
				cover: route.cover || '',
			}
		});

		const events = await Event.find({ owner: req.params.id });

		const eventsPreview = events.map(event => {
			return {
				place: event.place,
				name: event.name,
				dateEvent: event.dateEvent,
				ownerFullName: event.ownerFullName,
				id: event._id,
			}
		});

		const data = { ...user, events: eventsPreview, supRoutes: routesPreview };

		res.json(data);
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.post('/route-form',
	[
		check('name', 'Введите название маршрута').isLength({ min: 2 }),
		check('time', 'Введите количество часов').isLength({ min: 1 }),
		check('place', 'Введите место').isLength({ min: 2 }),
	],
	auth,
	async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Некорректные данные при создании маршрута',
			})
		}

		const {region, place, name, level, time, fotoLink, descr, plus, minus, stravaLink, coordinatesLink, coverChoice } = req.body;

		const nowDate = new Date();
		const year = nowDate.getFullYear();
		const mouth = Number(nowDate.getMonth()) + 1;
		let mouthRight = mouth;
		if (mouth < 10) {
			mouthRight = `0${mouth}`;
		}
		const day = nowDate.getDate();
		const date = `${day}.${mouthRight}.${year}`;

		const owner = await User.findById(req.user.userId);
		const fullName = `${owner.name} ${owner.surname}`;

		const route = new Route({ region, place, name, level, time, fotoLink, descr, plus, minus, stravaLink, coordinatesLink, coverChoice, clicks: 0, owner: req.user.userId, date, ownerFullName: fullName });
		await route.save();

		res.status(201).json({ message: 'Маршрут успешно создан' });
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
});

router.post('/event-form',
	[
		check('name', 'Введите название события').isLength({ min: 2 }),
		check('contacts', 'Введите контакты').isLength({ min: 2 }),
		check('place', 'Введите место').isLength({ min: 2 }),
	],
	auth,
	async (req, res) => {
		try {
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({
					errors: errors.array(),
					message: 'Некорректные данные при создании события',
				})
			}

			const { place, name, descr, dateEvent, contacts, contactTel } = req.body;

			const year = dateEvent.substr(0, 4);
			const mouth = dateEvent.substr(5, 2);
			const day = dateEvent.substr(8, 2);
			const date = `${day}.${mouth}.${year}`;

			const owner = await User.findById(req.user.userId);
			const fullName = `${owner.name} ${owner.surname}`;

			const event = new Event({ place, name, descr, dateEvent: date, contacts, contactTel, clicks: 0, owner: req.user.userId,  ownerFullName: fullName });
			await event.save();

			res.status(201).json({ message: 'Событие успешно создано' });
		} catch (e) {
			res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
		}
	});

router.patch('/change-data',
	[
		check('loginName', 'Минимальная длина логина 4 символов').isLength({ min: 4, max: 15 }),
		check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
		check('name', 'Минимальная длина имя 2 символа').isLength({ min: 2 }),
		check('surname', 'Минимальная длина фамилии 2 символа').isLength({ min: 2 }),
	],
	auth,
	async (req, res) => {
	try {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({
				errors: errors.array(),
				message: 'Введены некорректные данные',
			});
		}

		const {loginName, password, name, surname} = req.body;
		const user = await User.findById(req.user.userId);

		if (loginName !== user.loginName) {
			const candidate = await User.findOne({ loginName });

			if (candidate) {
				return res.status(400).json({ message: 'Такой пользователь уже сущуствует' });
			}
		}

		const hashedPassword = await bcrypt.hash(password, 12);

		user.name = name;
		user.surname = surname;
		user.password = hashedPassword;
		user.loginName = loginName;
		await user.save();

		res.status(200).json({ message: 'Данные успешно изменены' });

	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

module.exports = router