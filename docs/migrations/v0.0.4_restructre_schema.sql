CREATE TABLE users
(
    id          SERIAL       NOT NULL,
    first_name  varchar(255) NOT NULL,
    last_name   varchar(255) NOT NULL,
    username    varchar(255) NOT NULL,
    picture     TEXT,
    email       varchar(255) NOT NULL,
    password    TEXT         NOT NULL,
    role        varchar(255) NOT NULL,
    requests    INT          NOT NULL,
    permissions TEXT,
    status      varchar(255),
    verified    varchar(255),
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    constraint users_pk primary key (id)
);

CREATE TABLE login
(
    id         SERIAL NOT NULL,
    user_id    INT    NULL,
    ip         varchar(255),
    email      varchar(255),
    user_agent TEXT,
    status     varchar(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint login_pk primary key (id)
);

CREATE TABLE website
(
    id          SERIAL       NOT NULL,
    name     varchar(255) NULL,
    domain    varchar(255) NULL,
    full_domain varchar(255) NULL,
    category    varchar(255) NULL,
    score       varchar(255) NULL,
    is_phishing varchar(255) DEFAULT 'FALSE',
    reported_phishing INTEGER DEFAULT 0,
    data JSON NULL,
    status varchar(255) NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    constraint website_pk primary key (id)
);