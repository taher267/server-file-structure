require('dotenv').config();
const { createServer } = require('http');
const app = require('./app');
const PORT = process.env.PORT || 4001;
const { connectDB } = require('./db');
// const seed = require('../seed');
const server = createServer(app);

(async () => {
  try {
    await connectDB();
    server.listen(PORT, () => {
      console.log(`Server is listening on port http://localhost:${PORT}`);
    });
    // seed();
  } catch (e) {
    console.log(e, `DB Error`);
  }
})();
