import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../../../prisma/prisma.service';
import { NOT_FOUND_ERR_MESSAGE } from '../api/err.messages';
import { Workstep } from '../models/workstep';
import { LoggingService } from '../../../../../src/shared/logging/logging.service';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

// Storage Agents are the only places that talk the Prisma language of models.
// They are always mapped to and from domain objects so that the business layer of the application
// does not have to care about the ORM.
@Injectable()
export class WorkstepStorageAgent extends PrismaService {
  constructor(
    @InjectMapper() private readonly mapper: Mapper,
    private log: LoggingService,
  ) {
    super();
  }

  async getWorkstepById(id: string): Promise<Workstep> {
    const workstepModel = await this.workstep.findUnique({ where: { id } });

    if (!workstepModel) {
      this.log.logError(NOT_FOUND_ERR_MESSAGE);
      throw new NotFoundException(NOT_FOUND_ERR_MESSAGE);
    }

    return this.mapper.map(workstepModel, Workstep, Workstep) as Workstep;
  }

  async getAllWorksteps(): Promise<Workstep[]> {
    const workstepModels = await this.workstep.findMany();
    return workstepModels.map((workstepModel) => {
      return this.mapper.map(workstepModel, Workstep, Workstep) as Workstep;
    });
  }

  async getMatchingWorkstepsById(ids: string[]): Promise<Workstep[]> {
    const workstepModels = await this.workstep.findMany({
      where: {
        id: { in: ids },
      },
    });
    return workstepModels.map((w) => {
      return this.mapper.map(w, Workstep, Workstep) as Workstep;
    });
  }

  async createNewWorkstep(workstep: Workstep): Promise<Workstep> {
    const newWorkstepModel = await this.workstep.create({
      data: workstep,
    });
    return this.mapper.map(newWorkstepModel, Workstep, Workstep) as Workstep;
  }

  async updateWorkstep(workstep: Workstep): Promise<Workstep> {
    const updatedWorkstepModel = await this.workstep.update({
      where: { id: workstep.id },
      data: workstep,
    });
    return this.mapper.map(
      updatedWorkstepModel,
      Workstep,
      Workstep,
    ) as Workstep;
  }

  async deleteWorkstep(workstep: Workstep): Promise<void> {
    await this.workstep.delete({
      where: { id: workstep.id },
    });
  }
}
