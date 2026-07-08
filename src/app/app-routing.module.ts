import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./features/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'store-owner',
    loadChildren: () =>
      import('./features/store-owner/store-owner.module').then(
        (m) => m.StoreOwnerModule,
      ),
  },
  {
    path: 'messages',
    loadChildren: () =>
      import('./features/messages/messages.module').then(
        (m) => m.MessagesModule,
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
