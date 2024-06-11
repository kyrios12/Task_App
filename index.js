import express from 'express';
import authRouter from './routes/authRouter.js';
import taskRouter from './routes/taskRouter.js';

const port = 8080;

// Express Application
const app = express();

// Setting View Engine
// How to setup multiple folder view
// app.set('view engine','ejs');
// app.set('views','./views/User');
// Middleware
app.use(express.urlencoded({
    extended: true
}))

// Routes
app.use('/',authRouter);
app.use('/task/',taskRouter);

app.listen(port,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log(`Server is running on port ${port}`);
    }
})

