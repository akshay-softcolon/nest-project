import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { ResponseService } from 'src/common/response.servive';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtService, ResponseService],
})
export class AdminModule {}
