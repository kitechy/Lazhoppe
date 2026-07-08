import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductListComponent } from '../pages/product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class ProductModule {}
