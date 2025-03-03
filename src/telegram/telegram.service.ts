import { Injectable, OnModuleInit, } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: TelegramBot;
    private AppClientUrl: string = 'https://emojitemr.ru';
    private chatIds: Set<string> = new Set(); // Для хранения уникальных chatId пользователей

    constructor(private authService: AuthService) {
        this.bot = new TelegramBot('7852379677:AAFmztC2OIgl3-uPSVRDHexTu-VJ4jFG6_c', { polling: true });
    }

    onModuleInit() {
        this.bot.onText(/\/start/, (msg) => {
            const chatId = msg.chat.id;
            this.chatIds.add(chatId.toString()); // Сохраняем chatId
            this.bot.sendMessage(chatId, "Привет! Пожалуйста, нажмите 'Поделится номером'.", {
                reply_markup: {
                    keyboard: [[{ text: "Поделиться номером", request_contact: true }]],
                    one_time_keyboard: true,
                    resize_keyboard: true,
                }
            });
        });

        this.bot.on('contact', async (msg) => {
            const chatId = String(msg.chat.id);
            const phone = msg.contact.phone_number;

            // Отправить номер телефона на сервер для сохранения в базе данных
            await this.savePhoneNumber(chatId, phone);
            
        });
    }

    private async savePhoneNumber(chatId: string, phone_number: string) {
        // Логика для сохранения номера телефона в MongoDB
        // // Например, можно сделать запрос к вашему API
        const token = await  this.authService.login({chatId, phone_number})
        const frontendUrl = `${this.AppClientUrl}/?token=${token.token}`;

        
        
       
        // Отправляем пользователю сообщение с ссылкой
        this.bot.sendMessage(chatId, `Вернитесь на сайт по этой ссылке: <a href='${frontendUrl}'>Ссылка</a>`, {parse_mode: "HTML"});
    }
}
