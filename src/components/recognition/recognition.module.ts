import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/mongoose/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../user/auth/auth.service';
import { UserProvider } from '../user/user.provider';
import { UserService } from '../user/user.service';
import { RecognitionProvider } from './recognition.provider';
import { RecognitionController } from './recognition.controller';
import { RecognitionService } from './recognition.service';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: ['jwt', 'refresh'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
  ],
  providers: [
    RecognitionService,
    ...RecognitionProvider,
    AuthService,
    UserService,
    ...UserProvider,
  ],
  controllers: [RecognitionController],
  exports: [RecognitionService, ...RecognitionProvider],
})
export class RecognitionModule {}
