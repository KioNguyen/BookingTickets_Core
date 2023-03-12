import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './all-exceptions.filter';

async function bootstrap() {
  const corsOptions = {
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:5173",
      "https://clinquant-kitten-5e218f.netlify.app",
      "https://taupe-moxie-ff51bb.netlify.app",
      "http://127.0.0.1:5174",
      "http://localhost:5173"
    ]
  }
  const app = await NestFactory.create(AppModule, { cors: corsOptions });
  app.useGlobalPipes(new ValidationPipe());

  // Handle all exception
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const serverPort = process.env.BOOKING_CORE_PORT

  const config = new DocumentBuilder()
    .setTitle('Booking')
    .setDescription('The booking API description')
    .setVersion('1.0')
    .addTag('booking')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(serverPort).then(value => {
    console.log("Booking app start on port ", serverPort);
  });
}
bootstrap();
