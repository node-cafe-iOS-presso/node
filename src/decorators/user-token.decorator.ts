import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @summary Header에서 사용자 Token 추출하는 함수
 * @author  이강욱
 */
export const UserToken = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.user_id;
  },
);
