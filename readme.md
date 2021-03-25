# Overview

Create a backend service that allows someone to build a form schema. The schema should allow a front-end client to render a compliant form. A collection of Postman routes are provided to help you debug your service. Of note, many of these will fail until you've implemented the service.

The service should use Node and Express. It is recommended to use Postgres and Bookshelf - setup instructions provided below. The majority of the code must be original.

The service should store each field definition in a new row of a table. To demonstrate your system, ensure it can support the following schema:

```
[{
  "type": "text",
  "name": "firstName",
  "required": true
},{
  "type": "text",
  "name": "lastName",
  "required": true
},{
  "type": "date",
  "name": "dob",
  "required": true
},{
  "type": "email",
  "name": "email",
  "pattern": "[a-z0-9.]+@[a-z0-9.]+.com"
},{
  "type": "group",
  "name": "emergencyContact",
  "fields": "[{"
    "type": "text",
    "name": "firstName",
    "required": true
  },{
    "type": "text",
    "name": "lastName",
    "required": true
  },{
    "type": "email",
    "name": "email",
    "pattern": "[a-z0-9.]+@[a-z0-9.]+.com"
  }]
}]
```

Try to complete as many of the following tasks as possible:

* Allow fields to be added, edited and deleted.
* Create a seed file that populates the above schema.
* Allow completed forms to be submitted, stored and retrieved.
* Run the validation on submission and reject any non-compliant forms.
* To avoid duplicating the form structure, allow a child element to be descendent of multiple parent fields. Update the form above to allow the firstName, lastName and email fields to be shared.

# Getting started

Install Postgres:

```
brew install postgresql
brew services start postgresql
```

Dependencies:

```
npm i
```

| Command                | Purpose              |
| ---------------------- | -------------------- |
| npm start              | Start the server     |
| npm run db:create:user | Creates a user       |
| npm run db:create:db   | Creates the database |
| npm run db:drop:db     | Drops the database   |
| npm run db:update      | Migrates the data    |
| npm run db:reset       | Reset the database   |
| npm run db:seed        | Seeds the database   |

## Useful database commands

Create seed and migrations using Knex:

| Command                | Purpose                |
| ---------------------- | ---------------------- |
| knex migrate:make NAME | Create a new migration |
| knex seed:make NAME    | Create and apply seed  |
