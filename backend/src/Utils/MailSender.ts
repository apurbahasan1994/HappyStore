import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailSendConfig } from '../InterFaces/MailConfig';

export class MailSneder {

    private static async createTransport(): Promise<nodemailer.Transporter<SMTPTransport.SentMessageInfo>> {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'dovie.bauch6@ethereal.email',
                pass: 'TFhzDwNJMUHVX7Gq4w'
            }
        });
        return transporter;

    }

    static async sendMail(config: MailSendConfig) {
        try {
            await (await MailSneder.createTransport()).sendMail({
                from: config.from, // sender address
                to: config.to, // list of receivers
                subject: config.subject, // Subject line
                text: config.text, // plain text body
                html: config.content, // html body
            });

        }
        catch (err) {
            console.log(err)
            throw err;
        }
    }
}