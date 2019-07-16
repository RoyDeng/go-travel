import Item from '../database/models/Item';

export default class Controller {
    async create(ctx) {
        const { body } = ctx.request;

        const item = await new Item({
            
        }).save()
            .catch(error => {
                throw new BadRequest(error.toString());
            });

        ctx.body = await new Item({
            id: item.attributes.id
        }).fetch()
            .catch(error => {
                throw new InternalServerError(error.toString());
            });
    }
}