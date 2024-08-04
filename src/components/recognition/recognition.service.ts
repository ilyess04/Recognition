import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICreateRecognition } from 'src/common/interfaces/recognition';
import { Recognition } from 'src/common/mongoose/models/recognition.model';
import { RECOGNITION_PROVIDER } from 'src/config';

@Injectable()
export class CompanyService {
  constructor(
    @Inject(RECOGNITION_PROVIDER)
    private readonly recognitionModel: Model<Recognition>,
  ) {}
  async createRecognition(payload: ICreateRecognition): Promise<Recognition> {
    return await this.recognitionModel.create(payload);
  }
}
