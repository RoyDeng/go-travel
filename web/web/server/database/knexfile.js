import path from 'path';
import { DATABASE } from '../config/env';

export const development = {
    client: 'mysql',
    connection: DATABASE,
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    }
};

export const staging = {
    client: 'mysql',
    connection: {
        host: '',
        database: '',
        user: '',
        password: ''
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    }
};

export const production = {
    client: 'mysql',
    connection: {
        host: '',
        database: '',
        user: '',
        password: ''
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    }
};

export const test = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'db_test.sqlite3')
    },
    migrations: {
        directory: path.resolve(__dirname, 'migrations')
    },
    useNullAsDefault: true
};

const knex = {
    development,
    production,
    staging,
    test
};

export default knex;