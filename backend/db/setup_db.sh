#!/bin/bash

# MySQL credentials
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASS="your_root_password"

# App database credentials
DB_USER="contact_user"
DB_PASS="your_password"
DB_HOST="localhost"
DB_NAME="contact_manager"

# Run the schema
echo "Creating database and tables..."
mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS < database.sql

# Create app user and grant permissions
echo "Creating database user..."
mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e "
CREATE USER IF NOT EXISTS '$DB_USER'@'$DB_HOST' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'$DB_HOST';
FLUSH PRIVILEGES;
"

# Optionally seed the database
read -p "Do you want to seed the database with demo data? (y/n): " SEED
if [ "$SEED" = "y" ]; then
    echo "Seeding database..."
    mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS < seed.sql
    echo "Database seeded!"
fi

echo "Setup complete!"
