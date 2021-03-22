const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config(); 

const dbService = require('./dbservice');

app.use(cors());
app.use(express.json({extended: false}));


//read
app.get('/api/get', (req, res) =>{
    
   const db = dbService.getDbServiceInstance();
   const result = db.getAllData();
   result
   .then(data => res.json({data : data}))
   .catch(err => console.log(err));

});

app.post('/api/insert', (req, res) =>{
    
    const { firstname, lastname, email } =req.body;
    console.log( firstname, lastname, email )
    const db = dbService.getDbServiceInstance();

    const results = db.insertNewPeople( firstname, lastname, email);

    results
    .then(data => res.json({ data: data}))
    .catch(err => console.log(err));
});


//delete
app.delete('/api/delete/:id', (req, res)=>{
    const {id} = req.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
   
    result
    .then((data) =>{res.json({success : data})})
    .catch(err => console.log(err));
});

//get single user for edit
app.get('/api/edit/:id', (req, res)=>{
    const {id} = req.params;
    const db = dbService.getDbServiceInstance();

    const result = db.getUser(id);

    result
    .then((data) =>{res.json({success : data})})
    .catch(err => console.log(err));
});

//update by id user
app.post('/api/update/:id', (req, res)=>{
    const {firstname, lastname, email } =req.body;
    const id = req.params['id'];

    const db = dbService.getDbServiceInstance();

    const result = db.updateRowById(id,firstname,lastname,email);

    result
    .then(data => res.json({success : data}))
    .catch(err => console.log(err));

});

app.listen(3001, () =>{
    console.log("App is running on port 3001");
});
