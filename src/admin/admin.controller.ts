import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AdminService } from './admin.service';

// import type { Prisma } from '@prisma/client';
import { CreateAdminDto } from './dto/create.admin.dto';
import { UpdateAdminDto } from './dto/update.admin.dto';
import { AdminLoginDto } from './dto/admin.login.dto';
import { RegisterAdminDto } from './dto/register.admin.dto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ChangePasswordDto } from './dto/change.password.dto';
import { AuthGuard } from './guard/auth.guard';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { EReq } from 'src/types/express.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MulterConfig } from 'src/config/multer.config';
import fs from 'fs';

@Controller('admin')
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
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'image', maxCount: 1 },
    ],  MulterConfig))
    // @UseGuards(AuthGuard)
    async createAdmin(
        @Body() data: CreateAdminDto,
        @UploadedFiles() files: { image?: Express.Multer.File[] }
    ) {
        if (!files.image || files.image.length === 0) {
            throw new HttpException('Image file is missing', HttpStatus.BAD_REQUEST);
        }
    
        console.log('Uploaded File:', files.image[0]);
        // rwrite file in the server
        const file = files.image[0];
        const fileName = file.originalname;
        const filePath = file.path;
        console.log('File Name:', fileName);
        console.log('File Path:', filePath);
        
        // upload buffer file to local storage
        fs.writeFileSync(`../helper/uploads`, file.buffer);
    
        // Process the file (e.g., save file information, update database, etc.)
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
