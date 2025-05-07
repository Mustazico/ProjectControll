import sql from 'mssql';

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || '1433'),
  options: {

    connectTimeout: 300000, // Increase timeout (in milliseconds)
  },
};

export const handler = async (event) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT 1 AS connected`;
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, result: result.recordset }),
    };
  } catch (error) {
    console.error('DB Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  } finally {
    sql.close();
  }
};
