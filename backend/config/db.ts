import { connect } from "mongoose";

/**
 * 
 * @param MongoDB Database URL
 * @indicate Shows the instance into if success
 * 
 */
const connectDB = async function(URI: string): Promise<void> {
  try {
    const conn = await connect(URI);
    console.log('Database conneted on =>'.white.bg_green.bold, `${conn.connection.host}`.magenta.underline);
  } catch (error) {
    console.log(`${error}`.bg_red.white.underline);
    process.exit(1);
  }
}

export = connectDB;