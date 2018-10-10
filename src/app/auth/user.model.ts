export class User {
  constructor(
    public email: string,
    public password: string,
    public firstName?: string,
    public lastName?: string,
    public userId?: string
  ) {}
  public fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
