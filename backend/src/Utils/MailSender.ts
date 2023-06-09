import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { MailSendConfig } from '../InterFaces/MailConfig';

export class MailSneder {

    private static createTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
        let transporter = nodemailer.createTransport({
            host: 'smtp:ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'liliane.gerhold59@ethereal.email',
                pass: 'PbsbwTWPmJPGXKXyNt'
            }
        });
        return transporter;

    }

    static async sendMail(config: MailSendConfig) {
        await MailSneder.createTransport().sendMail({
            from: config.from, // sender address
            to: config.to, // list of receivers
            subject: config.subject, // Subject line
            text: config.text, // plain text body
            html: config.content, // html body
        });
    }
}