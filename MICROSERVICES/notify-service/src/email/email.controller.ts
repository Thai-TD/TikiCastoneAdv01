import { Controller, Headers, UseGuards } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';
import { JwtAuthGuard } from 'src/auth/jwt.auth.guard';
import { authorize } from 'passport';

// @UseGuards(JwtAuthGuard)
@Controller()
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @MessagePattern('sendEmail')
  sendEmail(@Payload() data) {
    return this.emailService.sendEmail(data);
  }

  @MessagePattern('sendEmail1')
  sendEmail1(@Payload() data) {
    console.log("hello from sendemail1")
    return this.emailService.sendEmail(data);
  }
}
