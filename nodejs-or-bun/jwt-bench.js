import jwt from "jsonwebtoken";
import { readFileSync } from "node:fs";

const emails = JSON.parse(
  readFileSync(
    "./assets/emails.json",
  ),
);

let i = 1, idx = 0;
const jwtSecret = "c2a09ac9bb544ce07d8765a3e2a68eada0265a65733a3b170a7b1359181298d07c21b8bc06887ce0f68753bc193a2c18";
const numIterations = parseInt(process.argv[2]);
let startTS;
while (true) {
  if (i === 1) {
    startTS = Date.now();
  }
  const email = emails[idx];
  const currTS = Date.now();
  const token = jwt.sign({
    sub: email,
    iat: currTS,
    exp: currTS + 2 * 60 * 60 * 1000,
  }, jwtSecret);
  const claims = jwt.verify(token, jwtSecret);
  if (claims.sub !== email) {
    process.exit(1);
  }
  if (idx++ >= emails.length) {
    idx = 0;
  }
  if (i++ > numIterations) {
    break;
  }
}
const endTS = Date.now();
const diff = endTS - startTS;
console.log(diff);