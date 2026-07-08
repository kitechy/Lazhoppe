import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { InboxComponent } from './inbox/inbox.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [InboxComponent],
  imports: [CommonModule, MessagesRoutingModule, FormsModule],
})
export class MessagesModule {}
