const express = require("express");
const app = express();

const knexfile = require("../knexfile");
const knex = require("knex")(knexfile);
const bookshelf = require("bookshelf")(knex);

const schema = require("./resources/valid_schema.json");

const Ajv = require("ajv");

const port = 3000;

const Fields = bookshelf.Model.extend({
  tableName: "fields",
  emergencyContact() {
    return this.hasOne(EmergencyContact);
  }
});


const EmergencyContact = bookshelf.Model.extend({
  tableName: "emergencyContact",
  fields() {
    return this.belongsTo(Fields);
  }
});




app.get("/ping", (req, res) => res.send("pong"));



app.get("/fields", (req, res) => {
  Fields.fetchAll()
    .then(function (fields) {
      res.json(fields.toJSON());
    })
    .catch(function (err) {
      res.status(500);
    });
});


app.post("/fields", async (req, res) => {
  validateFields(req.body);
  var fields = await Fields.forge({

    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  })
    .save()
    .catch(function (err) {
      res.status(500);
    });

  res.json(fields.toJSON());
});


app.put("/fields/:id", (req, res) => {

  validateFields(req.body);
  var fields = await Fields.where("id", req.params.id).save(
    { ...req.body },
    { patch: true }
  ).catch(function (err) {
    res.status(500);
  });

  res.json(fields.toJSON());

});



app.post("/forms", (req, res) => {
  validateFields(req.body);
  var fields = await Fields.forge({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob
  })
    .save()
    .catch(function (err) {
      res.status(500);
    });


  var emergencyContact = await EmergencyContact.forge({
    firstName: req.body.emergencyContact.firstName,
    lastName: req.body.emergencyContact.lastName,
    email: req.body.emergencyContact.email,
    fields_id: fields.id
  })
    .save()
    .catch(function (err) {
      res.status(500);
    });

  fields.emergencyContact = emergencyContact;
  res.json(fields.toJSON());


});

function validateFields(fields) {
  const ajv = new Ajv({ strict: false, removeAdditional: true });
  const fieldSchema = schema;
  const schemaref = 'schema.json';

  ajv.addSchema(fieldSchema, schemaref);
  return ajv.validate({ $ref: schemaref + "#/definitions/fields" }, fields);
}

app.listen(port, () => console.log("Example app listening on port " + port));
