import { BadRequestException,  Injectable } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';

import type { CreateAdminDto } from './dto/create.admin.dto';
import type { UpdateAdminDto } from './dto/update.admin.dto';
import type { Prisma } from '@prisma/client';
import { AdminLoginDto } from './dto/admin.login.dto';
import { RegisterAdminDto } from './dto/register.admin.dto';

import * as crypto from 'crypto';
import { ForgotPasswordDto } from './dto/forgot.password.dto';
import { ChangePasswordDto } from './dto/change.password.dto';

import * as bcrypt from 'bcryptjs';
import { ResetPasswordDto } from './dto/reset.password.dto';
import { EReq } from 'src/types/express.types';
import { JwtService } from '@nestjs/jwt';
import config from 'config/index';

@Injectable()
export class AdminService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService
  ) { }

  async createAdmin(data: CreateAdminDto, fileName: string): Promise<Prisma.AdminCreateInput> {
    // check if admin already exists
    const admin = await this.getAdminByEmail(data.email);
    if (admin) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Admin already exists',
        error: 'Bad Request',
        data: data.email,
      });
    }

    // add image to database
    await this.prismaService.image.create({
      data: {
        url: `${config.DATABASE_URL}${fileName}`,
      },
    });

    const createAdmin =  await this.prismaService.admin.create({
      data: {
        email: data.email,
        name: data.name,
        role: data.role,
        password: data.password,
      },
    });

    return {name: createAdmin.name, email: createAdmin.email, role: createAdmin.role};
  }

  async getAdmins(): Promise<{ id: string }[]> {
    return this.prismaService.admin.findMany({select: {id: true, email: true}});
  }

  async getAdminById(id: string): Promise<{ id: string } | null> {
    return this.prismaService.admin.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
      }
    });
  }

  async updateAdmin(id: string, data: UpdateAdminDto): Promise<{ id: string }> {
    if (data.email) {
      const admin = await this.getAdminByEmail(data.email);
      if (admin) {
        throw new Error('Admin already exists');
      }
    }

    return this.prismaService.admin.update({
      where: {
        id,
      },
      data: {
       email: data.email,
      },
    });
  }

  async deleteAdmin(id: string): Promise<{ id: string }> {
    const admin = this.prismaService.admin.delete({
      where: {
        id,
      },
    });
    // handle error if admin does not exist, return error
    if (!admin) {
      throw new Error('Admin does not exist');
    }
    return admin;
  }

  async deleteAllAdmins(): Promise<{ count: number }> {
    return this.prismaService.admin.deleteMany();
  }

  async getAdminByEmail(email: string): Promise<{ email: string } | null> {
    const admin=  this.prismaService.admin.findUnique({
      where: {
        email,
      },
      select: {
        email: true,
      }
    });
    if (!admin) {
      throw new Error('Admin does not exist');
    }
    return admin;
  }

  async login(data: AdminLoginDto): Promise<{ accessToken: string, refreshToken: string }> {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        email: data.email,
      },
    });
    if (!admin) {
      throw new Error('Admin does not exist');
    }
    if (!bcrypt.compareSync(data.password, admin.password)) {
      throw new Error('Invalid password');
    }
    
    // create a refresh token id
    const refreshTokenId = crypto.randomBytes(24).toString('hex');

    // create an access token id
    const accessTokenId = crypto.randomBytes(24).toString('hex');

    // create jwt token
    const accessToken = this.jwtService.sign({ id: admin.id, email: admin.email, role: admin.role, accessTokenId }, {
      secret: config.ADMIN_JWT_SECRET,
      expiresIn: '8h',
    });
    if (!accessToken) {
      throw new Error('Error creating token');
    }

    // create refresh token
    const refreshToken = this.jwtService.sign({ id: admin.id, email: admin.email, role: admin.role, refreshTokenId }, {
      secret: config.ADMIN_JWT_SECRET,
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  async register(data: RegisterAdminDto): Promise<{ token: string }> {
    const admin = await this.getAdminByEmail(data.email);
    if (admin) {
      throw new Error('Admin already exists');
    }

    // create random 24 character token using crypto.randomBytes(24).toString('hex')
    const token = crypto.randomBytes(24).toString('hex');
    
    
    // create admin
    await this.prismaService.admin.create({
      data: {
        email: data.email,
        name: data.name,
        role: 'ADMIN',
        passwordResetToken: token,
      },
    });
    
    // send email with token to admin email
    // sendEmail(data.email, token);

    return { token };

  }

  async forgotPasswordLink(data: ForgotPasswordDto): Promise<{ message: string }> {
    const admin = await this.getAdminByEmail(data.email);
    if (!admin) {
      throw new Error('Admin does not exist');
    }

    // create random 24 character token using crypto.randomBytes(24).toString('hex')
    const token = crypto.randomBytes(24).toString('hex');

    // update admin with token
    await this.prismaService.admin.update({
      where: {
        email: data.email,
      },
      data: {
        passwordResetToken: token,
      },
    });

    // send email with token to admin email
    // sendEmail(data.email, token);

    return { message: 'Password reset token sent to email' };
  }

  async resetPassword(data: ResetPasswordDto): Promise<{ message: string }> {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        passwordResetToken: data.token,
      },
    });
    if (!admin) {
      throw new Error('Admin does not exist');
    }

    // hash new password
    const hashedPassword = bcrypt.hashSync(data.password, 10);

    // update admin password
    await this.prismaService.admin.update({
      where: {
        email: admin.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Password reset successful' };

  }


  async changePassword(req: EReq, data: ChangePasswordDto): Promise<{ message: string }> {
    const admin = await this.prismaService.admin.findUnique({
      where: {
        email: req.admin.email,
      },
    });
    if (!admin) {
      throw new Error('Admin does not exist');
    }

    // check if token is valid
    const isValid = await bcrypt.compare(data.oldPassword, admin.passwordResetToken);
    if (!isValid) {
      throw new Error('Invalid token');
    }

    if (data.newPassword === data.oldPassword) {
      throw new Error('Passwords do not match');
    }

    // hash new password
    const hashedPassword = bcrypt.hashSync(data.newPassword, 10);

    // update admin password
    await this.prismaService.admin.update({
      where: {
        email: admin.email,
      },
      data: {
        password: hashedPassword,
      },
    });

    return { message: 'Password reset successful' };
  }
}
