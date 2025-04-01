const http = require('http');

const PORT = process.env.PORT || 3000;
const HEALTHY_EXIT_CODE = 0;
const UNHEALTHY_EXIT_CODE = 1;
const TIMEOUT_IN_MILLISECONDS = 5000;
const PATH = '/health';

const options = {
   hostname: 'localhost',
   port: parseInt(`${PORT}`),
   path: PATH,
   method: 'GET',
   timeout: TIMEOUT_IN_MILLISECONDS,
};

const req = http.request(options, (res) => {
   const exitCode = res.statusCode === 200 ? HEALTHY_EXIT_CODE : UNHEALTHY_EXIT_CODE;
   process.exit(exitCode);
});

req.on('error', (err) => {
   console.error('Health check failed:', err.message);
   process.exit(UNHEALTHY_EXIT_CODE);
});

req.on('timeout', () => {
   console.error('Health check timed out');
   req.destroy();
   process.exit(UNHEALTHY_EXIT_CODE);
});

req.end();
