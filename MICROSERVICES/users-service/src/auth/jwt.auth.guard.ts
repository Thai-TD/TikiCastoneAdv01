import { CanActivate, ExecutionContext, Injectable, SetMetadata, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
// import { AuthGuard } from '@nestjs/passport';
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService, private reflector: Reflector) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {

        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
          ]);
          console.log("isPublic:: " + isPublic);
          if (isPublic) {
            console.log("isPublic condition Pass:: ");
            return true;
          }

        const data = context.switchToRpc().getData();
        // console.log("data:::" + JSON.stringify(data));
        const token = data.headers.authorization;//headers['Authorization'];
        if (!token) {
            throw new UnauthorizedException('No authorization token provided');
        }

        const user = await this.extractTokenFromHeader(token);
        console.log("xac' user::: " + JSON.stringify(user));
        if (!user) {
            throw new UnauthorizedException('Invalid authorization token');
        }

        context.switchToRpc().getData().user = user;

        return true;
    }

    private extractTokenFromHeader(token) {
        try {
            console.log("token get::: " + token.split(' ')[1]);
            return this.jwtService.verify(token.split(' ')[1]);
        } catch (error) {
            return null;
        }
    }
}