create database demoversion2;

-- 1 done
CREATE TABLE `account` (
  `id_account` varchar(255) NOT NULL,
  `username` nvarchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(10) NOT NULL,
  PRIMARY KEY (`id_account`),
  UNIQUE KEY `username` (`username`)
);

-- test.location definition
-- 2 done
CREATE TABLE `location` (
  `id_location` varchar(255) NOT NULL,
  `name` nvarchar(255)  NOT NULL,
  PRIMARY KEY (`id_location`)
) ;

-- test.room_service definition
-- 3 done
CREATE TABLE `room_service` (
  `id_room_service` varchar(255) NOT NULL,
  `service` nvarchar(255)  NOT NULL,
  PRIMARY KEY (`id_room_service`)
) ;
-- test.room_type definition

-- 4 done
CREATE TABLE `room_type` (
  `id_room_type` varchar(255) NOT NULL,
  `type` nvarchar(255) NOT NULL,
  PRIMARY KEY (`id_room_type`)
) ;


-- test.service_yacht definition

-- 5 done
CREATE TABLE `yacht_service` (
  `id_yacht_service` varchar(255) NOT NULL,
  `service` nvarchar(255) NOT NULL,
  PRIMARY KEY (`id_yacht_service`)
) ;

-- test.wallet definition
-- 6 done
CREATE TABLE `wallet` (
  `id_wallet` varchar(255) NOT NULL,
  `bank_number` varchar(20) NOT NULL,
  `balance` decimal NOT NULL,
  PRIMARY KEY (`id_wallet`)
);

-- test.yacht_type definition
-- 7 done
CREATE TABLE `yacht_type` (
  `id_yacht_type` varchar(255) NOT NULL,
  `star_ranking` int NOT NULL,
  PRIMARY KEY (`id_yacht_type`)
) ;

-- test.company definition
-- 8 done
CREATE TABLE `company` (
  `id_company` varchar(255) NOT NULL,
  `name` nvarchar(255) NOT NULL,
  `address` nvarchar(255) NOT NULL,
  `logo` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `exist` int not null,
  `id_account` varchar(255) NOT NULL,
  PRIMARY KEY (`id_company`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `unique_account_id` (`id_account`),
  UNIQUE KEY `id_account` (`id_account`),
  CONSTRAINT `fk_id_account` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`)
);


-- test.customer definition
-- 9 done
CREATE TABLE `customer` (
  `id_customer` varchar(255) NOT NULL,
  `full_name` nvarchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `id_account` varchar(255) NOT NULL,
  `id_wallet` varchar(255) NOT NULL,
  PRIMARY KEY (`id_customer`),
  UNIQUE KEY `email` (`email`,`phone`),
  UNIQUE KEY `id_account` (`id_account`),
  UNIQUE KEY `id_wallet` (`id_wallet`),
  UNIQUE KEY `id_wallet_2` (`id_wallet`),
  CONSTRAINT `fk_account_customer_id` FOREIGN KEY (`id_account`) REFERENCES `account` (`id_account`),
  CONSTRAINT `fk_wallet_customer_id` FOREIGN KEY (`id_wallet`) REFERENCES `wallet` (`id_wallet`)
) ;


-- test.image_room_type_detail definition
-- 10 chua xong
CREATE TABLE `images_room` (
  `id_images_room` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `id_room` varchar(255) NOT NULL,
  PRIMARY KEY (`id_images_room`),
  KEY `fk_room_image_id` (`id_room`),
  CONSTRAINT `fk_room_image_id` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`)
) ;


-- test.yacht definition
-- xong 12
CREATE TABLE `yacht` (
  `id_yacht` varchar(255) NOT NULL,
  `name` nvarchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `exist` int not null,
  `id_company` varchar(255) NOT NULL,
  `id_yacht_type` varchar(255) NOT NULL,
  `id_location` varchar(255) NOT NULL,
  PRIMARY KEY (`id_yacht`),
  KEY `fk_yacht_type_id` (`id_yacht_type`),
  KEY `fk_location_id` (`id_location`),
  CONSTRAINT `fk_company_id` FOREIGN KEY (`id_company`) REFERENCES `company` (`id_company`),
  CONSTRAINT `fk_location_id` FOREIGN KEY (`id_location`) REFERENCES `location` (`id_location`),
  CONSTRAINT `fk_yacht_type_id` FOREIGN KEY (`id_yacht_type`) REFERENCES `yacht_type` (`id_yacht_type`)
);

-- test.yacht_details definition
-- 13 done
CREATE TABLE `yacht_detail` (
  `id_yacht_detail` varchar(255) NOT NULL,
  `launch` date NOT NULL,
  `hull_body` nvarchar(255) NOT NULL,
  `description` text NOT NULL,
  `rule` text NOT NULL,
  `feedback` text NOT NULL,
  `itinerary` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `id_yacht` varchar(255) NOT NULL,
  PRIMARY KEY (`id_yacht_detail`),
  KEY `fk_yacht_yachtDetail_id` (`id_yacht`),
  CONSTRAINT `fk_yacht_yachtDetail_id` FOREIGN KEY (`id_yacht`) REFERENCES `yacht` (`id_yacht`)
);


-- test.feedback definition
-- 14 done
CREATE TABLE `feedback` (
  `id_feedback` varchar(255) NOT NULL,
  `description` text,
  `id_yacht_detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id_feedback`),
  KEY `fk_yacht_detail_feedback_id` (`id_yacht_detail`),
  CONSTRAINT `fk_yacht_detail_feedback_id` FOREIGN KEY (`id_yacht_detail`) REFERENCES `yacht_detail` (`id_yacht_detail`)
) ;


-- test.image_yacht_detail definition
-- 15 done
CREATE TABLE `image_yacht_detail` (
  `id_image_yacht_detail` varchar(255) NOT NULL,
  `image` varchar(100) NOT NULL,
  `id_yacht_detail` varchar(255) NOT NULL,
  PRIMARY KEY (`id_image_yacht_detail`),
  KEY `fk_yacht_detail_image_yacht_detail_id` (`id_yacht_detail`),
  CONSTRAINT `fk_yacht_detail_image_yacht_detail_id` FOREIGN KEY (`id_yacht_detail`) REFERENCES `yacht_detail` (`id_yacht_detail`)
);
-- test.room definition
-- 16 done
CREATE TABLE `room` (
  `id_room` varchar(255) NOT NULL,
  `price` decimal,
  `area` decimal,
  `description` text,
  `name` nvarchar(255),
  `available` varchar(255),
  `id_room_type` varchar(255) NOT NULL,
  `id_yacht` varchar(255) NOT NULL,
  PRIMARY KEY (`id_room`),
  KEY `fk_yacht_room_id` (`id_yacht`),
  KEY `fk_room_type_id` (`id_room_type`),
  CONSTRAINT `fk_room_type_id` FOREIGN KEY (`id_room_type`) REFERENCES `room_type` (`id_room_type`),
  CONSTRAINT `fk_yacht_room_id` FOREIGN KEY (`id_yacht`) REFERENCES `yacht` (`id_yacht`)
);

-- test.room_room_service definition
--  17
CREATE TABLE `room_room_service` (
  `id_room` varchar(255) NOT NULL,
  `id_room_service` varchar(255) NOT NULL,
  PRIMARY KEY (`id_room`, `id_room_service`),
  KEY `id_room_service` (`id_room_service`),
  CONSTRAINT `service_room_detail_ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`),
  CONSTRAINT `service_room_detail_ibfk_2` FOREIGN KEY (`id_room_service`) REFERENCES `room_service` (`id_room_service`)
);

-- test.service_yacht_detail definition
-- 18 done
CREATE TABLE `yacht_detail_service` (
  `id_yacht_detail` varchar(255) NOT NULL,
  `id_yacht_service` varchar(255) NOT NULL,
  PRIMARY KEY (`id_yacht_detail`,`id_yacht_service`),
  CONSTRAINT `service_yacht_detail_ibfk_1` FOREIGN KEY (`id_yacht_detail`) REFERENCES `yacht_detail` (`id_yacht_detail`),
  CONSTRAINT `service_yacht_detail_ibfk_2` FOREIGN KEY (`id_yacht_service`) REFERENCES `yacht_service` (`id_yacht_service`)
);


-- test.booking definition
-- 19 
CREATE TABLE `booking` (
  `id_booking` varchar(255) NOT NULL,
  `booking_time` datetime NOT NULL,
  `status` varchar(255) not null,
  `id_customer` varchar(255) NOT NULL,
  `id_schedule` varchar(255) NOT NULL,
  PRIMARY KEY (`id_booking`),
  KEY `fk_schedule_id` (`id_schedule`),
  KEY `fk_yacht_booking_id` (`id_yacht`),
  KEY `fk_customer_booking_id` (`id_customer`),
  CONSTRAINT `fk_customer_booking_id` FOREIGN KEY (`id_customer`) REFERENCES `customer` (`id_customer`),
  CONSTRAINT `fk_schedule_id` FOREIGN KEY (`id_schedule`) REFERENCES `schedule` (`id_schedule`)
) ;
-- test.booking_details definition

CREATE TABLE `booking_detail` (
  `id_booking_detail` varchar(255) NOT NULL,
  `unit_price` decimal(10,0) NOT NULL,
  `requirement` text,
  `room_quantity` int,
  `id_booking` varchar(255) NOT NULL,
  PRIMARY KEY (`id_booking_detail`),
  KEY `fk_booking_booking_detail_id` (`id_booking`),
  CONSTRAINT `fk_booking_booking_detail_id` FOREIGN KEY (`id_booking`) REFERENCES `booking` (`id_booking`)
);


-- test.checkout definition
CREATE TABLE `booking_detail_room`(
	`id_room` varchar(255) not null,
    `id_booking_detail` varchar(255) not null,
    primary key(`id_room`, `id_booking_detail`),
    CONSTRAINT `ibfk_1` FOREIGN KEY (`id_room`) REFERENCES `room` (`id_room`),
	CONSTRAINT `ibfk_2` FOREIGN KEY (`id_booking_detail`) REFERENCES `booking_detail` (`id_booking_detail`)
);

-- test.schedule definition

CREATE TABLE `schedule` (
  `id_schedule` varchar(255) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `id_yacht` varchar(255) not null,
  PRIMARY KEY (`id_schedule`),
  CONSTRAINT `fk_schedule_yacht_id` FOREIGN KEY (`id_yacht`) REFERENCES `yacht` (`id_yacht`)
) ;



