create table users (
    user_id serial primary key,
    user_name varchar(100) unique not null,
    email varchar(100) unique not null,
    password varchar(255) not null,
) create table posts (
    post_id serial primary key,
    title varchar(100) not null,
    saved timestamp default current_timestamp,
    user_id int not null,
    constraint fk_user foreign key(user_id) references users(user_id),
    post_content text not null,
    photo_id int,
    CONSTRAINT fk_posts FOREIGN KEY (photo_id) REFERENCES photos(photo_id);

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