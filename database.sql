CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name character varying(60),
    last_name character varying(60),
    title character varying(60),
    salary numeric(10,2) not null

);

INSERT into employee
VALUES (1, 'bob', 'sass', 'builder', 2343);
