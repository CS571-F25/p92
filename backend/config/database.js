import { Sequelize } from 'sequelize';

// Initialize database (PostgreSQL for production, SQLite for development)
const sequelize = process.env.DATABASE_URL
  ? new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      },
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    })
  : new Sequelize({
      dialect: 'sqlite',
      storage: process.env.DATABASE_PATH || './database.sqlite',
      logging: process.env.NODE_ENV === 'development' ? console.log : false
    });

// Test connection and sync models
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    const dbType = process.env.DATABASE_URL ? 'PostgreSQL' : 'SQLite';
    console.log(`✅ ${dbType} Database Connected`);
    
    // Sync all models (creates tables if they don't exist)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synchronized');
  } catch (error) {
    console.error(`❌ Database Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export { sequelize, connectDB };
export default connectDB;
