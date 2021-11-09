import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from ".prisma/client";

const AuthUser = createParamDecorator((_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const user =request.user as User;
    delete user.password;
    return user;
});


export default AuthUser