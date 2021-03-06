import { getRepository } from 'typeorm';
import { hash,compare } from 'bcryptjs';
import {sign} from 'jsonwebtoken'

import User from '../models/User.model';
import authConfig from '../config/auth'

import AppError from '../errors/AppError';

interface Request{
  email:string,
  password:string
}

interface Response{
  user:User,
  token:string,
}

class AuthenticateUserService{
  public async execute({email,password}:Request):Promise<Response>{
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne({
      where:{email}
    });

    if(!user){
      throw new AppError('Incorrect email or password combination.',401);
    }
    // password ------- senha inserida no body
    //user.password ----- senha criptografada

    const passwordMatched = await compare(password,user.password)

    if(!passwordMatched){
      throw new AppError('Incorrect email or password combination.',401)
    }

    const { secret,expiresIn } = authConfig.jwt

    const token = sign({},secret,{
      subject:user.id,
      expiresIn:expiresIn,
    })

    return {
      user,
      token,
    }
  } 
}

export default AuthenticateUserService;