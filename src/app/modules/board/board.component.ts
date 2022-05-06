import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { IColumn } from '../core/model/http.model';
import { BoardService } from '../core/services/board.service';
import { HttpService } from '../core/services/http.service';
import { BoardDataService } from './services/board-data.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public idBoard: string = '';

  private count: number = 1;

  public columns?: IColumn[];

  constructor(
    public boardDataService: BoardDataService,
    private route: ActivatedRoute,
    public boardService: BoardService,
    private httpService: HttpService,
  ) {}

  public ngOnInit(): void {
    this.idBoard = this.route.snapshot.params['id'];
    this.boardDataService.getAllColumn(this.idBoard);

    this.boardService.updateBoardById(this.idBoard);
    this.httpService.getBoardsId(this.idBoard).subscribe((value) => console.log('value', value));
    // this.boardDataService.orderColumns!==0?this.count=this.boardDataService.orderColumns:this.count=0
  }

  public addColumn(): void {
    this.httpService
      .postColumns(this.idBoard, { title: 'task', order: this.count++ })
      .pipe(take(1))
      .subscribe();
    // this.httpService.deleteColumns(this.idBoard,'fb5907fd-d479-43e9-89b5-b8cf3f753672').subscribe()
    this.boardDataService.getAllColumn(this.idBoard);
  }
}
