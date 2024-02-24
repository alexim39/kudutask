import { TaskInterface } from './task.interface';

export class TaskClass {

    constructor() { }

    // get task percentage
    taskPercentage(task: TaskInterface): string {

        const start: number = new Date(task.start).getTime();
        const end: number = new Date(task.end).getTime();
        const today: number = new Date().getTime();

        let timeline: number = end - start;
        let deadline: number = end - today;

        //console.log(timeline);
        //console.log(deadline);

        if (deadline <= 0) return '100';
        if (timeline <= 0) return '0';
        const percentageLeft = (deadline / timeline) * 100;
        return (percentageLeft).toFixed(0);
    }

    // task duration
    taskDuration(task: TaskInterface): string {
        const start: number = new Date(task.start).getTime();
        const end: number = new Date(task.end).getTime();
        const noOfDaysInSec: number = end - start;
        const duration = Math.round(noOfDaysInSec / (1000 * 60 * 60 * 24));

        if (duration <= 1) {
            return duration + ' day';
        } else {
            return duration + ' days';
        }
    }

    // task count down to days ot expire
    daysToExpire(task: TaskInterface): string {
        const today: number = new Date().getTime();
        const end: number = new Date(task.end).getTime();
        const noOfDaysInSec: number = end - today;
        const noOfDays: number = Math.round(noOfDaysInSec / (1000 * 60 * 60 * 24));

        if (noOfDays === 1) {
            return `Expires in ${noOfDays} day`;
        } else if (noOfDays < 1 && noOfDays == 0) {
            return 'Expires in few moments'
        } else if (noOfDays <= 0) {
            return 'Expired';
        } else {
            return `Expires in ${noOfDays} days`;
        }
    }
}