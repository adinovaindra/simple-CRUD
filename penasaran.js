class Employee {
  sayHello(name) {
    console.log(`Hello ${name}, who is my name?`);
  }
}

class Manager extends Employee {
  constructor(lastName) {
    super();
    this.lastName = lastName;
  }

  sayHello(name) {
    console.log(`heloo ${name}, my name is  ${this.lastName}`);
  }
}

const adinova = new Employee("Adinova", "Santiego");

adinova.sayHello("Hanna");

const permana = new Manager("Indra", "Permana", "Jordan");
permana.sayHello("Hanna");
