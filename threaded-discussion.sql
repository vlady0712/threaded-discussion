CREATE TABLE `users` (
  `uid` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `is_admin` boolean NOT NULL DEFAULT false,
  `name` varchar(255)
);

CREATE TABLE `comments` (
  `uid` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `thread_uid` varchar(255) NOT NULL,
  `user_uid` varchar(255),
  `submitted_time` datetime NOT NULL,
  `likes` int NOT NULL DEFAULT 0,
  `body` varchar(255),
  `reply_to` varchar(255),
  `is_reply` boolean NOT NULL DEFAULT false,
  `is_deleted` boolean NOT NULL DEFAULT false,
  `is_edited` boolean NOT NULL DEFAULT false,
  `edited_time` datetime
);

CREATE TABLE `threads` (
  `uid` varchar(255) UNIQUE PRIMARY KEY NOT NULL,
  `domain` varchar(255) NOT NULL,
  `permissions` varchar(3) NOT NULL DEFAULT "777"
);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_uid`) REFERENCES `users` (`uid`);

ALTER TABLE `comments` ADD FOREIGN KEY (`reply_to`) REFERENCES `comments` (`uid`);

ALTER TABLE `comments` ADD FOREIGN KEY (`thread_uid`) REFERENCES `threads` (`uid`);
