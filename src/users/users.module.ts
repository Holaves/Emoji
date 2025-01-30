import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/roles/schemas/role.schema';
import { User, UserSchema } from './schemas/user.schema';
import { RolesModule } from 'src/roles/roles.module';
import { FileService } from 'src/file/file.service';
import { RolesService } from 'src/roles/roles.service';
import { DishesModule } from 'src/dishes/dishes.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [UsersController],
  providers: [UsersService, FileService, RolesService],
  imports: [  
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    MongooseModule.forFeature([{name: Role.name, schema: RoleSchema}]),
    RolesModule,
    JwtModule
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule {}
