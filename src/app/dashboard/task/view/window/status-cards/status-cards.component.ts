import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { TaskInterface } from '../../../task.interface';
import { TaskService } from '../../../task.service';

@Component({
  selector: 'kudutask-status-cards',
  templateUrl: './status-cards.component.html',
  styleUrls: ['./status-cards.component.scss', './status-cards.mobile.scss']
})
export class StatusCardsComponent implements OnInit {

  @Input() task: TaskInterface;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    //console.log(this.task)
  }

  // return task progress status in percentage
  getTaskStatusPercentage(task: TaskInterface): string {
    return this.taskService.taskPercentage(task) + '%';
  }

}
