export const up = (knex, Promise) => {
    knex.schema
        .createTable('users', (table) => {
            table.uuid('id').unique().primary().notNullable();
            table.string('name').notNullable();
            table.string('email').unique().notNullable();
            table.text('password').notNullable();
            table.text('bio').nullable();
            table.timestamps();
        })
        .createTable('journeys', (table) => {
            table.uuid('id').unique().primary().notNullable();
            table.string('title').notNullable();
            table.text('description').nullable();
            table.boolean('is_private').defaultTo(false);
            table.uuid('user_id');
            table.foreign('user_id').references('id').inTable('users');
            table.timestamps();
        })
        .createTable('items', (table) => {
            table.uuid('id').unique().primary().notNullable();
            table.string('name').notNullable();
            table.string('address').notNullable();
            table.datetime('started_at').notNullable();
            table.datetime('ended_at').notNullable();
            table.uuid('journey_id');
            table.foreign('journey_id').references('id').inTable('journeys');
            table.timestamps();
        })
        .createTable('user_favorites', (table) => {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('user_id');
            table.foreign('user_id').references('id').inTable('users');
            table.uuid('journey_id');
            table.foreign('journey_id').references('id').inTable('journeys');
            table.timestamps();
        })
        .createTable('user_follows', (table) => {
            table.uuid('id').unique().primary().notNullable();
            table.uuid('followed_user_id');
            table.foreign('followed_user_id').references('id').inTable('users');
            table.uuid('follower_user_id');
            table.foreign('follower_user_id').references('id').inTable('users');
            table.timestamps();
        })
        .createTable('settings', (table) => {
            table.uuid('id').unique().primary().notNullable();
            // TODO: add notification items
            table.uuid('user_id');
            table.foreign('user_id').references('id').inTable('users');
            table.timestamps();
        });
};

export const down = (knex, Promise) => {
    knex.schema
        .dropTableIfExists('users')
        .dropTableIfExists('journeys')
        .dropTableIfExists('items')
        .dropTableIfExists('user_favorites')
        .dropTableIfExists('user_follows')
        .dropTableIfExists('settings');
};