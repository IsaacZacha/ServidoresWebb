import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AppController } from './app.controller';
import { AppService } from './app.service';

// Servicios
import { JsonDataService } from './services/json-data.service';
import { AsientoService } from './services/asiento.service';

// Resolvers GraphQL
import { AsientoResolver } from './resolvers/asiento.resolver';
import { TipoEntradaResolver } from './resolvers/tipo-entrada.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }) => ({ req }),
    }),
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    JsonDataService,
    AsientoService,
    AsientoResolver,
    TipoEntradaResolver
  ],
})
export class AppModule {}
