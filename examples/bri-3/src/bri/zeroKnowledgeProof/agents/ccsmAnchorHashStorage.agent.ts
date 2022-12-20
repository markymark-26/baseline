import { Injectable } from '@nestjs/common';
import { BlockchainService } from '../services/blockchain/blockchain.service';

import { CCSMAnchorHash } from '../models/ccsmAnchorHash';

@Injectable()
export class CCSMAnchorHashStorageAgent {
  constructor(private readonly storageAgent: BlockchainService) {}

  async storeAnchorHashOnCCSM(CCSMAnchorHash: CCSMAnchorHash): Promise<void> {
    await this.storageAgent.write(CCSMAnchorHash.hash);
  }

  async getAnchorHashFromCCSM(
    publicInputForProofVerification: string,
  ): Promise<string> {
    const CCSMAnchorHash = await this.storageAgent.read(
      publicInputForProofVerification,
    );
    return CCSMAnchorHash;
  }
}
