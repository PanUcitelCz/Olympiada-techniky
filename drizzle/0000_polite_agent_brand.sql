CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`nickname` text NOT NULL,
	`password_hash` text NOT NULL,
	`token` text,
	`token_expires` text,
	`is_email_verified` integer DEFAULT 0 NOT NULL,
	`is_online` integer DEFAULT 0 NOT NULL,
	`user_level` integer DEFAULT 1 NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`profile_image` text DEFAULT 'https://preview.redd.it/new-lore-ekko-or-old-lore-ekko-v0-rk1pnlymql5c1.jpg?width=300&format=pjpg&auto=webp&s=769e3a4b5537853cea944cfb4ccf350320975d18'
);
