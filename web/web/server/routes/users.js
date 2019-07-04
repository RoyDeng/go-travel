import Router from 'koa-router';
import UserController from '../controllers/userController';
import UserValidate from '../schemas/users';

const router = new Router();
const ctrl = new UserController();
const valid = new UserValidate();

router.get('/users', ctrl.index);

router.post('/users', valid.create(), ctrl.create);
router.post('/users/login', ctrl.login);

router.get('/users/:id', ctrl.show);
router.put('/users/:id', valid.update(), ctrl.update);
router.delete('/users/:id', ctrl.destroy);

export default router.routes();