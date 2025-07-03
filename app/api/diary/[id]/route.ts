import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    const { title, content, mood } = await request.json()

    const entry = await prisma.diaryEntry.update({
      where: {
        id: id,
        userId: session.user.id, // Ensure user owns the entry
      },
      data: {
        title,
        content,
        mood,
      },
    })

    return NextResponse.json(entry)
  } catch (error) {
    console.error('Error updating diary entry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()

  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    await prisma.diaryEntry.delete({
      where: {
        id: id,
        userId: session.user.id, // Ensure user owns the entry
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting diary entry:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
