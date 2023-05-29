-- INSERT INTO product ( categoryId, name, description, price)
-- VALUES ( '4','FOX MTB', 'Indumentaria', "2-000") 

DROP DATABASE IF EXISTS bicicletas;
DROP DATABASE IF EXISTS bicicleteria;
CREATE DATABASE bicicleteria;
USE bicicleteria;
CREATE TABLE `usuarios` (
   `id` INTEGER NOT NULL,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(255),
   `mail` VARCHAR(255),
   `contraseña` VARCHAR(255) NOT NULL,
   `categoria_id` VARCHAR(255) NOT NULL,
   `imagen` VARCHAR(255),
   `edad` INTEGER,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productosUsuarios` (
   `id` INTEGER NOT NULL,
   `usuarios_id` INTEGER NOT NULL,
   `productos_id` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `categorias` (
   `id` INTEGER NOT NULL,
   `tipo` VARCHAR(50),
   `descripcion` VARCHAR(55),
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INTEGER NOT NULL,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   `precio` DECIMAL NOT NULL,
   `imagen` VARCHAR(255),
   `color` VARCHAR(255),
   `jerarquias` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `jerarquias` (
   `id` INTEGER NOT NULL,
   `nombre` VARCHAR(255) NOT NULL,
   `descripcion` VARCHAR(255),
   PRIMARY KEY (`id`)
);


ALTER TABLE `usuarios` ADD CONSTRAINT `FK_d021a606-f273-43fd-9699-50099c5cd6fc` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_e6a63f1c-bdcb-446f-a4cd-b85a69f16a35` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_35f740bc-1fd8-4275-8dcc-f9d780553144` FOREIGN KEY (`productos_id`) REFERENCES `productos`(`id`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_ae4a9b45-773a-49cf-982f-6d3371c4abf7` FOREIGN KEY (`jerarquias`) REFERENCES `jerarquias`(`id`)  ;
