import { Body, Controller, Post } from '@nestjs/common';
import { SelectDateService } from './select-date.service';
@Controller('selectDate')
export class SelectDateController {
  constructor(private selectDateService: SelectDateService) { }
  @Post()
  async getDateAmount(
    @Body()
    body: {
      date: object;
    },
  ) {

    let result = await this.selectDateService.getDateAmount(body.date);
    return result;
  }
}
