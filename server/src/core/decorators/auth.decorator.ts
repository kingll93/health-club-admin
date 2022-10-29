import { SetMetadata } from '@nestjs/common';

export const NO_AUTH = 'no-auth';

/**
 * 允许 接口 不校验 token
 */
export const NoAuth = () => SetMetadata(NO_AUTH, true);
