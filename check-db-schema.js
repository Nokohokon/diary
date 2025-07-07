const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkSchema() {
  try {
    // Check the current structure of verificationtokens table
    const result = await prisma.$queryRaw`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'verificationtokens'
      ORDER BY ordinal_position;
    `;
    
    console.log('Current verificationtokens table structure:');
    console.log(result);
    
    // Also check if the table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'verificationtokens'
      );
    `;
    
    console.log('Table exists:', tableExists);
    
  } catch (error) {
    console.error('Error checking schema:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkSchema();
