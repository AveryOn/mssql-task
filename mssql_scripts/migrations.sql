CREATE TABLE containers (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    number INT,
    type NVARCHAR(100),
    length DECIMAL(10, 2),
    width DECIMAL(10, 2),
    height DECIMAL(10, 2),
    weight DECIMAL(10, 2),
    is_empty BIT,
    receipt_date DATETIME
);



CREATE TABLE operations (
    id UNIQUEIDENTIFIER PRIMARY KEY,
    container_id UNIQUEIDENTIFIER,
    start_date DATETIME,
    end_date DATETIME,
    type NVARCHAR(100),
    operator_fullname NVARCHAR(255),
    inspection_place NVARCHAR(255),
    FOREIGN KEY (container_id) REFERENCES containers(id)
);