import Router from 'koa-router';
import JourneyController from '../controllers/journeyController';
import JourneyValidate from '../schemas/journeys';

const router = new Router();
const ctrl = new JourneyController();
const valid = new JourneyValidate();

router.get('/journeys', ctrl.index);

router.post('/journeys', valid.create(), ctrl.create);

router.get('/journeys/:id', ctrl.show);
router.put('/journeys/:id', valid.update(), ctrl.update);
router.delete('/journeys/:id', ctrl.destroy);

export default router.routes();