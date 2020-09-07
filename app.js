const express = require("express");
const PORT = 4000;
const path = require("path");
const mysql = require("mysql");
const methodOverride = require("method-override");

const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Dotenv
require("dotenv").config();

// Method Override
app.use(methodOverride("_method"));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//setup public folder
app.use(express.static("./public"));

// Mysql
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATA,
  multipleStatements: true,
});
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connecté à la base MySQL");
});
global.db = db;

// Controller

const { getCars, getAddCar, addCar } = require("./controllers/cars");
const { getSingleCar } = require("./controllers/show");
const { getEditPage, putEditPage } = require("./controllers/upload");
const { getFactories, getFactory, putFactory, deleteFactory } = require("./controllers/factories");

// Routes

app.get("/", getCars);
app.get("/add", getAddCar);
app.post("/add", addCar);
app.get("/show/:id", getSingleCar);
app.get("/car/edit/:id", getEditPage);
app.put("/car/edit/:id", putEditPage);
app.get("/factories", getFactories);
app.get("/factories/edit/:id", getFactory);
app.put("/factories/:id", putFactory);
app.delete("/factories/:id", deleteFactory);

app.listen(PORT, function () {
  console.log("Écoute le port : ", PORT);
});
