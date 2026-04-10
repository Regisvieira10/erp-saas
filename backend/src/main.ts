import { NestFactory } from '@nestjs/core';
import { ValidationPipe, BadRequestException } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: ['error', 'warn', 'log'] });
  
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002'],
    credentials: true,
  });
  
  app.useGlobalPipes(new ValidationPipe({ transform: true, exceptionFactory: (errors) => new BadRequestException(errors) }));
  
  const config = new DocumentBuilder()
    .setTitle('ERP SaaS API')
    .setDescription('Multi-tenant ERP API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3001);
  console.log('Backend running on http://localhost:3001');
}
bootstrap();
