const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const controller = require('../controllers/project.controller');

router.post('/', auth, controller.createProject);
router.get('/', auth, controller.getProjects);
router.get('/client/:clientId', auth, controller.getByClient);
router.put('/:id', auth, controller.updateProject);
router.delete('/:id', auth, controller.deleteProject);

module.exports = router;