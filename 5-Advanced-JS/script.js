///////////////////////
//Old Ways
/*
var john = {
    name: 'John',
    yearOfBirth: 1990,
    job: 'teacher'
};
*/

/*
///////////////////////
// Constructors

//constructors should start with capital letter
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
};

//method is in prototype property but not in constructor.
//still used by all Persons;
Person.prototype.calculateAge = function() {
        console.log(2018-this.yearOfBirth);
    };

Person.prototype.being = 'Human';

var john = new Person('John', 1990, 'teacher');

var jane = new Person('Jane', 2000, 'designer');

var mark = new Person('Mark', 1943, 'retired');

john.calculateAge();

jane.calculateAge();

mark.calculateAge();

console.log(john.being);

console.log(jane.being);

console.log(mark.being);

console.log(john);

console.log(Person);
*/


/*
///////////////////////
// Object.create

var personProto = {
    calculateAge: function() {
        console.log(2018 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);

john.name='John';
john.yearOfBirth=1990;
john.job='teacher';


var jane = Object.create(personProto,
{
    name: { value: 'Jane' },
    yearOfBirth: { value: '1995' },
    job: { value: 'designer' }

});

console.log(jane);

*/




/*
///////////////////////
// Primitives vs Objects


//Primitives
var a = 23;
var b = a;
a = 46;
console.log(a);
console.log(b);



// Objects
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1; //pointers to the obj1
obj1.age = 30;
console.log(obj1.age);
console.log(obj2.age);


// Functions
var age = 27;
var obj = {
    name: 'Zane',
    city: 'Lubbock'
};

function change(a,b) {
    a = 30; //does not change. Used as a copy of original a.
    b.city = 'Lisbon'; //does change using pointer to object info.
}

change(age, obj);

console.log(age);
console.log(obj.city);
*/

/*
///////////////////////
// Functions

//Functions are an instance of the Object type.
//First-Class functions



var years = [1990, 1975, 1985, 2003, 2007, 2013];

//passing functions as arguments for other functions
function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i=0; i<arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }
    return arrRes;
}

function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el>=18 && el<=81) {
        return Math.round(206.9 - (0.67 * el));
    }
    else {
        return NaN;
    }
}

var ages = arrayCalc(years, calculateAge);

var fullAges = arrayCalc(ages, isFullAge);

var maxHeartRates = arrayCalc(ages, maxHeartRate);

console.log(ages);
console.log(fullAges);
console.log(maxHeartRates);

//functions returning other functions

function interviewQuestion(job) {
    if (job === 'designer') {
        return function(name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    } else if (job === 'teacher') {
        return function(name) {
            console.log('What subject do you teach, ' + name + '?');
        }
    } else if (job === 'developer') {
        return function(name) {
            console.log(name + ', are you proficient with JavaScript objects?');
        }
    } else {
        return function(name) {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var designerQuestion = interviewQuestion('designer');
var teacherQuestion = interviewQuestion('teacher');
var developerQuestion = interviewQuestion('developer');
var defaultQuestion = interviewQuestion('def');

teacherQuestion('John');
designerQuestion('Jane');
developerQuestion('Zane');
defaultQuestion('Jarod');

interviewQuestion('teacher')('Mark');
*/

/*
///////////////////////
// Immediately Invoked Function Expressions : IIFE


function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}
game();


// IIFE
// used for data privacy

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodLuck) {
    var score = Math.random() * 10;
    console.log(score >= (5 - goodLuck));
})(5);

*/


/*
///////////////////////
// Closures

function retirement(retirementAge) {
    var a = ' years left until retirement.';
    return function(yearOfBirth) { //anonymous function
        var age = 2018 - yearOfBirth;
        console.log((retirementAge - age)  + a);
    }
}

var retirementGermany = retirement(65);
var retirementIceland = retirement(67);
var retirementUs = retirement(66);

retirementGermany(1990);
retirementIceland(1990);
retirementUs(1990);


function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } 
        else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } 
        else if (job === 'developer') {
            console.log(name + ', are you proficient with JavaScript objects?');
        } 
        else {
            console.log('Hello ' + name + ', what do you do?');
        }
    }
}

interviewQuestion('teacher')('John');

*/

/*
///////////////////////
// Bind Call and Apply

var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ' ladies and gentlemen! I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'casual'){
            console.log('What\'s up? I\'m ' + this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};


var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};



john.presentation('formal', 'morning');

//CALL: method borrowing. this->emily
john.presentation.call(emily, 'casual', 'afternoon');

//APPLY
//john.presentation.apply(emily, ['casual', 'evening']);

//BIND
//generates a copy of the function and stored elsewhere.
//allows presetting of arguments for functions.
//creating a more restricted version of a previous function
var johnFriendly = john.presentation.bind(john, 'casual');
johnFriendly('evening');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('morning');
*/






















