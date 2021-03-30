import {getRepository, Repository} from 'typeorm'
import {hash} from 'bcryptjs'
import User from '../models/User.model'

import AppError from '../errors/AppError';

interface Request{
  name:string,
  email:string,
  password:string
}

class CreateUserService{

  public async execute({name,email,password}:Request):Promise<User>{
    
    const UserRepository = getRepository(User)

    const checkUserExists = await UserRepository.findOne({
      where: { email }
    })
    
    if( checkUserExists ){
      throw new AppError("Email address already used.")
    }

    const hashedPassword = await hash(password,8)

    const user = UserRepository.create({
      name,
      email,
      password: hashedPassword
    })

    await UserRepository.save(user)
    return user
  }

}

export default CreateUserService;