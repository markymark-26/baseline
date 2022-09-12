import { Workstep } from '../../worksteps/models/workstep';
import { IWorkgroup } from './workgroup.interface';
import { Workflow } from '../../workflows/models/workflow';
import { BpiSubject } from '../../../identity/bpiSubjects/models/bpiSubject';
import { Security } from '../../../policy/models/security';
import { Privacy } from '../../../policy/models/privacy';

export class Workgroup implements IWorkgroup {
  private id: string; // TODO: Add uuid after #491
  private name: string;
  private administrator: BpiSubject[];
  private securityPolicy: Security[]; //TODO Implement securityPolicy #485
  private privacyPolicy: Privacy[]; //TODO Implement privacyPolicy #485
  private participants: BpiSubject[];
  private worksteps: Workstep[];
  private workflows: Workflow[];

  constructor(
    id: string,
    name: string,
    administrator: BpiSubject[],
    securityPolicy: Security[],
    privacyPolicy: Privacy[],
    participants: BpiSubject[],
    worksteps: Workstep[],
    workflows: Workflow[],
  ) {
    this.id = id;
    this.name = name;
    this.administrator = administrator;
    this.securityPolicy = securityPolicy;
    this.privacyPolicy = privacyPolicy;
    this.participants = participants;
    this.worksteps = worksteps;
    this.workflows = workflows;
  }

  addParticipants(bpiSubject: BpiSubject[]): BpiSubject[] {
    throw new Error('not implemented');
  }

  getParticipants(ids?: string[]): BpiSubject[] {
    throw new Error('not implemented');
  }

  updateParticipants(id: string[], update: any[]): BpiSubject[] {
    throw new Error('Method not implemented.');
  }

  removeParticipants(ids: string[]): BpiSubject[] {
    throw new Error('not implemented');
  }

  addSecurityPolicy(securityPolicy: Security) {
    throw new Error('not implemented');
  }

  removeSecurityPolicy(securityPolicy: Security) {
    throw new Error('not implemented');
  }

  updateSecurityPolicy(id: string, ...updates: string[]) {
    throw new Error('not implemented');
  }

  addPrivacyPolicy(privacyPolicy: Privacy) {
    throw new Error('not implemented');
  }

  removePrivacyPolicy(privacyPolicy: Privacy) {
    throw new Error('not implemented');
  }

  updatePrivacyPolicy(id: string, ...updates: string[]) {
    throw new Error('not implemented');
  }

  addWorksteps(worksteps: Workstep[]): Workstep[] {
    throw new Error('not implemented');
  }

  getWorkstepsById(workstepIds: string[]): Workstep[] {
    throw new Error('not implemented');
  }

  addWorkflows(workflows: Workflow[]): Workflow[] {
    throw new Error('not implemented');
  }

  getWorkflowsById(workflowIds: string[]): Workflow[] {
    throw new Error('not implemented');
  }
}
