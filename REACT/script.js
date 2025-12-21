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

//Array Methods

let numbersArr = [5, 10, 15, 19, 20];

//1. Filter Method

// with arrow function
let result = numbersArr.filter((num) => num > 10);

// let result = numbersArr.filter(function (num) {
//   return num > 10;
// });

console.log(result, "result");

let students = [
  { name: "Devraj", diamond: true },
  { name: "Srushti", diamond: true },
  { name: "Nikhil", diamond: true },
  { name: "Divyanshu", diamond: false },
  { name: "Debajit", diamond: false },
];

let diamondStudents = students.filter((student) => student.diamond);

// let diamondStudents = students.filter(function (student) {
//   return student.diamond;
// });

console.log(diamondStudents, "diamond Students");

//2. Map Method

let price = [15, 10, 8, 18];

let priceResult = price.map((item) => item * 0.5);

console.log(priceResult);

let products = [
  { name: "Nike Shoes", price: "3500" },
  { name: "Headphone", price: "1500" },
  { name: "Mango", price: "80" },
  { name: "LG Monitor", price: "8000" },
  { name: "MacBook Pro", price: "239000" },
];

// with return keyword
// let primeSale = products.map((item) => {
//   return {
//     name: item.name,
//     price: item.price * 0.5,
//   };
// });

let primeSale = products.map((item) => ({
  name: item.name,
  price: item.price * 0.5,
}));

console.log(products, "original products price");
console.log(primeSale, "products during prime sale");

// Reduce Method

let numbersList = [15, 10, 8, 18];

// Traditional Way
// let sum = 0;

// for (let i = 0; i < numbersList.length; i++) {
//   sum = sum + numbersList[i];
//   console.log(sum, "sum");
// }

let sumArray = numbersList.reduce((accumulator, current) => {
  console.log(accumulator, "accumulator");
  console.log(current, "current");

  return accumulator + current;
});
console.log(sumArray, "sumArray");
