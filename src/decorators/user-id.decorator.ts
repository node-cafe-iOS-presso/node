import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @summary Header에서 사용자 ID 추출하는 함수
 * @author  이강욱
 */
export const UserId = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.headers.user_id;
  },
);
