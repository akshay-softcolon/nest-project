import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import config from 'config';    
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    const token = request.headers.authorizations;
    if (!token) {
      response.status(401).send('Unauthorized');
      return false;
    }

    try {
        // verify token
        const decoded = this.jwtService.verify(token, { secret: config.ADMIN_JWT_SECRET });
        
        if (!decoded) {
            response.status(401).send('Unauthorized');
            return false;
        }

        // get admin
        const admin = await this.prismaService.admin.findUnique({
            where: {
                id: decoded.id,
            },
        });

        if (!admin) {
            response.status(401).send('Unauthorized');
            return false;
        }

        request.admin = admin;
        return true;
        // return this.validateRequest(request);
    } catch (error) {
        response.status(401).send('Unauthorized');
        return false;
    }
  }
}
