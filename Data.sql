DROP DATABASE IF EXISTS bicicleteria;
CREATE DATABASE bicicleteria;
USE bicicleteria;
CREATE TABLE `usuarios` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(255),
   `mail` VARCHAR(255),
   `contraseña` VARCHAR(255) NOT NULL,
   `categoria_id` INT NOT NULL,
   `imagen` VARCHAR(255),
   `edad` INT,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productosUsuarios` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `usuarios_id` INT NOT NULL,
   `productos_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categorias` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `tipo` VARCHAR(50),
   `descripcion` VARCHAR(55),
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   `precio` DECIMAL NOT NULL,
   `imagen` VARCHAR(255),
   `color` VARCHAR(255),
   `jerarquia_id` INT NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `jerarquias` (
   `id` INT NOT NULL AUTO_INCREMENT,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   PRIMARY KEY (`id`)
);


ALTER TABLE `usuarios` ADD CONSTRAINT `FK_d021a606-f273-43fd-9699-50099c5cd6fc` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_e6a63f1c-bdcb-446f-a4cd-b85a69f16a35` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_35f740bc-1fd8-4275-8dcc-f9d780553144` FOREIGN KEY (`productos_id`) REFERENCES `productos`(`id`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_ae4a9b45-773a-49cf-982f-6d3371c4abf7` FOREIGN KEY (`jerarquia_id`) REFERENCES `jerarquias`(`id`)  ;


INSERT INTO jerarquias values (1, "Bicicletas", "Bicicletas");
INSERT INTO jerarquias values (2, "Indumentaria", "Indumentaria");
INSERT INTO jerarquias values (3, "Accesorios", "Accessorios");


insert into categorias  values (1,"Admin","Administrador");
insert into categorias  values (2,"Usuario","Usuario");
insert into categorias  values (3,"Administrador_1","Administrador_1");
insert into categorias  values (4,"Visitante","Visitante");
