import { Controller, Get } from '@nestjs/common';
import { Public, Roles } from 'nest-keycloak-connect';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('pro')
  @Roles('pro')
  getData() {
    return this.appService.getData();
  }

  @Get('whoami')
  @Public()
  whoami(req: Request) {
    // req.user -> расшифрованный JWT; достанем клейм plan
    console.log(req);

    return { ok: true };
  }
}
