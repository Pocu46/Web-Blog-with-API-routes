export {default} from 'next-auth/middleware'

export const config = {
  matcher: ['/', '/post', '/post/create', '/post/favorites', '/post/posts', '/auth/copyrights'],
}