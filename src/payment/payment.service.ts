import { Injectable } from '@nestjs/common';
import * as YooKassa from 'yookassa'
import { PaymentDto } from './dto/payment.dto';
import { PaymentStatusDto } from './dto/payment-status.dto';
import * as uuid from 'uuid'

const yooKassa = new YooKassa({
    shopId: '494690',
    secretKey:'test_XaHui2i_2Drpql5PxtalqeC4l7OK49o-0Kj8PJpi4bs'
});

@Injectable()
export class PaymentService {

    async payment(dto: PaymentDto) {
        const payment = await yooKassa.createPayment({
            amount: {
              value: dto.amount.toFixed(2),
              currency: "RUB"
            },
            payment_method_data: {
                type: "bank_card"
            },
            confirmation: {
              type: "redirect",
              return_url: "https://localhost:6368/thanks"
            },
            description: "Заказ №72"
        });
        return payment
    }
    async paymentStatus(dto: PaymentStatusDto) {

        if(dto.event !== 'payment.waiting_for_capture') return

        const payment = await yooKassa.capturePayment(dto.object.id)
        return payment
    }

}
