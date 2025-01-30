import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { CheckService } from './check.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('check')
export class CheckController {
  constructor(private readonly checkService: CheckService,
              private readonly jwtService: JwtService
  ) {}
  @Get('')
  isAuth(@Req() req: Request){
    const token = req.headers.authorization?.split(' ')[1]; // Extract Bearer token
    if (!token) {
      return false
    }
    const verifyToken = this.jwtService.verify(token, {secret: 'SECRET'});
    return this.checkService.checkUserAuth(verifyToken)
  }
  @Get('/admin')
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  isAdmin(){
    return true;
  }
}
