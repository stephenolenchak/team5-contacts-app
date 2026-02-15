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
## AI Assistance Disclosure
This project was developed with assistance from generative AI tools:
- **Tools**: Chat GPT 5.2, accessed via chatgpt.com, GPT-5.2-Codex acessed via copilot on vscode
- **Dates**: Februrary 6, 2026
- **Scope**: Frontend (HTML, CSS, JavaScript), Docker. 
- **Use 1**: We provided the AI with a mockup of the intended user interface of the dashboard for the frontend. Based on this, AI generated initial HTML, CSS, and JavaScript code to help create the table and implement the contacts search, edit, and delete functionality. Additionally, AI provided the JavaScript code to implement the API endpoints for the login and register pages.
- **Use 2**: AI provided use with docker file and docker compose examples that we adapted to simplify the deployment of the application.
- **Use 3**: AI gave a template API that we then used to fit the requirements and constraints of the small project.
- **Use 4**: AI gave a template Databse that we then used to fit the requirements and constraints of the small project and with the help of the colors Lab databse, I was able to effectively create the database.

All AI-generated code was reviewed, tested, and modified to meet
assignment requirements. Final implementation reflects my understanding
of the concepts.
