import { NextResponse } from 'next/server'
import { generateWeddingIcs } from '@/lib/calendar'

/**
 * Route Handler serving the iCalendar (.ics) file directly over HTTP.
 * This is essential for iOS Safari / Apple Mobile devices, as iOS Safari
 * natively intercepts `Content-Type: text/calendar` from a real HTTP URL and
 * launches the native Apple Calendar event sheet ("Add All (3 Events)").
 */
export async function GET() {
  const icsData = generateWeddingIcs()

  return new NextResponse(icsData, {
    status: 200,
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="jaffrin-and-shifforah-wedding.ics"',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  })
}
