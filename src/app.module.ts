import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { PrismaModule } from 'src/shared/database';
import { PortfolioModule } from './areas/portfolio/module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { SkillModule } from './areas/skill/module';
import { ExperienceModule } from './areas/experience/module';
import { ProjectModule } from './areas/project/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true
    }),
    PrismaModule,
    PortfolioModule,
    SkillModule,
    ExperienceModule,
    ProjectModule
  ]
})
export class AppModule {}
