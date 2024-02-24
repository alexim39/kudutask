import { Component, OnInit, Input, OnDestroy, } from '@angular/core';
import { TaskInterface } from '../../../../task.interface';
import { TaskService } from '../../../../task.service';

@Component({
  selector: 'kudutask-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss', './timeline.mobile.scss']
})
export class TimelineComponent implements OnInit {

  @Input() task: TaskInterface;

  // init countdown
  countdown: string;
  elapsed: string;

  constructor(
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
  }

  // get task duration
  taskDuration(task: TaskInterface): string {
    this.countDownToDeadline(task);
    return this.taskService.taskDuration(task);
  }

  // get remaining days to expire
  private countDownToDeadline(task: TaskInterface): void {
    const endDate: number = new Date(task.end).getTime(); // convert data string to number
    const x = setInterval(() => {
      // Get today's date and time
      const today = new Date().getTime();
      // Find the distance between now and the count down date
      const duration = endDate - today;
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(duration / (1000 * 60 * 60 * 24));
      const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((duration % (1000 * 60)) / 1000);
      // Display the result in the element with id="demo"
      this.countdown = days + 'd ' + hours + 'h ' + minutes + 'm ' + seconds + 's ';

      // If the count down is finished, write some text
      if (duration < 0) {
        clearInterval(x);
        this.countdown = `Expired`;
      }
    });
  }

  elapsedTime(task: TaskInterface) {
    const start: number = new Date(task.start).getTime();
    const end: number = new Date(task.end).getTime();
    const today = new Date().getTime();

    const durationInSec: number = end - start;
    const DurationInDays = Math.round(durationInSec / (1000 * 60 * 60 * 24));

    const outstandingInSec: number = end - today;
    const outstandingInDays = Math.floor(outstandingInSec / (1000 * 60 * 60 * 24));

    const elapsedDays = DurationInDays - outstandingInDays;

    if (DurationInDays <= 1) {
      return `Expired`;
    } else {
      if (elapsedDays > DurationInDays) {
        return `Expired since ${elapsedDays} days`;
      } else {
        if (elapsedDays <= 1) {
          return `Few moments ago `
        } else {
          return `${elapsedDays} days`;
        }
      }
    }
  }
}
