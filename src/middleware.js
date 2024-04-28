import { NextResponse } from 'next/server'

function middleware(request) {
  const cookies = request.cookies
  const accessToken = cookies.get('accessToken')
  const url = request.url

  let isLoggedSession = false

  if (accessToken !== undefined) isLoggedSession = true

  if (
    !isLoggedSession &&
    url.includes('/') &&
    !url.includes('/login') &&
    url.includes('/allNews')
    // url.includes('/admin/verified')
    // url.includes('/admin/notVerified')
  ) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // if (!isLoggedSession && url.includes('/') && !url.includes('/client')) {
  //   return NextResponse.redirect(new URL('/client', request.url))
  // }

  if (isLoggedSession && url.includes('/login')) {
    return NextResponse.redirect(new URL('/uscNews', request.url))
  }

  if (isLoggedSession && url.includes('/signUp')) {
    return NextResponse.redirect(new URL('/uscNews', request.url))
  }

  // Add a default response in case no redirect is needed
  return NextResponse.next()
}

const config = {
  matcher: '/admin/:path*',
}

module.exports = {
  middleware,
  config,
}
