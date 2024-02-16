export interface ICreateModel {
  newModelId: number;
  newChatRoomId: number;
  userSend: { id: number; message: string };
  modelAnswer: { id: number; message: string };
}
