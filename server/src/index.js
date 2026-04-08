import dotenv from 'dotenv';

import { createServer } from './app.js';

dotenv.config();

const port = Number(process.env.PORT || 4000);
const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = createServer({ clientOrigin });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
