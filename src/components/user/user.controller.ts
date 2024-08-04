import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
  InternalServerErrorException,
  Req,
  Get,
  UseGuards,
  Param,
  Request,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { JwtStrategy } from 'src/common/strategy/jwt.srategy';
import { AuthGuard } from '@nestjs/passport';
import { IRequest } from 'src/common/interfaces';
import { Response } from 'express';
import { ICreateUser } from 'src/common/interfaces/user';
import { CreateUserDto, UpdateUserDto } from './auth/dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('getUsers')
  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  public async getUsers(@Res() res: Response, @Request() req: IRequest) {
    try {
      const users = this.userService.getUsers(req.user['_id']);
      return res.status(HttpStatus.OK).send({
        users,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: err,
        message: 'something went wrong',
      });
    }
  }

  @Post('createUser')
  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  public async createUser(@Res() res: Response, @Body() body: CreateUserDto) {
    try {
      const user = this.userService.createUser(body);
      return res.status(HttpStatus.OK).send({
        user,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: err,
        message: 'something went wrong',
      });
    }
  }

  @Delete('deleteUser/:id')
  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  public async deleteUser(@Res() res: Response, @Param('id') id: string) {
    try {
      const user = this.userService.deleteUser(id);
      return res.status(HttpStatus.OK).send({
        user,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: err,
        message: 'something went wrong',
      });
    }
  }

  @Put('updateUser/:id')
  @UseGuards(AuthGuard('jwt'), JwtStrategy)
  public async updateUser(
    @Res() res: Response,
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
    @Request() req: IRequest,
  ) {
    try {
      const user = this.userService.updateUser({
        _id: id,
        updatedBy: req.user['_id'],
        ...body,
      });
      return res.status(HttpStatus.OK).send({
        user,
      });
    } catch (err) {
      throw new InternalServerErrorException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        errors: err,
        message: 'something went wrong',
      });
    }
  }
}
