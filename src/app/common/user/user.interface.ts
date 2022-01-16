import {TeamInterface} from './../../dashboard/team/team.interface';

export interface UserInterface {
    // members
    _id: string;
    firstname: string;
    lastname?: string;
    email: string;
    isActive: boolean;

    // other members
    organization?: string;
    jobTitle?: string;
    about?: string;
    //emails?: Array<string>;
    phone?: string;
    //phones?: Array<string>;
    teams?: Array<TeamInterface>

    //getIncome(): number;
    //getIncome: () => number;
}
