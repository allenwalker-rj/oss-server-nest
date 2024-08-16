import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    /**开启跨越访问 */
    const app = await NestFactory.create(AppModule, { cors: true });
    await app.listen(3000);
}
bootstrap();
