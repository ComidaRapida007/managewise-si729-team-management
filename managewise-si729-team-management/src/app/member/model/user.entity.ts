export class User {
  id: number;
  name: string;
  age: number;
  address: string;
  phone: string;
  teamId: number;
  role: string;
  tasks: number;
  completed: number;
  image: string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.age = 0;
    this.address = '';
    this.phone = '';
    this.teamId = 0;
    this.role = '';
    this.tasks = 0;
    this.completed = 0;
    this.image = '';
  }
}
