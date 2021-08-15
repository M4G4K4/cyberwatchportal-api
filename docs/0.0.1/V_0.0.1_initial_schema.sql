CREATE TABLE users (
    id SERIAL NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    picture TEXT,
    email varchar(255) NOT NULL,
    password TEXT NOT NULL,
    role varchar(255) NOT NULL,
    requests INT NOT NULL,
    permissions TEXT,
    status varchar(255),
    verified varchar(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint users_pk primary key(id)
);

CREATE TABLE study (
    id SERIAL NOT NULL,
    title varchar(255) NOT NULL,
    description TEXT NOT NULL,
    long_description TEXT,
    picture TEXT,
    theme varchar(255) NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint study_pk primary key (id),
    constraint study_user_fk foreign key (user_id) REFERENCES users(id)
);

CREATE TABLE login (
    id SERIAL NOT NULL,
    user_id INT NOT NULL,
    ip varchar(255),
    user_agent TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint login_pk primary key(id),
    constraint login_users_fk foreign key (user_id) REFERENCES users(id)
);

CREATE TABLE files (
    id SERIAL NOT NULL,
    name varchar(255) NOT null,
    study_id int NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint files_pk primary key(id),
    constraint files_study_fk foreign key(study_id) REFERENCES study(id)
);

CREATE TABLE graphs (
    id SERIAL NOT NULL,
    name varchar(255),
    type varchar(255) NOT NULL,
    data json NOT NULL,
    study_id int NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    constraint graphs_pk primary key(id),
    constraint graphs_study_fk foreign key(study_id) REFERENCES study(id)
);
