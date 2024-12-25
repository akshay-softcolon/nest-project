import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UploadedFiles, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';

import type { Prisma } from '@prisma/client';
import { CreateAdminDto } from './dto/create.admin.dto';
import { UpdateAdminDto } from './dto/update.admin.dto';
import { AdminLoginDto } from './dto/admin.login.dto';
import { RegisterAdminDto } from './dto/register.admin.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { AuthGuard } from './guard/auth.guard';
import { ResetPasswordDto } from './dto/reset.password.dto';
// import { MulterModule } from '@nestjs/platform-express';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { EReq } from 'src/types/express.types';



@Controller({ path: 'admin', version: '1' })
export class AdminController {
    constructor(private readonly adminService: AdminService, ) { }

    @Get()
    async getAdmins(): Promise<{ id: string }[]> {
        return this.adminService.getAdmins();
    }

    @Get(':id')
    async getAdminById(id: string): Promise<{ id: string } | null> {
        return this.adminService.getAdminById(id);
    }

    @Post()
    async createAdmin( 
        // @Req() req: EReq,
        // @Res() res: Response,
        @Body() data: CreateAdminDto,
        @UploadedFiles()
        files: {
          image?: MulterOptions[];
        }
    ): Promise<Prisma.AdminCreateInput> {
        console.log(files);
        // console.log(req);
        
        
        return this.adminService.createAdmin(data);
    }

    @Patch(':id')
    async updateAdmin(@Param('id') id: string, @Body() data: UpdateAdminDto): Promise<{ id: string }> {
        return this.adminService.updateAdmin(id, data);
    }

    @Delete(':id')
    async deleteAdmin(@Param('id') id: string): Promise<{ id: string }> {
        return this.adminService.deleteAdmin(id);
    }

    @Get('search')
    async searchAdmin(@Query('email') email: string): Promise<{ email: string } | null> {
        return this.adminService.getAdminByEmail(email);
    }

    @Post('login')
    async login(@Body() data: AdminLoginDto): Promise<{ token: string }> {
        return this.adminService.login(data);
    }

    @Post('register')
    async register(@Body() data: RegisterAdminDto): Promise<{ token: string }> {
        return this.adminService.register(data);
    }

    @Post('forgot-password')
    async sendForgotPasswordLink(@Body() data: ForgotPasswordDto): Promise<{ message: string }> {
        return this.adminService.forgotPasswordLink(data);
    }

    @Post('reset-password')
    @UseGuards(AuthGuard)
    async resetPassword(
        // @Req() req: Request,
        // @Res() res: Response,
        @Body() data: ResetPasswordDto
    ): Promise<{ message: string }> {
        return this.adminService.resetPassword(data);
    }

    @Post('change-password')
    async changePassword(
        @Req() req: EReq,
        // @Res() res: Response,
        @Body() data: ChangePasswordDto
    ): Promise<{ message: string }> {
        return this.adminService.changePassword(req, data);
    }

}
