import Journey from '../database/models/Journey';

export default class Controller {
    async index(ctx) {
        const journeys = await new Journey({
            is_private: false
        }).fetchPage({
            limit: ctx.params.limit,
            offset: ctx.params.offset
        }).catch(error => {
            throw new InternalServerError(error.toString());
        });

        ctx.body = journeys;
    }

    async show(ctx) {
        const journey = await new Journey({
            id: ctx.params.id
        }).fetch()
            .catch(error => {
                throw new NotFound(error.toString());
            });

        ctx.body = journey;
    }

    async create(ctx) {
        const { body } = ctx.request;

        const journey = await new Journey({
            title: body.title,
            description: body.description,
            user_id: ctx.state.user.sub.id
        }).save()
            .catch(error => {
                throw new BadRequest(error.toString());
            });

        ctx.body = await new Journey({
            id: journey.attributes.id
        }).fetch()
            .catch(error => {
                throw new InternalServerError(error.toString());
            });
    }

    async update(ctx) {
        const { body } = ctx.request;

        const journey = await new Journey({
            id: ctx.params.id
        }).save({
            title: body.title,
            description: body.description
        }).catch(error => {
            throw new NotFound(error.toString());
        });

        ctx.body = journey;
    }

    async destroy(ctx) {
        await new Journey.forge({
            id: ctx.params.id
        }).destroy()
            .catch(error => {
                throw new BadRequest(error.toString());
            });

        ctx.body = {
            id: ctx.params.id
        };
    }
}