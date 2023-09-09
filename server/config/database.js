const mysql = require("mysql2");
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.MYSQL_DB,
  connectionLimit: 10,
});
pool.getConnection(function (err, connection) {
  console.log("database conected");
});

let registration = `CREATE TABLE if not exists registration(
    user_id int auto_increment,
    user_name varchar(255) not null,
    user_email varchar(255) not null,
    user_password varchar(255) not null,
    PRIMARY KEY (user_id)
)`;

let profile = `CREATE TABLE if not exists profile(
    user_profile_id int auto_increment,
    user_id int  not null,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    PRIMARY KEY (user_profile_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let question = `CREATE TABLE if not exists question(
    question_id int auto_increment,
    question_code_block varchar(255),
    question varchar(255) not null,
    question_description varchar(255),
    tags varchar(255),
    post_id varchar(255) not null,
    user_id int  not null,
    PRIMARY KEY (question_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id)
)`;

let answer = `CREATE TABLE if not exists answer(
    answer_id int auto_increment,
    answer_code_block varchar(255),
    answer varchar(255) not null,
    question_id int not null,
    user_id int  not null,
    PRIMARY KEY (answer_id),
    FOREIGN KEY (user_id) REFERENCES registration(user_id),
    FOREIGN KEY (question_id) REFERENCES question(question_id)

)`;
pool.query(registration, (err, results) => {
  if (err) throw err;
  console.log("registration tabele created");
});

pool.query(profile, (err, results) => {
  if (err) throw err;
  console.log("profile tabele created");
});

pool.query(question, (err, results) => {
  if (err) throw err;
  console.log("question tabele created");
});

pool.query(answer, (err, results) => {
  if (err) throw err;
  console.log("answer tabele created");
});
module.exports = pool;
