import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  ICreateRecognition,
  IEditRecognition,
} from 'src/common/interfaces/recognition';
import { Recognition } from 'src/common/mongoose/models/recognition.model';
import { RECOGNITION_PROVIDER } from 'src/config';

@Injectable()
export class RecognitionService {
  constructor(
    @Inject(RECOGNITION_PROVIDER)
    private readonly recognitionModel: Model<Recognition>,
  ) {}
  async createRecognition(payload: ICreateRecognition): Promise<Recognition> {
    return await this.recognitionModel.create(payload);
  }
  async getRecognitions(): Promise<Array<Recognition>> {
    return await this.recognitionModel
      .find({
        isDeleted: false,
        isArchived: false,
      })
      .exec();
  }
  async getRecognitionById(id: string): Promise<Recognition> {
    return await this.recognitionModel.findById(id, {
      isDeleted: false,
      isArchived: false,
    });
  }
  async deleteRecognitionById(id: string): Promise<Recognition> {
    return await this.recognitionModel.findByIdAndUpdate(
      id,
      { $set: { isArchived: true, isDeleted: true } },
      { new: true },
    );
  }
  async editRecognitionById(id: string, payload: IEditRecognition) {
    return await this.recognitionModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true },
    );
  }
}
