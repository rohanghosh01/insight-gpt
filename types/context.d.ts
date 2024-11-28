// @types.todo.ts
export interface IMessage {
  id?: string;
  content: string;
  role: string;
  createdAt?: string;
  chatId: string;
}
export interface IChat {
  id: string;
  title: string;
  createdAt: string;
  userId?: string;
}

export interface rootContextType {
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}
