const { spawn, spawnSync } = require('node:child_process');
const path = require('node:path');

jest.setTimeout(20000);

const HOST = '127.0.0.1';
const PORT = 8099;
const API_BASE_URL = `http://${HOST}:${PORT}`;

const phpCheck = spawnSync('php', ['-v'], { stdio: 'ignore' });
const hasPhp = !phpCheck.error && phpCheck.status === 0;

const runIfPhpAvailable = hasPhp ? describe : describe.skip;

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

runIfPhpAvailable('API integration tests', () => {
  let serverProcess;

  const waitForServer = async () => {
    const healthUrl = `${API_BASE_URL}/api`;

    for (let attempt = 0; attempt < 50; attempt += 1) {
      try {
        const response = await fetch(healthUrl);
        if (response.ok) {
          return;
        }
      } catch (error) {
        // Server is still starting.
      }

      await wait(200);
    }

    throw new Error('PHP API server did not start in time.');
  };

  beforeAll(async () => {
    const repoRoot = path.resolve(__dirname, '../..');
    const routerScript = path.resolve(repoRoot, 'backend/api/index.php');

    serverProcess = spawn('php', ['-S', `${HOST}:${PORT}`, routerScript], {
      cwd: repoRoot,
      stdio: 'ignore',
    });

    await waitForServer();
  });

  afterAll(() => {
    if (serverProcess && !serverProcess.killed) {
      serverProcess.kill('SIGTERM');
    }
  });

  test('GET /api returns API health payload', async () => {
    const response = await fetch(`${API_BASE_URL}/api`);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toEqual(
      expect.objectContaining({
        ok: true,
        message: expect.any(String),
      })
    );
  });

  test('POST /api/register returns 400 with JSON error for missing fields', async () => {
    const response = await fetch(`${API_BASE_URL}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toEqual(
      expect.objectContaining({
        error: expect.any(String),
      })
    );
  });
});
