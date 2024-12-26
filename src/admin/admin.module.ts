import { Module } from '@nestjs/common';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { JwtService } from '@nestjs/jwt';
import { MulterHelper } from 'src/helper/multer.helper';

@Module({
  controllers: [AdminController],
  providers: [AdminService, JwtService, MulterHelper],
})
export class AdminModule {}
