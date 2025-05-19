export class User {
    constructor(
      public readonly id: string,
      public email: string,
      public readonly createdAt: Date
    ) {}
  
    static create(email: string): User {
      return new User(
        crypto.randomUUID(), // ou use seu método preferido para IDs
        email,
        new Date()
      );
    }
  }