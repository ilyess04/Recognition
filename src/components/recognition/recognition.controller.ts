import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Put,
  Request,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecognitionService } from './recognition.service';
import { Response, Express } from 'express';
import { CreateRecognitionDto, UpdateRecognitionDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategy/jwt.srategy';
import { IRequest } from 'src/common/interfaces';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('recognition')
@Controller('recognition')
export class RecognitionController {
  constructor(private readonly recognitionService: RecognitionService) {}

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Post('create')
  @UseInterceptors(FileInterceptor('file'))
  async createRecognition(
    @Res() res: Response,
    @Body() body: CreateRecognitionDto,
    @UploadedFile() file: any,
  ) {
    try {
      const fileUrl = `${process.env.BACKEND_LINK}/uploads/${file.filename}`;
      const recogition = await this.recognitionService.createRecognition({
        ...body,
        file: fileUrl,
      });
      return res.status(HttpStatus.CREATED).send({
        recogition,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Put('update/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateRecognition(
    @Res() res: Response,
    @Body() body: UpdateRecognitionDto,
    @UploadedFile() file: any,
    @Param('id') id: string,
  ) {
    try {
      const fileUrl = `${process.env.BACKEND_LINK}/uploads/${file.filename}`;
      const recognition = await this.recognitionService.editRecognitionById(
        id,
        {
          ...body,
          file: fileUrl,
        },
      );
      return res.status(HttpStatus.OK).send({
        recognition,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Delete('delete/:id')
  async deleteRecognition(@Res() res: Response, @Param('id') id: string) {
    try {
      const recognition = await this.recognitionService.deleteRecognitionById(
        id,
      );
      return res.status(HttpStatus.OK).send({
        recognition,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Get('getById/:id')
  async getRecognition(@Res() res: Response, @Param('id') id: string) {
    try {
      const recognition = await this.recognitionService.getRecognitionById(id);
      return res.status(HttpStatus.OK).send({
        recognition,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Get('getRecognitions')
  async getRecognitions(@Res() res: Response) {
    try {
      const recognitions = await this.recognitionService.getRecognitions();
      return res.status(HttpStatus.OK).send({
        recognitions,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }
}
