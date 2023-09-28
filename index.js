require("dotenv").config(); 

const db = require("./db");
const express = require("express");

const app = express();

app.use(express.json());

app.delete("/clientes/:id", (request, response) =>{
    const id = parseInt(request.params.id);
    db.deleteCustomer(id);
    response.sendStatus(204);
})

app.patch("/clientes/:id", (request, response) =>{
    const id = parseInt(request.params.id);
    const customer = request.body;
    db.updateCustomer(id, customer);
    response.sendStatus(200);
})

app.post("/clientes", (request, response) =>{
    const customer = request.body;
    db.insertCustomer(customer);
    response.sendStatus(201);
})

app.get("/clientes/:id", (request, response) => {
    const id = parseInt(request.params.id);
    response.json(db.selectCustomer(id));
});

app.get("/clientes", (request, response) => {
    response.json(db.selectCustomers());
});

app.get("/", (request, response, next) => {
    response.json({
        message: "It´s alive!"
    });
});

app.listen(process.env.PORT, () => { 
    console.log("App now is running!");
});
