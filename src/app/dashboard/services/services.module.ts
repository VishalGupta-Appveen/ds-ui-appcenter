import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServicesComponent } from './services.component';
import { BeforeGuard } from 'src/app/guard/before.guard';
import { RouteGuard } from 'src/app/guard/route.guard';

const routes: Routes = [
  {
    path: ':serviceId',
    component: ServicesComponent,
    canActivateChild: [BeforeGuard],
    canActivate: [BeforeGuard],
    children: [
      { path: 'list', loadChildren: () => import('src/app/dashboard/services/list/list.module').then(m => m.ListModule) },
      { path: 'view/:recordId', loadChildren: () => import('src/app/dashboard/services/view/view.module').then(m => m.ViewModule) },
      { path: 'manage', loadChildren: () => import('src/app/dashboard/services/manage/manage.module').then(m => m.ManageModule), canDeactivate: [RouteGuard] },
      { path: 'bulk-update', loadChildren: () => import('src/app/dashboard/services/bulk-update/bulk-update.module').then(m => m.BulkUpdateModule), canDeactivate: [RouteGuard] },
      { path: 'manage/:recordId', loadChildren: () => import('src/app/dashboard/services/manage/manage.module').then(m => m.ManageModule), canDeactivate: [RouteGuard] },
      { path: 'filemapper', loadChildren: () => import('src/app/filemapper/filemapper.module').then(m => m.FilemapperModule) },
    ]
  },
  {
    path: '',
    component: ServicesComponent,
    canActivateChild: [BeforeGuard],
    canActivate: [BeforeGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ServicesComponent,
  ],
  exports: [RouterModule]
})
export class ServicesModule { }
