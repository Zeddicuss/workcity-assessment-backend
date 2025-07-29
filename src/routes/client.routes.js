const router = require('express').Router();
const { auth, admin } = require('../middleware/auth.middleware');
const controller = require('../controllers/client.controller');

router.post('/', auth, admin, controller.createClient);
router.get('/', auth, controller.getClients);
router.put('/:id', auth, admin, controller.updateClient);
router.delete('/:id', auth, admin, controller.deleteClient);

module.exports = router;