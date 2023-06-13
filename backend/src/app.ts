import express, { Request, Response, Router } from 'express';
import morgan from 'morgan';
import { AppRoute } from './Routes/AppRoutes';
import cors from 'cors';
import { sequelize } from './Utils/DataBaseModelAssociatons';
import { ErrorMiddleWare } from './Middlewares/ErrorMiddleware';
import { port } from './Utils/EnvConfig';
const app = express();


// enabling cors 
app.use(cors());
app.options('*', cors())

// middlewares
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
const router = Router();
const AppRouter = new AppRoute(router);
app.use((req,res,next)=>{
  console.log((req as Request).url)
  next()
})
app.use(AppRouter.registerRoutes(), router);

// global error middleware
app.use(ErrorMiddleWare.sendErrorMessageWithResponse);

// Db sync
sequelize.sync().then(() => {
  app.listen(port);
}).catch(e => {
  console.log(e.message);
})