// model of data sent to the backend
export interface ContactInterface {
    names: string;
    email: string;
    phone: string;
    comments: string;
}

// model of data returned from backend
export interface ContactModel {
    names: string;
    email: string;
    phone: string;
    comments: string;
    sentDate: Date
}