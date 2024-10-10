create table users (
    user_id serial primary key,
    user_name varchar(100) unique not null,
    email varchar(100) unique not null,
    password varchar(255) not null,
) CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    spot_name VARCHAR(100) NOT NULL, -- Previously title
    saved TIMESTAMP DEFAULT current_timestamp,
    user_id INT NOT NULL,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(user_id),
    description TEXT NOT NULL, -- Previously post_content
    photo_id INT,
    CONSTRAINT fk_posts FOREIGN KEY (photo_id) REFERENCES photos(photo_id),
    location VARCHAR(255), -- New column for location
    fish_type VARCHAR(100) -- New column for fish type
);


create table comments (
    comment_id serial primary key,
    comment_content text not null,
    saved timestamp default current_timestamp,
    post_id int not null,
    constraint fk_posts foreign key (post_id) references posts(post_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id)
);

create table reacts (
    react_id serial primary key,
    react varchar(20) not null
);

insert into
    reacts (react)
values
    ('Like');

create table post_reacts (
    id serial primary key,
    react_id int not null,
    constraint fk_reacts foreign key (react_id) references reacts(react_id),
    post_id int not null,
    constraint fk_posts foreign key (post_id) references posts(post_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id),
    saved timestamp default current_timestamp
);

create table replies (
    id serial primary key,
    reply text not null,
    saved timestamp default current_timestamp,
    comment_id int not null,
    constraint fk_comments foreign key (comment_id) references comments(comment_id),
    user_id int not null,
    constraint fk_users foreign key (user_id) references users(user_id)
);

create table photos (
    photo_id serial primary key,
    photo_url varchar(255)
)