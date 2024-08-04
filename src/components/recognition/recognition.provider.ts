import { Connection } from 'mongoose';
import { DB_PROVIDER, RECOGNITION_PROVIDER } from '../../config';
import { COMPANY } from 'src/common/mongoose/consts/consts';
import { RecognitionSchema } from 'src/common/mongoose/models/recognition.model';

export const RecognitionProvider = [
  {
    provide: RECOGNITION_PROVIDER,
    useFactory: (connection: Connection) =>
      connection.model(COMPANY, RecognitionSchema),
    inject: [DB_PROVIDER],
  },
];
