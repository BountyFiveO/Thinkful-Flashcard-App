require("dotenv.development").config();
require("dotenv.production").config();

const {
    NODE_ENV = "development",
    DEVELOPMENT_DATABASE_URL,
    PRODUCTION_DATABASE_URL,
  } = process.env;
  const URL =
    NODE_ENV === "production"
      ? PRODUCTION_DATABASE_URL
      : DEVELOPMENT_DATABASE_URL;