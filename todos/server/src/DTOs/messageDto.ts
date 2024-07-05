export class MessageDto {
  message: string;

  //getters and setters
  getMessage(): string {
    return this.message;
  }

  setMessage(message: string) {
    this.message = message;
  }
}
