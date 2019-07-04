import User from '../database/models/User';
import bcrypt from 'bcrypt';
import {
    BadRequest,
    NotFound,
    Unauthorized,
    InternalServerError,
    hashPassword,
    generateJWT
} from '../utils';

export default class Controller {
    async login(ctx) {
        const { body } = ctx.request;

        const user = await new User({
            email: body.email
        }).fetch()
            .catch(() => {
                throw new Unauthorized()
            });

        if (!user) {
            throw new Unauthorized('用戶不存在!');
        };

        const isValid = await bcrypt.compare(body.password, user.attributes.password);

        if (!isValid) {
            throw new Unauthorized('密碼錯誤!');
        }

        user.attributes = generateJWT(user.toJSON());

        ctx.body = user;
    }

    async index(ctx) {
        const users = await new User()
            .fetchAll()
            .catch(error => {
                throw new InternalServerError(error.toString());
            });

        ctx.body = users;
    }

    async show(ctx) {
        const user = await new User({
            id: ctx.params.id
        }).fetch()
            .catch(error => {
                throw new NotFound(error.toString());
            });

        ctx.body = user;
    }

    async create(ctx) {
        const { body } = ctx.request;

        body.password = await hashPassword(body.password);

        const user = await new User({
            name: body.name,
            email: body.email,
            password: body.password
        }).save()
            .catch(error => {
                throw new BadRequest(error.toString());
            });

        ctx.body = await new User({
            id: user.attributes.id
        }).fetch()
            .catch(error => {
                throw new InternalServerError(error.toString());
            });
    }

    async update(ctx) {
        const { body } = ctx.request;

        const user = await new User({
            id: ctx.params.id
        }).save({
            name: body.name,
            email: body.email,
            bio: body.bio,
            password: body.password
        }).catch(error => {
            throw new NotFound(error.toString());
        });

        ctx.body = user;
    }

    async destroy(ctx) {
        await new User({
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