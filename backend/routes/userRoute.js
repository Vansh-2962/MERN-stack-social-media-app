import express  from 'express'
import { login, logout, register,edit,fetchAuthUser,getOtherUsers, upload } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/user.auth.js'
const router = express.Router();

router.route('/register').post(register)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/edit/:id').put(upload.single('file'),edit)
router.route('/getUser/:id').get(fetchAuthUser)
router.route('/:id').get(getOtherUsers)
export default router;