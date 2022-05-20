import { Message } from '../interfaces';
import { NewMessage } from '../interfaces/NewMessage';

class Chat {
  private chat: Message[];

  constructor() {
    this.chat = [];
  }

  public addMessage = ({ email, message }: NewMessage): void => {
    const date = new Date();
    const time = date.toLocaleTimeString();
    const dateString = date.toLocaleDateString('es-ES');

    this.chat.push({
      email,
      message,
      time,
      dateString,
    });
  };

  public getAllMessages(): Message[] {
    return this.chat;
  }
}

export default new Chat();
