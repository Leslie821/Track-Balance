import { Module } from '@nestjs/common';
import { SelectDateController } from './select-date.controller';
import { SelectDateService } from './select-date.service';

@Module({
  controllers: [SelectDateController],
  providers: [SelectDateService]
})
export class SelectDateModule {}
