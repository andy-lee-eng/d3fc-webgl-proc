const fs = require('fs');
const dir = process.argv[2];

if (!fs.existsSync(dir)) {
  console.log(`creating folder: ${dir}`);
  fs.mkdirSync(dir);
}
