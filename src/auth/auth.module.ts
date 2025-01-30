import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: 'SECRET',
      signOptions: {
        expiresIn: '72h'
      }
    }),
    UsersModule,
  ],
  exports: [
    AuthService,
    JwtModule
]
 
})
export class AuthModule {}
