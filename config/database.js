import mysql from "mysql";

let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "juliengodard", // identifiant BDD
    password: "bef8b0390019ba24daf7609a236d80ac", // le password
    database: "juliengodard_blog", // nom de la base de donnée
});

export default pool;