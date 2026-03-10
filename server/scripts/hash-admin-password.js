/**
 * Generate a bcrypt hash for ADMIN_PASSWORD_HASH (Render env var).
 * Run: node scripts/hash-admin-password.js "YourPassword"
 * Then set ADMIN_PASSWORD_HASH on Render to the printed hash.
 */
const bcrypt = require('bcryptjs');
const password = process.argv[2];
if (!password) {
    console.error('Usage: node scripts/hash-admin-password.js "YourPassword"');
    process.exit(1);
}
const hash = bcrypt.hashSync(password, 10);
console.log('Set this as ADMIN_PASSWORD_HASH on Render:');
console.log(hash);
