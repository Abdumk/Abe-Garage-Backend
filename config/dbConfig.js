// Import mysql2 module promise wrapper
const mysql2 = require('mysql2/promise');

// Import dotenv module and call the config method to load environment variables
require('dotenv').config();

// Prepare connection parameters we use to connect to the database
const dbConfig = {
  host: process.env.DB_HOST,   // e.g., 'localhost'
  user: process.env.DB_USER,   // e.g., 'root'
  password: process.env.DB_PASSWORD,  // e.g., 'root'
  database: process.env.DB_NAME,  // e.g., 'my_database'
  port: process.env.DB_PORT || 3306, // Default to 3306 if not set
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

// Create a connection pool to the database
const pool = mysql2.createPool(dbConfig);

// Function to execute SQL queries asynchronously
async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
}

// Test connection with a simple query
async function testConnection() {
  try {
    const rows = await query('SELECT 1 + 1 AS result');
    console.log('Test query result:', rows[0].result);  // Should output 2
  } catch (err) {
    console.error('Error with test query:', err);
  }
}

// Call the test function to verify connection
testConnection();

// Handle connection errors
pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has too many connections.');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused.');
    }
  }

  if (connection) connection.release();

  return;
});

// Export query function to be used in other files
module.exports = { query };





// new the first query i used in database to create the tables



// -- Customers tables  
// CREATE TABLE IF NOT EXISTS `customer_identifier` (
//   `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_email` VARCHAR(255) NOT NULL,
//   `customer_phone_number` VARCHAR(255) NOT NULL,
//   `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   `customer_hash` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`customer_id`),
//   UNIQUE (`customer_email`)
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `customer_info` (
//   `customer_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_id` INT(11) NOT NULL, 
//   `customer_first_name` VARCHAR(255) NOT NULL,
//   `customer_last_name` VARCHAR(255) NOT NULL,
//   `active_customer_status` INT(11) NOT NULL,
//   PRIMARY KEY (`customer_info_id`),
//   FOREIGN KEY (`customer_id`) REFERENCES customer_identifier(`customer_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
//   `vehicle_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_id` INT(11) NOT NULL, 
//   `vehicle_year` INT(11) NOT NULL,
//   `vehicle_make` VARCHAR(255) NOT NULL,
//   `vehicle_model` VARCHAR(255) NOT NULL,
//   `vehicle_type` VARCHAR(255) NOT NULL,
//   `vehicle_mileage` INT(11) NOT NULL, 
//   `vehicle_tag` VARCHAR(255) NOT NULL,
//   `vehicle_serial` VARCHAR(255) NOT NULL,
//   `vehicle_color` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`vehicle_id`),
//   FOREIGN KEY (`customer_id`) REFERENCES customer_identifier(`customer_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Company tables 
// CREATE TABLE IF NOT EXISTS `company_roles` (
//   `company_role_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `company_role_name` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`company_role_id`),
//   UNIQUE (`company_role_name`)
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `common_services` (
//   `service_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `service_name` VARCHAR(255) NOT NULL,
//   `service_description` TEXT,
//   PRIMARY KEY (`service_id`)
// ) ENGINE=InnoDB;

// -- Employee tables 
// CREATE TABLE IF NOT EXISTS `employee` (
//   `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_email` VARCHAR(255) NOT NULL,
//   `active_employee` INT(11) NOT NULL,
//   `added_date` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
//   PRIMARY KEY (`employee_id`), 
//   UNIQUE (`employee_email`)
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `employee_info` (
//   `employee_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `employee_first_name` VARCHAR(255) NOT NULL,
//   `employee_last_name` VARCHAR(255) NOT NULL,
//   `employee_phone` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`employee_info_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES employee(`employee_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `employee_pass` (
//   `employee_pass_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `employee_password_hashed` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`employee_pass_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES employee(`employee_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `employee_role` (
//   `employee_role_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `company_role_id` INT(11) NOT NULL,
//   PRIMARY KEY (`employee_role_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES employee(`employee_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`company_role_id`) REFERENCES company_roles(`company_role_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Order tables  
// CREATE TABLE IF NOT EXISTS `orders` (
//   `order_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `customer_id` INT(11) NOT NULL,
//   `vehicle_id` INT(11) NOT NULL,
//   `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
//   `active_order` INT(11) NOT NULL,
//   `order_hash` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`order_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES employee(`employee_id`) ON DELETE CASCADE, 
//   FOREIGN KEY (`customer_id`) REFERENCES customer_identifier(`customer_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`vehicle_id`) REFERENCES customer_vehicle_info(`vehicle_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `order_info` (
//   `order_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `order_total_price` INT(11) NOT NULL,
//   `estimated_completion_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
//   `completion_date` DATETIME,
//   `additional_request` TEXT,
//   `notes_for_internal_use` TEXT,
//   `notes_for_customer` TEXT,
//   `additional_requests_completed` INT(11) NOT NULL,
//   PRIMARY KEY (`order_info_id`),
//   FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `order_services` (
//   `order_service_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `service_id` INT(11) NOT NULL,
//   `service_completed` INT(11) NOT NULL,
//   PRIMARY KEY (`order_service_id`),
//   FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`service_id`) REFERENCES common_services(`service_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// CREATE TABLE IF NOT EXISTS `order_status` (
//   `order_status_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `order_status` INT(11) NOT NULL,
//   PRIMARY KEY (`order_status_id`),
//   FOREIGN KEY (`order_id`) REFERENCES orders(`order_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Add the roles to the database 
// INSERT INTO `company_roles` (`company_role_name`)
// VALUES ('Employee'), ('Manager'), ('Admin');

// -- This is the admin account 
// INSERT INTO `employee` (`employee_email`, `active_employee`, `added_date`)
// VALUES ('admin@admin.com', 1, CURRENT_TIMESTAMP);

// INSERT INTO `employee_info` (`employee_id`, `employee_first_name`, `employee_last_name`, `employee_phone`)
// VALUES (1, 'Admin', 'Admin', '555-555-5555'); 

// -- Password is 123456 (bcrypt hash)
// INSERT INTO `employee_pass` (`employee_id`, `employee_password_hashed`)
// VALUES (1, '$2b$10$B6yvl4hECXploM.fCDbXz.brkhmgqNlawh9ZwbfkFX.F3xrs.15Xi');  

// INSERT INTO `employee_role` (`employee_id`, `company_role_id`)
// VALUES (1, 3);











// new the second query

// -- Table 1: employee
// CREATE TABLE IF NOT EXISTS `employee` (
//   `employee_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_email` VARCHAR(255) NOT NULL UNIQUE,
//   `employee_active_status` INT(1) NOT NULL,
//   `employee_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (`employee_id`)
// ) ENGINE=InnoDB;

// -- Table 2: employee_info
// CREATE TABLE IF NOT EXISTS `employee_info` (
//   `employee_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `employee_first_name` VARCHAR(255) NOT NULL,
//   `employee_last_name` VARCHAR(255) NOT NULL,
//   `employee_phone` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`employee_info_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 3: employee_pass
// CREATE TABLE IF NOT EXISTS `employee_pass` (
//   `employee_pass_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `employee_password_hashed` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`employee_pass_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 4: company_roles
// CREATE TABLE IF NOT EXISTS `company_roles` (
//   `company_role_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `company_role_name` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`company_role_id`)
// ) ENGINE=InnoDB;

// -- Table 5: employee_role
// CREATE TABLE IF NOT EXISTS `employee_role` (
//   `employee_role_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `employee_id` INT(11) NOT NULL,
//   `company_role_id` INT(11) NOT NULL,
//   PRIMARY KEY (`employee_role_id`),
//   FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`company_role_id`) REFERENCES `company_roles`(`company_role_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 6: customer_identifier
// CREATE TABLE IF NOT EXISTS `customer_identifier` (
//   `customer_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_email` VARCHAR(255) NOT NULL UNIQUE,
//   `customer_phone_number` VARCHAR(255) NOT NULL UNIQUE,
//   `customer_added_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
//   `customer_hash` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`customer_id`)
// ) ENGINE=InnoDB;

// -- Table 7: customer_info
// CREATE TABLE IF NOT EXISTS `customer_info` (
//   `customer_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_id` INT(11) NOT NULL,
//   `customer_first_name` VARCHAR(255) NOT NULL,
//   `customer_last_name` VARCHAR(255) NOT NULL,
//   `customer_active_status` INT(1) NOT NULL,
//   PRIMARY KEY (`customer_info_id`),
//   FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 8: customer_vehicle_info
// CREATE TABLE IF NOT EXISTS `customer_vehicle_info` (
//   `vehicle_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_id` INT(11) NOT NULL,
//   `vehicle_year` INT(4) NOT NULL,
//   `vehicle_make` VARCHAR(255) NOT NULL,
//   `vehicle_model` VARCHAR(255) NOT NULL,
//   `vehicle_type` VARCHAR(255) NOT NULL,
//   `vehicle_mileage` INT(11) NOT NULL,
//   `vehicle_tag` VARCHAR(255) NOT NULL,
//   `vehicle_serial_number` VARCHAR(255) NOT NULL UNIQUE,
//   `vehicle_color` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`vehicle_id`),
//   FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 9: common_services
// CREATE TABLE IF NOT EXISTS `common_services` (
//   `service_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `service_name` VARCHAR(255) NOT NULL,
//   `service_description` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`service_id`)
// ) ENGINE=InnoDB;

// -- Table 10: orders
// CREATE TABLE IF NOT EXISTS `orders` (
//   `order_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `customer_id` INT(11) NOT NULL,
//   `employee_id` INT(11) NOT NULL,
//   `order_date` DATETIME DEFAULT CURRENT_TIMESTAMP,
//   `order_hash` VARCHAR(255) NOT NULL,
//   `order_status` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`order_id`),
//   FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier`(`customer_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`employee_id`) REFERENCES `employee`(`employee_id`) ON DELETE SET NULL
// ) ENGINE=InnoDB;

// -- Table 11: order_info
// CREATE TABLE IF NOT EXISTS `order_info` (
//   `order_info_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `order_total_price` INT(11) NOT NULL,
//   `order_estimated_completion_date` DATETIME NOT NULL,
//   `order_completion_date` DATETIME,
//   `order_additional_requests` VARCHAR(255),
//   `order_additional_requests_completed` INT(1) NOT NULL,
//   PRIMARY KEY (`order_info_id`),
//   FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 12: order_services
// CREATE TABLE IF NOT EXISTS `order_services` (
//   `order_service_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `service_id` INT(11) NOT NULL,
//   `service_completed` INT(1) NOT NULL,
//   PRIMARY KEY (`order_service_id`),
//   FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE,
//   FOREIGN KEY (`service_id`) REFERENCES `common_services`(`service_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;

// -- Table 13: order_status
// CREATE TABLE IF NOT EXISTS `order_status` (
//   `order_status_id` INT(11) NOT NULL AUTO_INCREMENT,
//   `order_id` INT(11) NOT NULL,
//   `order_status` VARCHAR(255) NOT NULL,
//   PRIMARY KEY (`order_status_id`),
//   FOREIGN KEY (`order_id`) REFERENCES `orders`(`order_id`) ON DELETE CASCADE
// ) ENGINE=InnoDB;
