import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import Data from '../../../lib/data';
import { StoredUserType } from '../../../types/user';
import jwt from 'jsonwebtoken';
import { SingUpAPIBody } from '../../../lib/api/auth';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log('<<<<<<<<<<<<<<<<<<<<');
  if (req.method === 'POST') {
    console.log('<<<<<<<<<<<<<<<<<<<<');
    //* 값을 받았는지 확인
    const {
      body,
    }: {
      body: SingUpAPIBody;
    } = req;
    const { email, firstName, lastName, password, birthday } = body;
    if (!email || !firstName || !lastName || !password || !birthday) {
      res.statusCode = 400;
      return res.send('필수 데이터가 없습니다.');
    }

    const userExist = Data.user.exist({ email });
    if (userExist) {
      res.statusCode = 409;
      res.send('이미 가입된 이메일입니다.');
    }

    const users = Data.user.getList();
    const hashedPassword = bcrypt.hashSync(password, 8);
    let userId;
    if (users.length === 0) {
      userId = 1;
    } else {
      userId = users[users.length - 1].id + 1;
    }
    const newUser: StoredUserType = {
      id: userId,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      birthday,
      profileImage: '/static/image/user/default_user_profile_image.jpg',
    };

    Data.user.write([...users, newUser]);

    const token = jwt.sign(String(newUser.id), 'my_private_secret');
    res.setHeader(
      'Set-Cookie',
      `access_token=${token}; path=/; expires=${new Date(
        Date.now() + 60 * 60 * 24 * 1000 * 3 //3일
      ).toUTCString()}; httponly`
    );

    const newUserWithoutPassword: Partial<Pick<StoredUserType, 'password'>> =
      newUser;

    delete newUserWithoutPassword.password;
    res.statusCode = 200;
    return res.send(newUser);
  }

  res.statusCode = 405;

  return res.end();
};
