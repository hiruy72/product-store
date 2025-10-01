import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import { sql } from './config/db.js';


dotenv.config();
 

const app = express();

const PORT = process.env.PORT || 3000;





app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// apply arcc jet rate limit for all routes 
// app.use((req,res,next) =>{
//     try {
        
//     } catch (error) {
        
//     }

// });

app.use('/api/products', productRoutes);

async function initDB() {
    try {
        await sql `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) NOT NULL, 
            image VARCHAR(255) NOT NULL,
            price DECIMAL(10, 2) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        
    )`;
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }   
    // Any database initialization logic can go here
}


initDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Failed to initialize DB', err);
    process.exit(1);
});

