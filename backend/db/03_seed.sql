-- Insert demo user (password should already be hashed in real app)
INSERT INTO Users (firstName, lastName, email, password)
VALUES ('Test', 'User', 'test@example.com', 'testpassword');

-- Get that user's id (assumes auto_increment starts at 1)
SET @userId = LAST_INSERT_ID();

-- Insert sample contacts
INSERT INTO Contacts (userId, firstName, lastName, email, phone, city, state)
VALUES
(@userId, 'Alice', 'Smith', 'alice@example.com', '407-555-1234', 'Orlando', 'FL'),
(@userId, 'Bob', 'Johnson', 'bob@example.com', '321-555-5678', 'Winter Park', 'FL'),
(@userId, 'Carol', 'Davis', 'carol@example.com', '689-555-9999', 'Kissimmee', 'FL');
