import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FireStoreService } from 'src/services/firestore.service';

@Controller('firestore/users')
export class FireStoreController {
  constructor(private readonly service: FireStoreService) {}

  @Get()
  async getUsers(): Promise<any[]> {
    return this.service.getUsers();
  }

  @Get('/:id')
  async getUser(@Param('id') id: string): Promise<any> {
    const data = await this.service.getUser(id);

    if (data) return data;

    return { error: 'No Data Found' };
  }

  @Post()
  async addUser(@Body() body: any) {
    await this.service.addUser(body);
    return { message: 'Document added successfully' };
  }

  @Delete('/:id')
  async deleteDocument(@Param('id') id: string): Promise<any> {
    await this.service.deleteUser(id);
    return { message: 'User deleted successfully' };
  }

  @Put('/:documentId')
  async updateDocument(
    @Param('documentId') id: string,
    @Body() body: any,
  ): Promise<any> {
    await this.service.updateUser(id, body);
    return { message: 'User updated successfully' };
  }
}
