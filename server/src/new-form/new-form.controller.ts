/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { NewFormService } from './new-form.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('newForm')
export class NewFormController {
  constructor(private newFormService: NewFormService) { }

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('file', 10, {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          let randomName =
            Math.random().toString(16).slice(2) +
            Math.random().toString(16).slice(2) +
            Math.random().toString(16).slice(2) +
            Math.random().toString(16).slice(2);
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    let result = await this.newFormService.PictoDb(
      files.map((file) => file.filename),
    );
    return { result };
  }

  @Post('inputToDb')
  async createNewFrom(
    @Body()
    body: {
      date: Date;
      amount: number;
      account: string;
      type: string;
      remark: string;
      id: number;
    },
  ) {

    let result = await this.newFormService.createNewFrom(body);

    return {
      result,
    };
  }
}
