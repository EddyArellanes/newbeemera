import express from "express";
import morgan from "morgan";
import cors from 'cors';
import * as dotenv from 'dotenv'
import routes from './routes';
import { ormConnection } from './middlewares';
const corsOptions = { origin: '*'}
const app = express()

dotenv.config()



app.set('port', process.env.PORT || 4001)

//Set Cors for Allow Cross Origin Requests
app.use( cors( corsOptions))
//Middlewares
app.use( morgan('dev'))
app.use( express.json())
app.use( ormConnection );

//Static Files
app.use(express.static(__dirname + '/public/'))
app.use(routes);
app.use(async (error, req,res,next)  => {
    res.status(500).json({data:{}, error: error.message, message: 'Something went Wrong xO'})
});

export default app

