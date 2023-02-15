import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AiAiPageRoutingModule } from './ai-ai-routing.module';

import { AiAiPage } from './ai-ai.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AiAiPageRoutingModule
  ],
  declarations: [AiAiPage]
})
export class AiAiPageModule {}
