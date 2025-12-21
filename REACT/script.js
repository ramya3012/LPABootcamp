// Destructuring in Javascript

let numbers = [10, 20, 30, 40, 50];

// console.log(numbers[0]);
// console.log(numbers[1]);
// console.log(numbers[2]);
// console.log(numbers[3]);
// console.log(numbers[4]);

// let first = numbers[0];
// let second = numbers[1];
// let third = numbers[2];
// let fourth = numbers[3];
// let fifth = numbers[4];

let [first, second, third, fourth, fifth] = numbers;

console.log(first, "first");
console.log(second, "second");
console.log(third, "third");

// Object Destructuring

let person = {
  name: "Rajdeep",
  age: 30,
  job: "Coding Coach",
};

// console.log(person.name);
// console.log(person.age);
// console.log(person.job);

// let person_name = person.name;
// let person_age = person.age;
// let person_job = person.job;

// console.log(person_name, "name of person");
// console.log(person_age, "age of person");

// let { name: person_name, age: person_age, job } = person;

// console.log(person_name, "name of person");
// console.log(person_age, "age of person");

let { name, age, job } = person;

console.log(name, "name of person");
console.log(age, "age of person");
