interface ICreateRecognition {
  name: string;
  architecture: string;
  file: string;
}

interface IEditRecognition {
  name?: string;
  architecture?: string;
  file?: string;
}
export type { ICreateRecognition, IEditRecognition };
