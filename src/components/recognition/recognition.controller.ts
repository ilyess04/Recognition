import {
  Body,
  Controller,
  HttpStatus,
  InternalServerErrorException,
  Post,
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
import { openApiResponse } from 'src/common/decorator/openApi.decorator';
import { IRequest } from 'src/common/interfaces';

@ApiTags('recognition')
@Controller('recognition')
export class RecognitionController {
  constructor(private readonly recognitionService: RecognitionService) {}

  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  @Post('create')
  @openApiResponse(
    {
      status: HttpStatus.CREATED,
      description: 'Company created successfuly !',
    },
    {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      description: 'something went wrong!',
    },
  )
  async CreateRecogition(
    @Res() res: Response,
    @Body() body: CreateRecognitionDto,
    @Request() req: IRequest,
  ) {
    try {
      const company = await this.recognitionService.createRecognition({
        name: body.name,
        file:"",
        architecture: req.user['_id'],
      });
      return res.status(HttpStatus.CREATED).send({
        statusCode: HttpStatus.CREATED,
        company,
        message: 'Company created successfuly !',
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: err,
      });
    }
  }
}
