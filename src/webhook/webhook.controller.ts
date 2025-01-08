import { Controller, Post, Body, RawBodyRequest, Req, Logger, HttpStatus } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Webhook } from 'svix';
import { IncomingHttpHeaders } from 'http';

@Controller('webhook')
export class WebhookController {
  private readonly webhookSecret: string;
  constructor(
    private readonly webhookService: WebhookService,
    private configService: ConfigService
  ) {
    // Access the configuration value
    this.webhookSecret = this.configService.get<string>('WEBHOOK_SECRET');
  }

  private normalizeHeaders(headers: IncomingHttpHeaders): Record<string, string> {
    const normalizedHeaders: Record<string, string> = {};
    for (const key in headers) {
      if (headers[key]) {
        normalizedHeaders[key] = Array.isArray(headers[key]) ? headers[key].join(',') : headers[key]!;
      }
    }
    return normalizedHeaders;
  }

  @Post('register')
  create(@Req() request: RawBodyRequest<Request>) {
    const payload = request.rawBody.toString('utf8');
    const headers = this.normalizeHeaders(request.headers);
    const wh = new Webhook(this.webhookSecret);
    try {
      const { type, ...event }: any = wh.verify(payload, headers);
      Logger.log('Webhook Type', type);
      if (type === 'user.created') {
        const { email_addresses, profile_image_url, primary_email_address_id, id, last_sign_in_at } = event.data;
        const { email_address } = email_addresses.find((email) => email.id === primary_email_address_id);
        Logger.log('Webhook event data', email_address, id);
        this.webhookService.create({
          id,
          email: email_address,
          lastLogin: new Date(last_sign_in_at),
          avatar: profile_image_url
        });
      }
      return { statusCode: HttpStatus.OK, message: 'Success' };
    } catch (error) {
      Logger.error('Error verifying webhook', error);
      return error;
    }
  }
}
