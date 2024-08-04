import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { ICreateUser, IEditUser } from 'src/common/interfaces/user';
import { User } from 'src/common/mongoose/models/user.model';
import { USER_PROVIDER } from 'src/config';

@Injectable()
export class UserService {
  constructor(@Inject(USER_PROVIDER) private readonly userModel: Model<User>) {}
  async getUserByMail(email: string): Promise<User> {
    return await this.userModel.findOne({
      email,
      isArchived: false,
      isDeleted: false,
    });
  }
  async getUserById(id: string): Promise<User> {
    return this.userModel.findById(id, { isDeleted: false, isArchived: false });
  }
  async updateUser(user: IEditUser): Promise<User> {
    return await this.userModel
      .findByIdAndUpdate(
        user._id,
        {
          $set: { ...user },
        },
        { new: true },
      )
      .exec();
  }
  async createUser(payload: ICreateUser): Promise<User> {
    return await new this.userModel(payload).save();
  }
  async deleteUser(id: string): Promise<User> {
    return await this.userModel.findByIdAndUpdate(
      id,
      { $set: { isArchived: true, isDeleted: true } },
      { new: true },
    );
  }
  async getUsers(myId: string): Promise<Array<User>> {
    return await this.userModel.find({
      _id: { $ne: myId },
      isDeleted: false,
      isArchived: false,
    }).exec();
  }
  
}
