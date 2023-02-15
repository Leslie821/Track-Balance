import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AiAiPage } from './ai-ai.page';

const routes: Routes = [
  {
    path: '',
    component: AiAiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AiAiPageRoutingModule {}
