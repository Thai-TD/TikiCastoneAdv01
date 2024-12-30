import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ClientProxy, Payload } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller("users")
export class UsersController {

    constructor(@Inject("USERS") private users: ClientProxy){}

    @Post("login")
    async login(@Payload() body){
        console.log(body, "login processing....:: " + process.env.RABITMQ_USERS_QUEUE);
        let response = await lastValueFrom(this.users.send("authLogin", body))
        return response;
    }

    @Post("sign-up")
    async signUp(@Payload() body){
        console.log(body, "signUp processing....");
        let response = await lastValueFrom(this.users.send("authSignUp", body))
        return response;

    }

    @Get()
    async test(@Payload() body){
        console.log(body, "signUp processing....");
        // let response = await lastValueFrom(this.users.send("signUp", body))
        return "test users processing....";

    }
}