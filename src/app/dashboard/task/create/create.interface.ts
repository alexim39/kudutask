export interface CreateTaskInterface {
    title: string;
    description?: string;
    priority: string;
    start: Date;
    end: Date;
}