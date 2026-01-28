#!/bin/bash

# Seed the database
if [ "$SEED_DB" = "true" ]; then
    echo "Seeding database..."
    mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS < 03_seed.sql
    echo "Database seeded!"
else
    echo "Database is not seeded"
    rm -f 03_seed.sql
fi