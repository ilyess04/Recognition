import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmailModule } from './common/email/email.module';
import { DatabaseModule } from './common/mongoose/database/database.module';
import { UserModule } from './components/user/user.module';
import { RecognitionModule } from './components/recognition/recognition.module';

@Module({
  imports: [EmailModule, DatabaseModule, UserModule, RecognitionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
