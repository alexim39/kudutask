import {UserInterface} from '../../common/user/user.interface';
import {AssignTaskInterface} from './assign/assign.interface';

export interface TaskInterface {
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
    assigned?: AssignTaskInterface;
    progress?: any;
    messages?: any;
    
}
