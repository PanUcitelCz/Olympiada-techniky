import { sqliteTable, text, integer, } from 'drizzle-orm/sqlite-core';

export const usersTable = sqliteTable('users', {
    id: integer('id').primaryKey(),
    email: text('email').notNull(),
    nickname: text('nickname').notNull(),
    passwordHash: text('password_hash').notNull(),  // camelCase pro ORM
    token: text('token'),
    tokenExpires: text('token_expires'),
    isEmailVerified: integer('is_email_verified').default(0).notNull(),
    profileImage: text('profile_image').default("https://preview.redd.it/new-lore-ekko-or-old-lore-ekko-v0-rk1pnlymql5c1.jpg?width=300&format=pjpg&auto=webp&s=769e3a4b5537853cea944cfb4ccf350320975d18"),
  });
