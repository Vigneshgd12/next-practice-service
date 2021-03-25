// module.exports = {
//   client: "pg",
//   connection: {
//     user: "spgchallenge",
//     password: "",
//     host: "localhost",
//     database: "spgchallenge",
//     charset: "utf8",
//     pool: { min: 0, max: 50 }
//   }
// };

module.exports = {
  client: "pg",
  connection: {
    user: "postgres",
    password: "root",
    host: "localhost",
    database: "postgres",
    charset: "utf8",
    pool: { min: 0, max: 50 }
  }
};


exports.up = function(knex) {
  return knex.schema.createTable('fields', function(table) {
    table.increments('id').primary()
    table.string('firstName')
    table.string('lastName')
    table.string('email')
    table.date('dob')
  }).createTable('emergencyContacts', function(table) {
    table.increments('id').primary()
    table.string('firstName')
    table.string('lastName')
    table.string('email')
    table.integer('fields_id').references('fields.id')
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('fields')
    .dropTable('emergencyContacts')
}