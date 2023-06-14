import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '@app/notification/notification.module';
import { AuthComponentWrapperComponent } from './component/auth-component-wrapper/auth-component-wrapper.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { PipesModule } from './pipes/pipes.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FileUploaderComponent } from './component/file-uploader/file-uploader.component';
import { ImageUploaderComponent } from './component/image-uploader/image-uploader.component';
import { DialogComponentComponent } from './component/dialog-component/dialog-component.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './component/confirm/confirm.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [AuthComponentWrapperComponent, FileUploaderComponent, ImageUploaderComponent, DialogComponentComponent, ConfirmComponent],
  imports: [
    CommonModule,
    NotificationModule,
    NotificationModule.forRoot(),
    FlexLayoutModule,
    PipesModule,
    EditorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    NotificationModule,
    AuthComponentWrapperComponent,
    PipesModule,
    FlexLayoutModule,
    EditorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule
  ],
  entryComponents: [
    DialogComponentComponent
  ]
})
export class SharedModule { }
