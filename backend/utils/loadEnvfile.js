const deotenv = require("dotenv");

exports.loadEnvfile = () => {
    let envPath = ".env.development";

    if(process.env.NODE_ENV === "production") envPath = ".env.production";

    if(process.env.NODE_ENV === "staging") envPath = ".env.staging";

    deotenv.config({path: envPath, override: false});
    console.log(`✅ Loaded ENV: ${envPath}`);

};
