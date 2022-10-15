import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import Mapper from '../utils/mapper';
import { BpiMessageAgent } from './agents/bpiMessages.agent';
import { BpiMessageStorageAgent } from './agents/bpiMessagesStorage.agent';
import { CreateBpiMessageCommandHandler } from './capabilities/createBpiMessage/createBpiMessageCommand.handler';
import { DeleteBpiMessageCommandHandler } from './capabilities/deleteBpiMessage/deleteBpiMessageCommand.handler';
import { GetBpiMessageByIdQueryHandler } from './capabilities/getBpiMessageById/getBpiMessageByIdQuery.handler';
import { UpdateBpiMessageCommandHandler } from './capabilities/updateBpiMessage/updateBpiSubjectCommand.handler';

export const CommandHandlers = [
  CreateBpiMessageCommandHandler,
  UpdateBpiMessageCommandHandler,
  DeleteBpiMessageCommandHandler,
];
export const QueryHandlers = [GetBpiMessageByIdQueryHandler];

@Module({
  imports: [CqrsModule],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
    BpiMessageAgent,
    BpiMessageStorageAgent,
    Mapper,
  ],
})
export class CommunicationModule {}