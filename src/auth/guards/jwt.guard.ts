import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(private readonly usersService: UsersService) {
        super()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const valid = await super.canActivate(context)
        if (!valid) throw new UnauthorizedException()
        const payload = context.switchToHttp().getRequest().user
        const user = await this.usersService.findUserById(payload.id)
        if (user == null) throw new UnauthorizedException()
        return true
    }

}
