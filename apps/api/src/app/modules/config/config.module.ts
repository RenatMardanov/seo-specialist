import { KeycloakConfigService } from '@api/modules/config/keycloak/keycloak-config.service';
import { Module } from '@nestjs/common';
@Module({
  providers: [KeycloakConfigService],
  exports: [KeycloakConfigService],
})
//TODO: Переделать на динамический модуль
export class ConfigModules {
  static forRoot():
    | import('@nestjs/common').Type
    | import('@nestjs/common').DynamicModule
    | Promise<import('@nestjs/common').DynamicModule>
    | import('@nestjs/common').ForwardReference {
    throw new Error('Method not implemented.');
  }
}
