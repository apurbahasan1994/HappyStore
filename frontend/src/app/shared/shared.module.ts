import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '@app/notification/notification.module';
import { AuthComponentWrapperComponent } from './component/auth-component-wrapper/auth-component-wrapper.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { PipesModule } from './pipes/pipes.module';
@NgModule({
  declarations: [AuthComponentWrapperComponent],
  imports: [
    CommonModule,
    NotificationModule,
    NotificationModule.forRoot(),
    FlexLayoutModule,PipesModule
  ],
  exports: [
    NotificationModule,
    AuthComponentWrapperComponent,
    PipesModule
  ]
})
export class SharedModule { }
