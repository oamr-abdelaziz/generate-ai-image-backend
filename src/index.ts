import * as dotenv from 'dotenv'
dotenv.config()

import app from './server'
import config from './config';

process.on('unhandledRejection', error => { 
    console.error('unhandledRejection', error); 
}); 

process.on('uncaughtException', error => { 
    console.error('uncaughtException', error);
});


app.listen(config.port, ()=> {
    console.log(`hello on http://localhost:${config.port}`);
})