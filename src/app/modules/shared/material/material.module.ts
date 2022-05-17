import { NgModule } from '@angular/core';

import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
const MATERIAL_MODULES = [
  MatSelectModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatIconModule,
  MatInputModule,
];

@NgModule({
  declarations: [],
  imports: [...MATERIAL_MODULES],
  exports: [...MATERIAL_MODULES],
})
export class MaterialModule {}
