import { Module } from '@nestjs/common';
import { CheckService } from './check.service';
import { CheckController } from './check.controller';
import { JwtModule } from '@nestjs/jwt';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({
  controllers: [CheckController],
  providers: [CheckService],
  imports: [
      MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
      RolesModule,
      JwtModule,
      AuthModule
  ]
})
export class CheckModule {}
