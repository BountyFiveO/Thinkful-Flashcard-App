const { PORT = 5001 } = process.env;
const app = require("./app.js");
const knex = require("./db/connection.js");
const listener = () => console.log(`Listening on Port ${PORT}!`);
knex.migrate
  .latest()
  .then((migrations) => {
    console.log("migrations", migrations);
    app.listen(PORT, listener);
  })
  .catch(console.error);
