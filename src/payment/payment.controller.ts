import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentDto } from './dto/payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  async createPayment(@Body() dto: PaymentDto){
    return this.paymentService.payment(dto)
  }

  @HttpCode(200)
  @Post('status')
  async getPaymentStatus(@Body() dto: PaymentStatusDto) {
    return this.paymentService.paymentStatus(dto)
  }

}
