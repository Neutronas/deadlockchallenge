const fs = require("fs");
const path = require("path");

const nojekyllPath = path.join(__dirname, "..", "out", ".nojekyll");

fs.writeFileSync(nojekyllPath, "");
console.log("✅ .nojekyll file added to /out");
