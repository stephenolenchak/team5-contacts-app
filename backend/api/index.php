<?php
require_once __DIR__ . '/config.php';

session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure' => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

// set the http response code and output json payload
function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload);
    exit;
}

// get the JSON body from the request and decode it, if the body is invalid or missing return an empty array
function getJsonBody(): array
{
    $raw = file_get_contents('php://input');
    if (!$raw) {
        return []; // this is the case if there is no body
    }
    $data = json_decode($raw, true);
    if (!is_array($data)) {
        return [];
    }
    return $data;
}

// get the request path and then normalize it
function getPath(): string
{
    $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $scriptDir = rtrim(dirname($_SERVER['SCRIPT_NAME']), '/');
    if ($scriptDir !== '' && strpos($path, $scriptDir) === 0) { // normalize path
        $path = substr($path, strlen($scriptDir));
    }
    if ($path === '') { // more normalization
        $path = '/';
    }
    return $path; // return normalized path
}

// pdo connect to mySQL database
function db(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=utf8mb4';
    $pdo = new PDO($dsn, DB_USER, DB_PASS, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);

    return $pdo;
}

function requireAuth(): int
{
    if (empty($_SESSION['userId'])) {
        respond(401, ['error' => 'Not authenticated.']);
    }
    return (int)$_SESSION['userId'];
}

// read the http method and then parse the path into parts
$method = $_SERVER['REQUEST_METHOD'];
$path = getPath();
$parts = array_values(array_filter(explode('/', $path)));

if (count($parts) === 0) {
    respond(200, ['ok' => true, 'message' => 'API is running']);
}

$resource = $parts[0];
$id = $parts[1] ?? null;

// handle the user registration, hash the password, insert the new user into the database
if ($resource === 'register' && $method === 'POST') {
    $data = getJsonBody();
    $firstName = trim($data['firstName'] ?? '');
    $lastName = trim($data['lastName'] ?? '');
    $email = strtolower(trim($data['email'] ?? ''));
    $password = $data['password'] ?? '';

    if ($firstName === '' || $lastName === '' || $email === '' || $password === '') {
        respond(400, ['error' => 'Missing required fields.']);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT); // hash the password

    try { // insert the new user
        $pdo = db();
        $stmt = $pdo->prepare('INSERT INTO Users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)');
        $stmt->execute([$firstName, $lastName, $email, $hash]);
        respond(201, ['ok' => true, 'userId' => (int)$pdo->lastInsertId()]); 
    } catch (PDOException $e) {
        if ((int)$e->getCode() === 23000) {
            respond(409, ['error' => 'Email already exists.']); // duplicate entry
        }
        respond(500, ['error' => 'Server error.']); // other db error
    }
}

if ($resource === 'login' && $method === 'POST') {
    $data = getJsonBody();
    $email = strtolower(trim($data['email'] ?? '')); // fetch the user email
    $password = $data['password'] ?? ''; // fetch the user password

    if ($email === '' || $password === '') {
        respond(400, ['error' => 'Missing credentials.']);
    }

    $pdo = db();
    $stmt = $pdo->prepare('SELECT id, firstName, lastName, email, password FROM Users WHERE email = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if (!$user || !password_verify($password, $user['password'])) {
        respond(401, ['error' => 'Invalid email or password.']); // invalid credentials
    }

    session_regenerate_id(true);
    $_SESSION['userId'] = (int)$user['id'];

    respond(200, [ // successful login
        'ok' => true,
        'user' => [
            'id' => (int)$user['id'],
            'firstName' => $user['firstName'],
            'lastName' => $user['lastName'],
            'email' => $user['email'],
        ]
    ]);
}

if ($resource === 'logout' && $method === 'POST') {
    if (session_status() === PHP_SESSION_ACTIVE) {
        $_SESSION = [];
        if (ini_get('session.use_cookies')) {
            $params = session_get_cookie_params();
            setcookie(session_name(), '', time() - 42000, $params['path'], $params['domain'], $params['secure'], $params['httponly']);
        }
        session_destroy();
    }

    respond(200, ['ok' => true]);
}

// partial match search and fetch contacts for a user, return as json array
if ($resource === 'contacts') {
    if ($method === 'GET') {
        $userId = requireAuth();
        $search = trim($_GET['search'] ?? '');
        $page = max(1, (int)($_GET['page'] ?? 1));
        $pageSize = max(1, min(100, (int)($_GET['pageSize'] ?? 10))); // limit max pageSize to 100
        $offset = ($page - 1) * $pageSize;

        $pdo = db();
        
        // First, get the total count of contacts
        if ($search === '') {
            $countStmt = $pdo->prepare('SELECT COUNT(*) as total FROM Contacts WHERE userId = ?');
            $countStmt->execute([$userId]);
        } else {
            $like = '%' . $search . '%';
            $countStmt = $pdo->prepare(
                'SELECT COUNT(*) as total FROM Contacts WHERE userId = ? AND (' .
                'firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR phone LIKE ?' .
                ')'
            );
            $countStmt->execute([$userId, $like, $like, $like, $like]);
        }
        $totalContacts = (int)$countStmt->fetch()['total'];
        
        // Then, get the paginated contacts
        if ($search === '') {
            $stmt = $pdo->prepare('SELECT * FROM Contacts WHERE userId = ? ORDER BY lastName, firstName LIMIT ? OFFSET ?');
            $stmt->bindValue(1, $userId, PDO::PARAM_INT);
            $stmt->bindValue(2, $pageSize, PDO::PARAM_INT);
            $stmt->bindValue(3, $offset, PDO::PARAM_INT);
            $stmt->execute();
        } else {
            $like = '%' . $search . '%';
            $stmt = $pdo->prepare(
                'SELECT * FROM Contacts WHERE userId = ? AND (' .
                'firstName LIKE ? OR lastName LIKE ? OR email LIKE ? OR phone LIKE ?' .
                ') ORDER BY lastName, firstName LIMIT ? OFFSET ?'
            );
            $stmt->bindValue(1, $userId, PDO::PARAM_INT);
            $stmt->bindValue(2, $like, PDO::PARAM_STR);
            $stmt->bindValue(3, $like, PDO::PARAM_STR);
            $stmt->bindValue(4, $like, PDO::PARAM_STR);
            $stmt->bindValue(5, $like, PDO::PARAM_STR);
            $stmt->bindValue(6, $pageSize, PDO::PARAM_INT);
            $stmt->bindValue(7, $offset, PDO::PARAM_INT);
            $stmt->execute(); // partial match search
        }

        respond(200, [
            'ok' => true,
            'contacts' => $stmt->fetchAll(),
            'totalContacts' => $totalContacts,
            'page' => $page,
            'pageSize' => $pageSize,
            'totalPages' => (int)ceil($totalContacts / $pageSize)
        ]);
    }

    // handle creating a new contact for a user and return the new contact id
    if ($method === 'POST') {
        $data = getJsonBody();
        $userId = requireAuth();
        $firstName = trim($data['firstName'] ?? '');
        $lastName = trim($data['lastName'] ?? '');

        $email = trim($data['email'] ?? '');
        $phone = trim($data['phone'] ?? '');

        if ($firstName === '' || $lastName === '' || $email === '' || $phone === '') {
            respond(400, ['error' => 'Missing required fields.']);
        }
        $address = trim($data['address'] ?? '');
        $city = trim($data['city'] ?? '');
        $state = trim($data['state'] ?? '');
        $zipCode = trim($data['zipCode'] ?? '');
        $notes = trim($data['notes'] ?? '');

        $pdo = db();
        $stmt = $pdo->prepare(
            'INSERT INTO Contacts (userId, firstName, lastName, email, phone, address, city, state, zipCode, notes) ' .
            'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([$userId, $firstName, $lastName, $email, $phone, $address, $city, $state, $zipCode, $notes]);

        respond(201, ['ok' => true, 'contactId' => (int)$pdo->lastInsertId()]);
    }
}

// TODO : handle updating and deleting a contact by id


respond(404, ['error' => 'Not found.']); // no route matches 404 error
