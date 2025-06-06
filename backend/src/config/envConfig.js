//Load environemt file based on NODE_ENV
let envFile = "";

if (process.env.NODE_ENV === "production") {
  envFile = ".env";
} else if (process.env.NODE_ENV === "development") {
  envFile = ".env.development";
} else if (process.env.NODE_ENV === "staging") {
  envFile = ".env.staging";
}

module.exports = envFile;
