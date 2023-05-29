const express = require("express");
const cors = require("cors");
// require = ("dotenv").config();
const dbConfig = require("./app/config/dbconfig")
const app = express();

var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Movieroom" });
});

// const user = require ("./app/controllers/user.controller");
// const movies = require ("./app/controllers/user.controller");


require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require("./app/routes/movie.routes")(app);
require("./app/routes/wishlist.routes")(app);

// set port, listen for requests
// const PORT = process.env.PORT || 8081;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });

//set port, listen for requests
// const PORT = process.env.PORT || 8081;
app.listen(8080, () => {
  console.log(`Server is running on port ${8080}.`);
});

const db = require("./app/models");
const Role = db.role;

db.mongoose
.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

  function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "moderator"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'moderator' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
  }







  


// const express = require("express");
// const cors = require("cors");
// // require = ("dotenv").config(path,'./app/config/dbconfig');
// const dbConfig = require("./app/config/dbconfig")
// const app = express();


// // const auth = require("./app/routes/auth.routes");
// const movie = require("./app/routes/movie.routes");
// // const user = require("./app/routes/user.routes");

// const auth = require("./app/controllers/auth.controller");
// // const movies = require("./app/controllers/movies.controller");
// const user = require("./app/controllers/movies.controller");

// var corsOptions = {
//   origin: "*",
// };

// app.use(express.json());
// app.use(cors(corsOptions));

// app.listen(8080, () => {
//   console.log("Server is running on port 8080.");
// });

// app.use('/auth', auth);
// app.use("/movie", movie);
// app.use('/user', user);