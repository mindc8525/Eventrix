import express from 'express';
import cors from 'cors';
import eventRoutes from './routes/events.route.js';
import notifyRoutes from './routes/notify.route.js';



const app = express()


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(eventRoutes);
app.use("/api", notifyRoutes);

export default app;