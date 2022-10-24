import mysql from "mysql";
import util from "util"

export let pool  = mysql.createPool({
  connectionLimit : 10000,
    host: "db.3wa.io",// on rentre l'hôte, l'adresse url où se trouve la bdd
    user: "juliengodard", // identifiant BDD
    password: "bef8b0390019ba24daf7609a236d80ac", // le password
    database: "juliengodard_socialnetwork", // nom de la base de donnée
});

// pour creer des requet sql async
export const query = util.promisify(pool.query).bind(pool)

// permet d'obtenir le resultat des requete sql async
export const asyncQuery = async (sql, params) => {
    try {
        const rows = await query(sql, params)
        return rows
    } catch(err) {
        console.log(err)
    }
}