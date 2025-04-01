import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Decorator to mark a route as public, meaning it does not require authentication.
 *
 * This decorator sets metadata on the route handler to indicate that the route is public.
 * The `RolesGuard` or any other authentication guard can then check for this metadata
 * to bypass authentication for routes marked as public.
 *
 * @example
 * ```typescript
 * import { Controller, Get } from '@nestjs/common';
 * import { Public } from './public.decorator';
 *
 * @Controller('example')
 * export class ExampleController {
 *   @Public()
 *   @Get('public-route')
 *   getPublicRoute() {
 *     return 'This route is public and does not require authentication';
 *   }
 *
 *   @Get('private-route')
 *   getPrivateRoute() {
 *     return 'This route requires authentication';
 *   }
 * }
 * ```
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
