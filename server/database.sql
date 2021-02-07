CREATE DATABASE mask_safe;

CREATE TABLE public.masks
(
    uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
    name character varying COLLATE pg_catalog."default",
    times_used numeric NOT NULL DEFAULT 0,
    last_used timestamp without time zone,
    user_uuid uuid
)

CREATE TABLE public.users
(
  uuid uuid NOT NULL DEFAULT uuid_generate_v4(),
  name character varying COLLATE pg_catalog."default"
);

TABLESPACE pg_default;

ALTER TABLE public.masks
    OWNER to postgres;

ALTER TABLE public.users
    OWNER to postgres;
