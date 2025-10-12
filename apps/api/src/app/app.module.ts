import { ConfigModules } from '@api/core/config/config.module';
import { KeycloakConfigService } from '@api/core/config/keycloak/keycloak-config.service';
import { PrismaModule } from '@api/core/database/prisma.module';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  AuthGuard,
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
} from 'nest-keycloak-connect';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    KeycloakConnectModule.registerAsync({
      useExisting: KeycloakConfigService,
      imports: [ConfigModules],
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard, //By default, it will throw a 401 unauthorized when it is unable to verify the JWT token or Bearer header is missing.
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard, //Only controllers annotated with @Resource and methods with @Scopes are handled by this guard
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard, //Permissive by default. Used by controller methods annotated with @Roles
    },
    AppService,
  ],
})
export class AppModule {}
