import { Exclude, Expose } from 'class-transformer';
import { UserEntity } from '../user.entity';

export class IUser extends UserEntity {
  @Exclude({ toPlainOnly: true })
  firebaseUid: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;

  @Expose()
  username: string;

  @Expose()
  email: string;

  @Expose()
  emailVerified: boolean;

  @Exclude({ toPlainOnly: true })
  emailVerificationToken: string;

  @Expose()
  startMoney: number;

  @Exclude({ toPlainOnly: true })
  fcmToken: string;

  @Expose()
  roles: number;
}

export default IUser;
