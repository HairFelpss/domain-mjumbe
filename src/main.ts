import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { version } = require('../package.json');

async function bootstrap() {
  process.env.TZ = 'UTC';
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.set('trust proxy', 1);

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Domains Manager')
    .setDescription("Domain's Manager API description")
    .setVersion(version)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  const port = process.env.PORT || 3001;
  await app.listen(port);

  return port;
}

bootstrap().then(port =>
  console.log(`App successfully started on port ${port} !`),
);
