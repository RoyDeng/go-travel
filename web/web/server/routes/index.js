import Router from 'koa-router';

import users from './users';
import profiles from './profiles';
import journeys from './journeys';

const router = new Router();
const api = new Router();

api.use(users);
api.use(profiles);
api.use(journeys);

router.use('/v1', api.routes());

export default router;