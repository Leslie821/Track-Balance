import { Controller, Post } from '@nestjs/common';
import { FilterService } from './filter.service';

@Controller('filter')
export class FilterController {
  constructor(private filterService: FilterService) { }
  @Post('/date')
  async getDate() {
    let result = await this.filterService.getDate();
    return result;
  }

  @Post('/type')
  async getType() {
    let result = await this.filterService.getType();
    return result;
  }

  @Post('/amount')
  async getAmount() {
    let result = await this.filterService.getAmount();
    return result;
  }
}
