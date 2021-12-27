-- Collumn status =  CURRENT, OUTDATED (if the info of the scan is inside the 3 months)

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
    name     varchar(255) NOT NULL,
    domain    varchar(255) NOT NULL,
    full_domain varchar(255) NOT NULL,
    category    varchar(255) NULL,
    score       varchar(255) NULL,
    is_phishing varchar(255) DEFAULT 'FALSE',
    reported_phishing INTEGER DEFAULT 0,
    data json NULL,
    status varchar(255) NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    constraint website_pk primary key (id)
);

CREATE TABLE vulnerability
(
    id         SERIAL       NOT NULL,
    name     varchar(255) NOT NULL,
    cvss       varchar(255) NOT NULL,
    cvss_score varchar(255) NOT NULL,
    website_id int          NOT NULL,
    status varchar(255) NULL, 
    data json NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint vulnerability_pk primary key (id),
    constraint website_vulnerability_fk foreign key (website_id) REFERENCES website (id)
);

CREATE TABLE application
(
    id          SERIAL       NOT NULL,
    name        varchar(255) NOT NULL,
    version     varchar(255) NOT NULL,
    port        INTEGER      NOT NULL,
    description TEXT         NOT NULL,
    website_id  int          NOT NULL,
    status varchar(255) NULL, 
    data json NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    constraint application_pk primary key (id),
    constraint website_application_fk foreign key (website_id) REFERENCES website (id)
);

CREATE TABLE ssl
(
    id          SERIAL NOT NULL,
    ssl         varchar(255)   NULL,
    tls         varchar(255)   NULL,
    website_id  int    NOT NULL,
    status varchar(255) NULL,
    data json NULL,
    created_at  TIMESTAMP,
    updated_at  TIMESTAMP,
    constraint ssl_pk primary key (id),
    constraint website_ssl_fk foreign key (website_id) REFERENCES website (id)
);

CREATE TABLE server
(
    id         SERIAL       NOT NULL,
    ip         varchar(255) NOT NULL,
    website_id int          NOT NULL,
    data json NULL,
    status varchar(255) NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint server_pk primary key (id),
    constraint website_server_fk foreign key (website_id) REFERENCES website (id)
);
