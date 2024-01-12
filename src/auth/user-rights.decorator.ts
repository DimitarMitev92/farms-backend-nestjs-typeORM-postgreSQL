import { SetMetadata } from '@nestjs/common';

export const UserRightsDec = (...rights: string[]) =>
  SetMetadata('user_rights', rights);
