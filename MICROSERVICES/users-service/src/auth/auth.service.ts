import { HttpException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService,
    private jwt: JwtService
  ){}

  async login(createAuthDto: CreateAuthDto) {
    console.log("auth login processing... " + JSON.stringify(createAuthDto));
    let {user_name, password} = createAuthDto;
    // const hashPass = bcrypt.hash(password, 10);
    // let check = await bcrypt.compare(password, user.password);
  
    if(!password){
      const otp = this.generateOTP();
      console.log(createAuthDto.user_name,"user_name");
      const userResponse = await this.prisma.users.findFirst({
        where: {
          user_name: createAuthDto.user_name,
        },
      });
      console.log(userResponse,"-- user findMany");
      if(!userResponse){
        try {
          await this.prisma.users.create({
            data:{
              user_id: randomUUID(),
              user_name:createAuthDto.user_name,
              full_name: '',
              password: otp,
              email: '',
              phone: ''
            }
          })
        return this.sendOTP(user_name, otp);
        } catch (error) {
          return {
            errorCode: "AUTH_001",
            errorMessage: "Error happen while try to login:" + error
          }
        }
      }else{
        try {
          console.log(userResponse,"userResponse[0]");
          await this.prisma.users.update({
            where: {
              user_id: userResponse.user_id,
              user_name: userResponse.user_name,
            },
            data:{
              password: otp
            }
          })
          return this.sendOTP(user_name, otp);
        } catch (error) {
          return {
            errorCode: "AUTH_002",
            errorMessage: "Error happen while try to login:" + error
          }
        }
      }
    }

    try {
      const user = await this.prisma.users.findFirst({
        where: {user_name,password}
      });
      if(user){
        
        await this.prisma.users.update({
          where: {user_id: user.user_id},
          data:{
            password:""
          }
        })

        return {
          message: "success",
          errorCode: "0",
          data:{
            user_id: user.user_id,
            user_name: user.user_name,
            token: this.jwt.sign(user, {algorithm:"HS256"}),//h/m/n/y/d/number
            refresh_token: ""
          }
        }
      }
      else
        return `Username or OTP is not correct!!!`;
    } catch (error) {
      throw new HttpException("Sign up error :: " , error);
    }
    
  }

  async signUp(createAuthDto: CreateAuthDto) {
    const hashPass = bcrypt.hash(createAuthDto.password, 10);
    const obj = {
      user_id: randomUUID(),
      user_name: createAuthDto.user_name,
      password: createAuthDto.password,
      full_name: createAuthDto.full_name,
      email: '',
      phone: ''
    }

    console.log(obj,"user sign up");
    try {
      const user = await this.prisma.users.create({
        data: obj
      });
      if(user)
        return {
            message: "success",
            errorCode: "0",
            data: user
        }
      else
        return {
          message: "Sign up unsuccess!!",
          errorCode: "101",
          data: user
       }
    } catch (error) {
      console.log(error,"error");
      return {
        message: error,
        errorCode: "-1",
        data: createAuthDto
     }
    }
    
  }

  async sendOTP(phoneNumber: string, otp: string){
    return `Your OTP is: ${otp}`;
  }

  // Generate a random 6-digit OTP
  generateOTP(): string {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    return otp;
  }
}
