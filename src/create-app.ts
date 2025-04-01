import { ClassSerializerInterceptor, INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

export async function createNestApp(): Promise<INestApplication> {
   const app = await NestFactory.create(AppModule);

   const allowedOrigins = process.env.ALLOWED_ORIGINS;
   const allowedOriginsArray = allowedOrigins ? allowedOrigins.split(',') : [];
   if (!allowedOriginsArray?.length) {
      throw new Error('ALLOWED_ORIGINS environment variable is required');
   }

   app.enableCors({
      origin: allowedOrigins === '*' ? '*' : allowedOriginsArray,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
      allowedHeaders: ['Content-Type', 'Authorization'],
   });

   app.useGlobalPipes(
      new ValidationPipe({
         transform: true,
         whitelist: true,
         forbidNonWhitelisted: true,
      }),
   );

   const config = new DocumentBuilder().setTitle('NestJS + Drizzle + Auth0').build();
   const documentFactory = () => SwaggerModule.createDocument(app, config);
   SwaggerModule.setup('api', app, documentFactory);

   app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

   return app;
}
