import {TaskInterface} from '../task.interface';
import {UserInterface} from '../../../common/user/user.interface';

export interface AssignTaskInterface {
    // member property

    description?: string;
    assignedDate?: Date;
    modifyDate?: Date;
    taskId: string;
    assignees?: string[];
    emails: string[];
    
}


export interface RemoveAssigneeInterface {
    // member property

    assigneeId: string;
    taskId: string;
    
}
