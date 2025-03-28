import "../bootstrap";

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin",
  },
  dialect: process.env.DB_DIALECT || "mysql",
  timezone: "UTC",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  logging: process.env.DB_DEBUG === "true"
    ? (msg) => console.log(`[Sequelize] ${new Date().toISOString()}: ${msg}`)
    : false,
  dialectOptions: {
    useUTC: true,
    dateStrings: true,
    typeCast: function (field, next) { // 🔹 Garante que timestamps são tratados corretamente
      if (field.type === 'DATETIME' || field.type === 'TIMESTAMP') {
        return field.string();
      }
      return next();
    },
  },
  pool: {
    max: 20,
    min: 1,
    acquire: 0,
    idle: 30000,
    evict: 1000 * 60 * 5,
  },
  retry: {
    max: 3,
    timeout: 30000,
    match: [
      /Deadlock/i,
      /SequelizeConnectionError/,
      /SequelizeConnectionRefusedError/,
      /SequelizeConnectionTimedOutError/,
      /SequelizeHostNotFoundError/,
      /SequelizeHostNotReachableError/,
      /SequelizeInvalidConnectionError/,
      /SequelizeConnectionAcquireTimeoutError/,
      /Operation timeout/,
      /ETIMEDOUT/
    ]
  },
};
