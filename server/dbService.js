const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();


const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if(err){
        console.log(err.message);
    }
    console.log('db'+ connection.state);
});

class DbService{
    static getDbServiceInstance(){
        return instance ? instance : new DbService();
    }
    async getAllData(){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = " SELECT * FROM people ";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(response);
            return response;
            } catch(error){ console.log(error); }
    }


    async insertNewPeople( firstname, lastname, email ){
        try{
            const response = await new Promise((resolve, reject) => {
                const query = " INSERT INTO people (firstname, lastname, email) VALUES (?,?,?) ";

                connection.query(query, [ firstname, lastname, email], (err, results) => {
                    if(err){ reject(new Error(err.message));}
                    else {
                        resolve(results);}
                });
            });
            return {
                
                firstname: firstname,
                lastname: lastname,
                email: email

            }
        } catch(error){ console.log(error); }
    }


    async deleteRowById(id){
        try{
            id = parseInt(id, 10);
            const res = await new Promise((resolve, reject) => {
                const query = " DELETE FROM people WHERE id = ?";

                connection.query(query, [id], (err, results) => {
                    if (err) {reject(new Error(err.message));}
                    else {resolve(results.affectedRows);}
                })
            });

            console.log(res);
            return res === 1 ? true : false;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }
    async getUser(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                console.log(id,"in db")
                const query = "SELECT * FROM people WHERE id = id";

                connection.query(query, (err, results) => {
                    if (err) {reject(new Error(err.message));} else{
                    resolve(results);}
                })
            });

            console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    async updateRowById(id, firstname, lastname, email){
        try{
            id = parseInt(id, 10);
            console.log(id,firstname,lastname,email);
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE people SET firstname=? , lastname=? , email=? WHERE id=?";
                connection.query(query, [firstname, lastname, email, id], (err, results) => {
                    if (err) {reject(new Error(err.message));}
                    else{ resolve(results.affectedRows); }
                });
            });

            console.log(response);
            return response === 1 ? true : false;
        }
        catch(error){
            console.log(error);
            return false;
        }
    }

    //update by id
async updateRowById(id,firstname,lastname,email){
    try{
        id = parseInt(id, 10);
        console.log(id,firstname,lastname,email)
        const response = await new Promise((resolve, reject) => {
            const query = "UPDATE people SET firstname = ? , lastname = ? , email = ? WHERE id = ?";

            connection.query(query, [firstname, lastname, email, id], (err, results) => {
                if (err) {reject(new Error(err.message));}else{
                resolve(results.affectedRows);}
            })
        });

        console.log(response);
        return response === 1 ? true : false;
    }
    catch(error){
        console.log(error);
        return false;
    }
}
}
module.exports = DbService;