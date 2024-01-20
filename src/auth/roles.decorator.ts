import { SetMetadata } from '@nestjs/common';
import { UserRights } from 'src/user/user.entity';

export const Roles = (roles: UserRights[]) => SetMetadata('roles', roles);
