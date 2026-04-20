import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Configuro a proteção do endpoint
  if (request.nextUrl.pathname.startsWith('/api/cron')) {
    const authHeader = request.headers.get('authorization')
    const urlCronSecret = request.nextUrl.searchParams.get('secret')
    const defaultCronSecret = process.env.CRON_SECRET

    const isAuthorized = 
      authHeader === `Bearer ${defaultCronSecret}` || 
      urlCronSecret === defaultCronSecret

    if (!isAuthorized || !defaultCronSecret) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/api/cron/:path*',
}
