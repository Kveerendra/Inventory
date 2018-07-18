export class User {
  name: string;
  role: string;

  constructor(name = '', role = '') {
    this.name = name;
    this.role = role;
  }
}
