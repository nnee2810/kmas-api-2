import { ValidationPipe } from "@nestjs/common"
import { HttpsOptions } from "@nestjs/common/interfaces/external/https-options.interface"
import { NestFactory } from "@nestjs/core"
import "dotenv/config"
import * as fs from "fs"
import { AppModule } from "./app.module"

const httpsOptions: HttpsOptions = {
  cert: fs.readFileSync("./ssl/certificate.crt"),
  key: fs.readFileSync("./ssl/private.key"),
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(process.env.PORT)
}
bootstrap()
