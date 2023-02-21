import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../enums/common.enum';

export const ROLE = 'ROLE';

export const Role = (role?: UserRole) => SetMetadata(ROLE, role);
