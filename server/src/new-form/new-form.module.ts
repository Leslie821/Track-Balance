/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';

import { NewFormController } from './new-form.controller';
import { NewFormService } from './new-form.service';

@Module({
  controllers: [NewFormController],
  providers: [NewFormService],
})
export class NewFormModule {}
