import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { BpiSubjectDto } from '../../api/dtos/response/bpiSubject.dto';
import { BpiSubjectRepository } from '../../persistence/bpiSubjects.repository';
import { GetBpiSubjectByIdQuery } from './getBpiSubjectById.query';

@QueryHandler(GetBpiSubjectByIdQuery)
export class GetBpiSubjectByIdQueryHandler
  implements IQueryHandler<GetBpiSubjectByIdQuery>
{
  constructor(private readonly repo: BpiSubjectRepository) {}

  async execute(query: GetBpiSubjectByIdQuery) {
    const bpiSubject = await this.repo.getBpiSubjectById(query.id);

    if (!bpiSubject) {
      throw new NotFoundException(
        `Bpi Subject with id: ${query.id} does not exist.`,
      );
    }

    return {
      // TODO: Write generic mapper domainObject -> DTO
      id: bpiSubject.id,
      name: bpiSubject.name,
      desc: bpiSubject.description,
      publicKey: bpiSubject.publicKey,
    } as BpiSubjectDto;
  }
}
