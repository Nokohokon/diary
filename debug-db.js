const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugDatabase() {
  console.log('=== Debugging Database ===')
  
  try {
    // Check users
    const users = await prisma.user.findMany()
    console.log(`Found ${users.length} users:`)
    users.forEach(user => {
      console.log(`- ID: ${user.id}, Email: ${user.email}, Name: ${user.name}`)
    })
    
    // Check sessions
    const sessions = await prisma.session.findMany()
    console.log(`\nFound ${sessions.length} sessions:`)
    sessions.forEach(session => {
      console.log(`- Session ID: ${session.id}, User ID: ${session.userId}, Expires: ${session.expires}`)
    })
    
    // Check accounts
    const accounts = await prisma.account.findMany()
    console.log(`\nFound ${accounts.length} accounts:`)
    accounts.forEach(account => {
      console.log(`- ID: ${account.id}, User ID: ${account.userId}, Provider: ${account.provider}`)
    })

    // Check diary entries
    const entries = await prisma.diaryEntry.findMany()
    console.log(`\nFound ${entries.length} diary entries:`)
    entries.forEach(entry => {
      console.log(`- ID: ${entry.id}, User ID: ${entry.userId}, Title: ${entry.title}`)
    })
    
  } catch (error) {
    console.error('Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugDatabase()
