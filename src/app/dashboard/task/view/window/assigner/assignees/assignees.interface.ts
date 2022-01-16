import {UserInterface} from '../../../../../../common/user/user.interface';

export interface Task {
    // members
    _id: string;
    title: string;
    start?: Date;
    priority: string;
    modifyDate?: Date;
    end?: Date;
    description?: string;
    creator?: string;
    createDate?: Date;
    status?: string;
    completedDate?: Date;
    owner?: string;
    isOwer?: boolean;
    isArchive?: boolean;
    assignees?: UserInterface;
    assigned?: Assign;
    progress?: Progress[];
    messages?: any;
    
}


export interface Assign {
    // member property
    description?: string;
    assignedDate?: Date;
    modifyDate?: Date;
    taskId: string;
    assignees?: UserInterface[];
    emails: string[];
    
}

export interface Progress {
    // member property
    assignee: UserInterface;
    challenges: challenges;
    isDeclinedTask: boolean;
    isHaveInfo: boolean;
    isStartTask: boolean;
    isUnderstandTask: boolean;
    startDate: Date;
    taskCompleteDate: Date;
    isTaskComplete: string
    
}

 
interface  challenges {
    comments: string;
    isEncounterChallenge: boolean;
    tentativeDate: Date;
}

