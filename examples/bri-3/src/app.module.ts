import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CommunicationModule } from './bri/communication/communication.module';
import { IdentityModule } from './bri/identity/identity.module';
import { TransactionModule } from './bri/transactions/transactions.module';
import { ZeroKnowledgeProofModule } from './bri/zeroKnowledgeProof/zeroKnowledgeProof.module';
import { WorkgroupsModule } from './bri/workgroup/workgroup.module';
import { LoggingModule } from './shared/logging/logging.module';
import { BlockchainService } from '../src/bri/zeroKnowledgeProof/components/blockchain/blockchain.service';

@Module({
  imports: [
    IdentityModule,
    WorkgroupsModule,
    TransactionModule,
    CommunicationModule,
    ZeroKnowledgeProofModule,
    LoggingModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [PrismaService, BlockchainService],
})
export class AppModule {}
