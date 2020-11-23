import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';
import HttpExceptionFilter from './common/filter/http.filter'
import HttpInterceptor from './common/interceptor/http.interceptor'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new HttpInterceptor());

  // app.useStaticAssets(`${__dirname}/public`);
  app.use(bodyParser.json({limit: '100mb'}));
  app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

  await app.listen(3009);
}
bootstrap();
