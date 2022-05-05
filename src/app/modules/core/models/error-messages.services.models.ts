export interface FormMessagesModel {
  [key: string]: MessageModel;
}

export interface MessageModel {
  [key: string]: string;
}

export interface PasswordMessagesModel {
  main: string;
  recommendations: string[] | null;
}
