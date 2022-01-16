import {UserInterface} from '../../../../../common/user/user.interface';
//import {TaskAssignedInterface} from './../../../assign-task/assign-task.interface';


export interface UserAcknoledgmentInterface {
    isUnderstandTask: boolean;
    isHaveInfo: boolean;
    isStartTask: boolean;
    isDeclinedTask: boolean;
    userId: string;
    taskId: string;
    //messages?: taskMessages[];
}

export interface UserProgressReportInterface {
    isEncounterChallenge: boolean;
    comments: string;
    tentativeDate: Date;
    userId: string;
    taskId: string;
}





export interface UserMarkTaskAsComplete {
    isTaskComplete: boolean;
    userId: string;
    taskId: string;
}