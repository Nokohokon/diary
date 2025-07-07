import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const entries = await prisma.diaryEntry.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(entries)
  } catch (error) {
    console.error('Error fetching diary entries:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  
  console.log('Session in POST:', JSON.stringify(session, null, 2))

  if (!session?.user?.id) {
    console.log('No session or user ID found')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

    console.log('User ID from session:', session.user.id)

    // Verify that the user exists in the database
    const existingUser = await prisma.user.findUnique({
      where: { id: session.user.id }
    })

    if (!existingUser) {
      console.log('User not found in database:', session.user.id)
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    console.log('User found in database:', existingUser.id, existingUser.email)

  try {
    const formData = await request.formData()
    const title = formData.get('title') as string
    const content = formData.get('content') as string
    const mood = formData.get('mood') as string
    const image = formData.get('image') as File | null

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    let imageData: Buffer | undefined
    let imageName: string | undefined
    let imageType: string | undefined
    let imageSize: number | undefined

    // Process image if provided
    if (image && image.size > 0) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
      if (!allowedTypes.includes(image.type)) {
        return NextResponse.json({ 
          error: 'Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.' 
        }, { status: 400 })
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024 // 5MB
      if (image.size > maxSize) {
        return NextResponse.json({ 
          error: 'File too large. Maximum size is 5MB.' 
        }, { status: 400 })
      }

      const arrayBuffer = await image.arrayBuffer()
      imageData = Buffer.from(arrayBuffer)
      imageName = image.name
      imageType = image.type
      imageSize = image.size
    }

    const entry = await prisma.diaryEntry.create({
      data: {
        title,
        content,
        mood: mood || null,
        imageData,
        imageName,
        imageType,
        imageSize,
        userId: session.user.id,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error creating diary entry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
