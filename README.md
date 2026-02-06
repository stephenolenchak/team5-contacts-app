# COP 4331 Small Project Contacts App

Team 5

| Team Members  | Role | Github |
| ------------- |:-------------:| :-------------:|
| Hayden Fowler      | PM / Front End     | @Hfowler44 |
| Stephen Olenchak      | Front End     | @stephenolenchak |
| Sharath Kukeswaran      | Database     | @sharathkukeswaran-spec |
| Lincoln Spencer      | API Developer     | @sl2005 |
| Dylan McIntee      | API Developer     | @dylanmc1ntee |

## How to run Clean Contacts

### Prerequisites
- Docker Desktop 
  https://www.docker.com/products/docker-desktop/

### 1. Create .env file in repo root
```env
DOMAIN=
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
docker volume rm -f $(docker volume ls -q) # USE WITH CAUTION! Deletes databse volume
docker compose up --build -d
```
