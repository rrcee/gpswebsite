import http from 'http';

const routes = [
  '/',
  '/about',
  '/academics',
  '/admissions',
  '/contact',
  '/facilities',
  '/faculty',
  '/results',
  '/gallery',
  '/governance'
];

async function testRoutes() {
  console.log('Testing all routes on http://localhost:3000...\n');
  let allPassed = true;

  for (const route of routes) {
    try {
      const res = await new Promise<http.IncomingMessage>((resolve, reject) => {
        const req = http.get(`http://localhost:3000${route}`, (res) => {
          resolve(res);
        });
        req.on('error', reject);
      });

      if (res.statusCode === 200) {
        console.log(`✅ [PASS] ${route} (200 OK)`);
      } else {
        console.log(`❌ [FAIL] ${route} returned status ${res.statusCode}`);
        allPassed = false;
      }
    } catch (err: any) {
      console.log(`❌ [ERROR] Failed to fetch ${route}: ${err.message}`);
      allPassed = false;
    }
  }

  console.log('\n=============================');
  if (allPassed) {
    console.log('All routes tested successfully!');
  } else {
    console.log('Some routes failed testing.');
  }
}

testRoutes();
