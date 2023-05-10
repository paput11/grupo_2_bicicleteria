CREATE TABLE `rental` (
   `id` INTEGER NOT NULL,
   `bicicletas_id` VARCHAR(255) NOT NULL,
   `bicicletas_name` VARCHAR(255) NOT NULL,
   `precio` VARCHAR(255) NOT NULL,
   `bicicletas_descripcion` TEXT NOT NULL,
   `bicicletas_imagen` VARCHAR(255) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `accesorios` (
   `id` INTEGER NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `imagen` VARCHAR(100) NOT NULL,
   `descripcion` TEXT NOT NULL,
   `categoria` VARCHAR(100) NOT NULL,
   `precio` DECIMAL NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `bicicletas` (
   `id` INTEGER NOT NULL,
   `name` VARCHAR(100) NOT NULL,
   `descripcion` TEXT NOT NULL,
   `color` VARCHAR(100) NOT NULL,
   `precio` DECIMAL NOT NULL,
   `imagen` VARCHAR(100) NOT NULL,
   `marca` VARCHAR(100) NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productos` (
   `id` INTEGER NOT NULL,
   `bicicletas_id` INTEGER NOT NULL,
   `accesorios_id` INTEGER NOT NULL,
   `rental_id` INTEGER NOT NULL,
   `usuarios_id` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `usuarios` (
   `id` INTEGER NOT NULL,
   `nombre` VARCHAR(255) NOT NULL,
   `apellido` VARCHAR(255) NOT NULL,
   `mail` VARCHAR(255) NOT NULL,
   `contraseña` VARCHAR(255) NOT NULL,
   `categoria` VARCHAR(255) NOT NULL,
   `imagen` VARCHAR(255) NOT NULL,
   `edad` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
);

CREATE TABLE `productosUsuarios` (
   `id` INTEGER NOT NULL,
   `usuarios_id` INTEGER NOT NULL,
   `productos_id` INTEGER NOT NULL,
   PRIMARY KEY (`id`)
);


ALTER TABLE `rental` ADD CONSTRAINT `FK_fced5d8c-ae4c-4537-adc9-767a62daeb83` FOREIGN KEY (`bicicletas_name`) REFERENCES `bicicletas`(`name`)  ;

ALTER TABLE `rental` ADD CONSTRAINT `FK_ec3d48ba-1757-4df4-9d89-783b102023dd` FOREIGN KEY (`bicicletas_id`) REFERENCES `bicicletas`(`id`)  ;

ALTER TABLE `rental` ADD CONSTRAINT `FK_beb903fc-2123-4ee7-ae35-4159d677b1ea` FOREIGN KEY (`bicicletas_descripcion`) REFERENCES `bicicletas`(`descripcion`)  ;

ALTER TABLE `rental` ADD CONSTRAINT `FK_6705de69-9cb1-4cbd-866d-f40c35ade812` FOREIGN KEY (`bicicletas_imagen`) REFERENCES `bicicletas`(`imagen`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_edf7ab22-1db8-4c2e-977c-5d2001f75843` FOREIGN KEY (`bicicletas_id`) REFERENCES `accesorios`(`id`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_d563fb9b-a743-49de-84ac-7cc6b27e0d76` FOREIGN KEY (`accesorios_id`) REFERENCES `bicicletas`(`id`)  ;

ALTER TABLE `productos` ADD CONSTRAINT `FK_00b30fa1-c12b-4475-a228-1b6a5251f1e5` FOREIGN KEY (`rental_id`) REFERENCES `rental`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_e6a63f1c-bdcb-446f-a4cd-b85a69f16a35` FOREIGN KEY (`usuarios_id`) REFERENCES `usuarios`(`id`)  ;

ALTER TABLE `productosUsuarios` ADD CONSTRAINT `FK_d42d064e-ab07-4d3b-b20a-cbeb50a08c21` FOREIGN KEY (`productos_id`) REFERENCES `productos`(`id`)  ;
