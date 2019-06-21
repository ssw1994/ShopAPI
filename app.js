var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var notificationRouter = require('./routes/notifications');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var productsRouter = require("./routes/products");
var cartsRouter = require("./routes/carts");
var todoRouter = require("./routes/todo");
var chatRouter = require("./routes/chat");
var app = express();
//const server = app.listen('port');
//const io = require('socket.io')(server);
// const io = require("socket.io")(server, {
//   handlePreflightRequest: (req, res) => {
//       const headers = {
//           "Access-Control-Allow-Headers": "Content-Type, Authorization",
//           "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
//           "Access-Control-Allow-Credentials": true
//       };
//       res.writeHead(200, headers);
//       res.end();
//   }
// });
var options = {
  allowUpgrades: true,
  transports: [ 'polling', 'websocket' ],
  pingTimeout: 9000,
  pingInterval: 3000,
  cookie: 'mycookie',
  httpCompression: true,
  origins: '*:*'
};
const PORT = 3002;
const server = require('http').Server(app);
const io = require('socket.io')(PORT,options).listen(server);
//server.listen(PORT);
//io.set('origins', '*:*');
// io.on('connection', (socket) => {
//   console.log('connected a new client');
// });

// Sockert Code

io.on("connection", (socket) => {
  console.log("Connected.....");
  let previousId;
  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId);
    previousId = currentId;
  };
  socket.on('reconnect_attempt', () => {
    socket.io.opts.transports = ['polling', 'websocket'];
  });
  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });

  socket.on('msg',msg=>{
    console.log("messages",msg);
    io.emit('getmsg',{data:msg});
  });

  socket.on('locationchage',cordinates=>{
    console.log("current cordinates");
    io.emit("getchange",cordinates);
  });

  //io.emit("documents", Object.keys(documents));
});

// End of Socket Code

//client.js
var allowedOrigins = "http://localhost";

//io.origins('*:*') // for latest version
// var sio_server = io.origins(server, {
//   origins: allowedOrigins,
//   path : path
// });
var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
}
app.use(function(req, res) {
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  });
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/products",productsRouter);
app.use("/carts",cartsRouter);
app.use("/notification",notificationRouter);
app.use("/todo",todoRouter);
app.use("/chat",chatRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
