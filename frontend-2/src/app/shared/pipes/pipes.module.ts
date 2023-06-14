import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasFormErrorPipe } from './has-form-error.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [HasFormErrorPipe],
    exports:[
        HasFormErrorPipe
    ]
})
export class PipesModule {}
