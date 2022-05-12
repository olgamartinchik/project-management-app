import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ColumnModel } from 'src/app/modules/core/models/column.model';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() public columnData!: ColumnModel;
}
