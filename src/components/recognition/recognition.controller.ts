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
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RecognitionService } from './recognition.service';
import { Response } from 'express';
import { CreateRecognitionDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/strategy/jwt.srategy';
import { IRequest } from 'src/common/interfaces';

@ApiTags('recognition')
@Controller('recognition')
export class RecognitionController {
  constructor(private readonly recognitionService: RecognitionService) {}

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Post('create')
  async createRecognition(
    @Res() res: Response,
    @Body() body: CreateRecognitionDto,
    @Request() req: IRequest,
  ) {
    try {
      const recogition = await this.recognitionService.createRecognition({
        name: body.name,
        file: '',
        architecture: req.user['_id'],
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
  async updateRecognition(
    @Res() res: Response,
    @Body() body: CreateRecognitionDto,
    @Request() req: IRequest,
    @Param('id') id: string,
  ) {
    try {
      const recognition = await this.recognitionService.editRecognitionById(
        id,
        {
          name: body.name,
          file: '',
          architecture: req.user['_id'],
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
