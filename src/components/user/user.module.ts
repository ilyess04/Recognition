import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { EmailModule } from 'src/common/email/email.module';
import { DatabaseModule } from 'src/common/mongoose/database/database.module';
import { AuthService } from './auth/auth.service';
import { UserProvider } from './user.provider';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: ['jwt', 'refresh'] }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
    }),
    EmailModule,
  ],
  providers: [AuthService, UserService, ...UserProvider],
  controllers: [AuthController, UserController],
  exports: [AuthService, ...UserProvider],
})
export class UserModule {}
