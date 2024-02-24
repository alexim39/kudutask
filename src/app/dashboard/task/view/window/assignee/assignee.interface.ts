import {UserInterface} from '../../../../../common/user/user.interface';
//import {TaskAssignedInterface} from './../../../assign-task/assign-task.interface';


export interface UserAcknoledgmentInterface {
    isUnderstandTask: boolean;
    isHaveInfo: boolean;
    isStartTask: boolean;
    isDeclinedTask: boolean;
    userId: string;
    taskId: string;
    messages?: taskMessages[];
}

export interface UserProgressInterface {
    isEncounterChallenge: boolean;
    comments: string;
    tentativeDate: Date;
    userId: string;
    taskId: string;
}

export interface UserTaskMsgInterface {
    chatMsg: string;
    userId: string;
    taskId: string;
}

export interface taskMessages {
    message: string;
    sentTime: Date;
    user: string;
    owner?: string;
}

export interface UserMarkTaskAsComplete {
    isTaskCompleted: boolean;
    userId: string;
    taskId: string;
}