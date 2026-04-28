import express from 'express';
import type { Response, Request } from 'express';
import 'dotenv/config';

const app = express();
import authRoutes  from './routes/auth.js';
const PORT = Number(process.env.PORT) || 8080;
import connectDb from './config/db.js'; 
import cors from 'cors';

app.use(cors());
app.use(express.json());
app.use('/api/auth/', authRoutes);



app.get("/clear", (req:Request, res:Response)=>{
    res.json({message: "Clear route working"});
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth API listening on http://127.0.0.1:${PORT} (bound to 0.0.0.0:${PORT})`);
  connectDb();
});