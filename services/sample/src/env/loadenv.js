import dotenv from 'dotenv';

// env values maybe loaded from container environment and will override file values
// Load dotenv file for environment variables
const envFile = dotenv.config({ path: '.env' });
if (envFile.error) {
  throw envFile.error;
}

export default envFile;
