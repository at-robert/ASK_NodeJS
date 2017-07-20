// var p1 = {
//     name: 'Robert',
//     title: 'Mr. ',
//     city: 'Taipei',
//     get_name: function(){
//         return this.title+this.name;
//     }
// };

// var p2 = {
//     name: 'Albert',
//     title: 'Mr. ',
//     city: 'London',
//     get_name: function(){
//         return this.title+this.name;
//     }
// };

// console.log(p1.get_name());
// console.log(p2.get_name());

function Person(name, title, city){
    this.name = name;
    this.title = title;
    this.city = city;
    this.get_name = function(){
        return this.title+this.name;
    }
}

// To export the Person object for other files to use
exports.Person = Person;

var p1 = new Person('Robert','Mr. ', 'Taipei');
var p2 = new Person('Albert','Mr. ', 'London');

console.log(p1.get_name());
console.log(p2.get_name());

var fs = require('fs');

//blocking method
// var data = fs.readFileSync('./tmp.txt','utf8');
// console.log(data);

//blocking method with exception handling
try {
var data = fs.readFileSync('./tmp1.txt','utf8');
console.log(data);
} catch(err){
    console.log(err);
}

//None blocking method
// fs.readFile('./tmp.txt','utf8', function(err,data){
//     console.log(data);
// });


console.log('coming here');