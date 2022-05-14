import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaskPopupComponent } from './new-task-popup.component';

describe('NewTaskComponent', () => {
  let component: NewTaskPopupComponent;
  let fixture: ComponentFixture<NewTaskPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewTaskPopupComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTaskPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
