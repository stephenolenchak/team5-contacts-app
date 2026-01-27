API (PHP)

TODO
- PUT /contacts/{id} (update contact)
- DELETE /contacts/{id} (delete contact)
- in config.php values are placeholders. Use environment variables for real credentials.

Base URL
http://<host>/backend/api

Auth
Login sets a session cookie; contacts endpoints require that session.

Endpoints
- POST /register (create user)
- POST /login (authenticate)
- POST /logout (end session)
- GET /contacts?search=do (list or search)
- POST /contacts (create contact)

TODO
- PUT /contacts/{id} (update contact)
- DELETE /contacts/{id} (delete contact)

example json below

POST /register
{
	"firstName": "Jane",
	"lastName": "Doe",
	"email": "jane@example.com",
	"password": "secret"
}

POST /login
{
	"email": "jane@example.com",
	"password": "secret"
}

POST /contacts
{
	"firstName": "John",
	"lastName": "Smith",
	"email": "john@example.com",
	"phone": "555-1234"
}

Config
Edit backend/api/config.php or set DB_HOST, DB_NAME, DB_USER, DB_PASS.