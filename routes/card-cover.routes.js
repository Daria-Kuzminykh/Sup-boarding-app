const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth.middleware');

router.post('/', (req, res) => {
	try {
		console.log(req.files.cover);
		if (!req.files || Object.keys(req.files).length === 0) {
			return res.status(400).json({ message: 'Что-то пошло не так, попробуйте снова' });;
		}
		const coverFile = req.files.cover;
		const uploadPath = 'files/' + coverFile.name;

		coverFile.mv(uploadPath, (err) => {
			if (err) return res.status(500).send(err);
			res.status(400).json({ message: 'Файл загружен' });
		})
	} catch (e) {
		res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
	}
})

module.exports = router;