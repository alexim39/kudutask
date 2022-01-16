export interface ChatInterface {
    message: string;
    sentTime: Date;
    user: string;
    owner?: string;
}

export interface UserTaskMsgInterface {
    chatMsg: string;
    userId: string;
    taskId: string;
}