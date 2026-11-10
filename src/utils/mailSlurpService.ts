import { MailSlurp } from 'mailslurp-client';

export class MailSlurpService {
  private mailslurp: MailSlurp;

  constructor(apiKey: string) {
    if (!apiKey) throw new Error('MAILSLURP_API_KEY is missing.');
    this.mailslurp = new MailSlurp({ apiKey });
  }

  async createTestEmail() {
    const inbox = await this.mailslurp.createInbox();
    return {
      inboxId: inbox.id,
      emailAddress: inbox.emailAddress,
      startTime: new Date(),
    };
  }
  
  async getVerificationLink(inboxId: string, startTime: Date): Promise<string> {
      const email = await this.mailslurp.waitController.waitForLatestEmail({
        inboxId,
        since: startTime,
        timeout: 30_000,
        unreadOnly: true,
      });

      if (!email.body) {
        throw new Error('Received email body is empty.');
      }
      const linkMatches = email.body.match(/https?:\/\/[^\s"'<>]+/g);
      const verificationLink = linkMatches?.find(
        (url) => url.includes('/onboarding/confirmation')
      );

      if (!verificationLink) {
        throw new Error('Could not locate verification link inside the email body.');
      }
      return verificationLink;
    };  
};
