const router = require("express").Router();
const {
    getUsers,
    saveUser,
    updateUser,
    deleteUser
} = require('../controllers/usersController');

router.get('/', getUsers);
router.post('/', saveUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser)

module.exports = router;