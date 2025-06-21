// Save this as debug-tracker.js and run: node debug-tracker.js

const { testDetection } = require('./tracker');

async function runTest() {
  console.log('🔍 Testing app detection...\n');
  
  for (let i = 0; i < 10; i++) {
    console.log(`--- Test ${i + 1} ---`);
    await testDetection();
    console.log('');
    
    // Wait 2 seconds between tests
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
}

runTest().catch(console.error); 