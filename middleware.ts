export {default} from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/post', '/post/create', '/post/favorites', '/post/list', '/auth/copyrights', '/profile' ],
}