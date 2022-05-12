import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
const MATERIAL_MODULES = [MatSnackBarModule, MatProgressSpinnerModule];
@NgModule({
  declarations: [],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
