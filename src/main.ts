import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import path, { join } from 'node:path';
import Handlebars from 'handlebars';
import { readdirSync, readFileSync } from 'node:fs';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    // change to `new FastifyAdapter({ logger: true })` if you want fastify inbuilt logger
    // i removed it because it ruined the logs view. might add if i can make them prettier.
    new FastifyAdapter(),
  );

  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
  });
  app.setViewEngine({
    engine: {
      handlebars: Handlebars,
    },
    templates: join(__dirname, '..', 'views'),
    layout: 'layouts/main',
  });
  const partialsDir = join(__dirname, '..', 'views', 'partials');
  readdirSync(partialsDir).forEach((filename) => {
    if (filename.endsWith('.hbs')) {
      const name = path.parse(filename).name;

      Handlebars.registerPartial(
        name,
        readFileSync(path.join(partialsDir, filename), 'utf-8'),
      );
    }
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
