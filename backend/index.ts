import Colors = require('colors.ts');
Colors.colors;
require('dotenv').config();
import express, { Application, json as JSONBody, Request, Response, urlencoded } from 'express';
import serverless from 'serverless-http';
// import routers = require('./routes/user.routes') // can use this syntax as well, but first see the export syntax.
import connectDB from './config/db';
import { errorHandler } from './middlewares/errorhandle';
import { docRoutes, userRoutes } from './routes';
import cors = require('cors');

const dbURL = process.env.DATABASE_URI ?? "mongodb://localhost:27017/FullStack";

const app: Application = express();

connectDB(dbURL);

app.use(cors({
  origin: 'http://localhost:8888',
  methods: ['GET', 'POST'],
  credential: true,
}));
app.use(JSONBody());
app.use(urlencoded({ extended: false }));

app.use('/.netlify/functions/index', docRoutes);
app.use('/.netlify/functions/index', userRoutes);

// Serve frontend
// if(process.env.NODE_ENV === 'production') {
//   // Here we are serving the static files through express which is created by react build script.
//   app.use(express.static(path.join(__dirname, '../../frontend/build')));

//   // This is called universal route which is any route getting request also execute function of this route. except the routes we've already defined above.
//   app.use('*', function(req: Request, res: Response) {
//     // From this function we will be sending our static index.html from build folder.

//     // We can either use this path.resolve method to send static file. But use this instead.
//     // We were point at the wrong path since our build index.js inside the `_dist directory` 
//     res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build','index.html'));

//     // Or we can use this path.join method to server static file, and we don't need to tell file name if it's name is `index`
//     // res.sendFile(path.join(__dirname, '../../frontend/build'));
//   });
// } else {
//   app.get('/', function(req: Request, res: Response) {
//     res.send('We are in development');
//   });
// }

// The custom error handler middleware functions should be below to the router.
app.use(errorHandler);

// app.listen(port, () =>
//   console.log('Ctrl + left-click. visit =>'.underline.dim.bold, `http://localhost:${port}/`.green.underline)
// );

export const handler = serverless(app);
