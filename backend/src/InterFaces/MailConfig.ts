export interface MailSendConfig {
    from: string,
    to: string,
    content?: string,
    subject?: string,
    text?: string
}