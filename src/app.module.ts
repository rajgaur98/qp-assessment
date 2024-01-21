import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configurationHelper from './utils/configurationHelper';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

const NODE_ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${NODE_ENV}`, '.env'],
      isGlobal: true,
      load: [configurationHelper],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'mysql',
        host: configService.get('mysql.host'),
        port: configService.get('mysql.port'),
        username: configService.get('mysql.user'),
        password: configService.get('mysql.password'),
        database: configService.get('mysql.database'),
        autoLoadEntities: true,
      }),
      inject: [ConfigModule],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
