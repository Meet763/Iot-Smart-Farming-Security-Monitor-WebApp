module.exports = {
  apps: [
    {
      name: "server",            // Name of your backend app
      script: "index.js",       // Entry point file for your backend
      cwd: "./",                 // Working directory (project root)
      env: {                     // Environment variables for your backend
        NODE_ENV: "production",
        DB_HOST: "206.189.138.125",
        DB_USER: "developer",
        DB_PASSWORD: "Dev@123db",
        DB_NAME: "iotdb",
        PORT: 8000,
        JWT_KEY: "1234",
        mqtt_user: "moskam",
        mqtt_pass: "mos123",
      },
    },
  ],
};

