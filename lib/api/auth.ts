import axios from 'axios';
//* 회원가입 body
export interface SingUpAPIBody {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  birthday: string;
}

/**
 * 회원가입 api
 */
export const signupAPI = (body: SingUpAPIBody) =>
  axios.post('/api/auth/signup', body);
