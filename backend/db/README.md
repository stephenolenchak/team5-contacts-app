# MySQL Setup (Linux)

## 1. Install MySQL
```bash
sudo apt update
sudo apt install mysql-server
sudo systemctl start mysql
```

## 2. Edit credentials
Open the setup script:
```bash
vi setup_db.sh
```

Set:
```bash
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASS="your_root_password"

DB_USER="contact_user"
DB_PASS="your_password"
DB_HOST="localhost"
```

## 3. Make script executable
```bash
chmod +x setup_db.sh
```

## 4. Run setup
```bash
./setup_db.sh
```
