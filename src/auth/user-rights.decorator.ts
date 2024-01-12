import { SetMetadata } from '@nestjs/common';

export const UserRights = (...rights: string[]) =>
  SetMetadata('user_rights', rights);
