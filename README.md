# COP 4331 Small Project Contacts App

Team 5

| Team Members  | Role |
| ------------- |:-------------:|
| Hayden Fowler      | PM / Front End     |
| Stephen Olenchak      | Front End     |
| Sharath Kukeswaran      | Database     |
| Lincoln Spencer      | API Developer     |
| Dylan McIntee      | API Developer     |

## How to run Clean Contacts

### Prerequisites
- Docker Desktop 
  https://www.docker.com/products/docker-desktop/

### 1. Create .env file in repo root
```env
MYSQL_ROOT_PASSWORD=
MYSQL_DATABASE=
MYSQL_USER=
MYSQL_PASSWORD=
SEED_DB= # Toggle test data seeding (true/false)
```
### 2. Run Docker compose
```bash
docker compose up
```

### 3. To reset project
```bash
docker compose down -v
docker volume rm -f $(docker volume ls -q)
docker compose up --build -d
```