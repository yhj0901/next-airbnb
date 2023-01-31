/**
 * users.json에 저장된 유저 타입
 */
export type StoredUserType = {
  id: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthday: string;
  profileImage: string;
};

export type UserType = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  birthday: string;
  profileImage: string;
};
