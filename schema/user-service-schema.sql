create database user_service DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

use user_service;

CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,
					user_name VARCHAR(50) UNIQUE,
					first_name VARCHAR(128), 
                    last_name VARCHAR(128), 
                    email_address VARCHAR(128) UNIQUE,
                    country_code VARCHAR(3) NOT NULL DEFAULT '91',
                    mobile_number VARCHAR(10) UNIQUE,
                    password VARCHAR(128) DEFAULT NULL,
                    salt VARCHAR(32) DEFAULT NULL,
                    address VARCHAR(255) DEFAULT NULL,
                    country VARCHAR(100) DEFAULT NULL,
                    city VARCHAR(100) DEFAULT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                    is_active BOOLEAN DEFAULT TRUE NOT NULL,
                    is_deleted BOOLEAN DEFAULT FALSE NOT NULL);