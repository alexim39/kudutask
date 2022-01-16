import {UserInterface} from '../../common/user/user.interface';
import {TaskInterface} from './../task/task.interface';

export interface TeamInterface {
    // members
    
    _id?: string;
    creator: string;
    description?: string;
    members: Array<UserInterface>;
    name: string;
    sharedTasks?: Array<TaskInterface>;
    owner?: string;
}