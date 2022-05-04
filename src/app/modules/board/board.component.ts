import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public id: string = '';

  private count: number = 0;

  public columns?: IColumn[];

  constructor(
    public boardDataService: BoardDataService,
    private route: ActivatedRoute,
    public boardService: BoardService,
    private httpService: HttpService,
  ) {}

  public ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.boardDataService.getAllColumn(this.id);

    this.boardService.updateBoardById(this.id);
    this.httpService.getBoardsId(this.id).subscribe((value) => console.log('value', value));
    // this.boardDataService.orderColumns!==0?this.count=this.boardDataService.orderColumns:this.count=0
  }

  public addColumn(): void {
    // this.httpService.postColumns(this.id,{title:'task',order:this.count++} ).subscribe()
    // this.httpService.deleteColumns(this.id,'dfdefc2c-60cf-4993-8a7d-d85bee52013d').subscribe()
    this.boardDataService.getAllColumn(this.id);
  }
}
