import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid("development", "production", "test")
    .default("development"),

  PORT: Joi.number().default(3000),

  APP_NAME: Joi.string().default("Node Starter Template"),

  MONGO_URI: Joi.string().required(),

  JWT_SECRET: Joi.string().required(),

  JWT_EXPIRES_IN: Joi.string().default("1d"),

  REFRESH_TOKEN_SECRET: Joi.string().required(),

  REFRESH_TOKEN_EXPIRES_IN: Joi.string().default("2m"),
}).unknown();

const { value: envVars, error } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Environment validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,

  app: {
    name: envVars.APP_NAME,
    port: envVars.PORT,
  },

  database: {
    uri: envVars.MONGO_URI,
  },

  jwt: {
    secret: envVars.JWT_SECRET,
    expiresIn: envVars.JWT_EXPIRES_IN,

    refreshSecret: envVars.REFRESH_TOKEN_SECRET,
    refreshExpiresIn: envVars.REFRESH_TOKEN_EXPIRES_IN,
  },
};

export default config;
