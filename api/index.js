/**
 * Construir una API rest utilizando las rutas de Express
 * con los siguientes endpoints:
 * 
 * [get] http://localhost:3000/categories (debe devolver todas las categorias)
 * [post] http://localhost:3000/categories (debe insertar una nueva categoria)
 * [get] http://localhost:3000/categories/:id (debe obtener la categoria con id ":id")
 * [put] http://localhost:3000/categories/:id (debe remplazar a la categoria con id ":id")
 * [patch] http://localhost:3000/categories/:id (debe actualizar la categoria con id ":id")
 * [delete] http://localhost:3000/categories/:id (debe eliminar la categoria con id ":id")
 *
 * [get] http://localhost:3000/books (debe devolver todos los libros y poder filtrar por categorias)
 * [post] http://localhost:3000/books (debe insertar un nuevo libro)
 * [get] http://localhost:3000/books/:id (debe obtener el libro con id ":id")
 * [put] http://localhost:3000/books/:id (debe remplazar al libro con id ":id")
 * [patch] http://localhost:3000/books/:id (debe actualizar al libro con id ":id")
 * [delete] http://localhost:3000/books/:id (debe eliminar al libro con id ":id")
 
 */
const express = require("express");
const app = express();
const routesCategories = require("./routes/categories");
const routesBooks = require("./routes/books");
const bodyParser = require("body-parser");
const errorHandler = require("./modules/error-handler");
const mongo = require("./modules/mongo");
const logBody = require("./modules/log-body");

app.use(bodyParser.json());

app.use(logBody);

app.use("/categories", routesCategories);

// Podemos filtrar por una o mas categorías
// http://localhost:3000/books?q={"category": {"id":  "c8f5d5c9-b750-4ee2-a209-e0d4710c1976"}}
// http://localhost:3000/books?q={"category":{"id":{"$in":["c8f5d5c9-b750-4ee2-a209-e0d4710c1976"]}}}
app.get("/books", routesBooks.list);
app.post("/books", routesBooks.create);
app.get("/books/:id", routesBooks.get);
// Por el momento vamos a usar el mismo método
app.put("/books/:id", routesBooks.update);
app.patch("/books/:id", routesBooks.update);
app.delete("/books/:id", routesBooks.remove);

app.use(errorHandler);

mongo.init().then(res => {  
  res.json(books)     
  app.listen(3000, () => console.log("Example app listening on port 3000!")); 
}).catch((error) =>{
    console.log(res.json(error))
});