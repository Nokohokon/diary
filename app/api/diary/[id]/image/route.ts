import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const entry = await prisma.diaryEntry.findFirst({
      where: {
        id: params.id,
        userId: session.user.id,
      },
      select: {
        imageData: true,
        imageType: true,
        imageName: true,
      },
    })

    if (!entry || !entry.imageData) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    // Return the image with proper headers
    return new NextResponse(entry.imageData, {
      headers: {
        'Content-Type': entry.imageType || 'image/jpeg',
        'Cache-Control': 'private, max-age=3600',
        'Content-Disposition': `inline; filename="${entry.imageName || 'image'}"`,
      },
    })
  } catch (error) {
    console.error('Error fetching image:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
