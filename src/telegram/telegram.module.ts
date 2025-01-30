import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { User, UserSchema } from 'src/users/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { FileService } from 'src/file/file.service';
import { FileModule } from 'src/file/file.module';
import { RolesService } from 'src/roles/roles.service';
import { RolesModule } from 'src/roles/roles.module';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService, AuthService, JwtService, UsersService, FileService, RolesService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    JwtModule,
    UsersModule,
    FileModule,
    RolesModule
  ]
})
export class TelegramModule {}
