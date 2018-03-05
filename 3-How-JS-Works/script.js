///////////////////////////////////////
// Lecture: Hoisting


//functions
calcAge(1990);

function calcAge(year) {
    console.log(2018-year);
}

var retirement = function(year) {
    console.log(65 - (2018-year));
}

retirement(1990);




//variables

console.log(age);
var age = 23;
console.log(age);











///////////////////////////////////////
// Lecture: Scoping


// First scoping example

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        console.log(a + b + c);
    }
}
*/



// Example to show the differece between execution stack and scope chain

/*
var a = 'Hello!';
first();

function first() {
    var b = 'Hi!';
    second();

    function second() {
        var c = 'Hey!';
        third();
    }
}

function third() {
    var d = 'John';
    console.log(a + b + c + d);
}
*/



///////////////////////////////////////
// Lecture: The this keyword


//console.log(this);
/*
calculateAge(1985); //function call not method. this is still attached to window object.

function calculateAge(year){
    console.log(2018 - year);
    console.log(this);
}

*/

var john = {
    name: 'John',
    yearOfBirth: 1990,
    calcAge: function(){
        console.log(this);
        console.log(2018 - this.yearOfBirth);
    }
};

john.calcAge();

var mike = {
    name: 'Mike',
    yearOfBirth: 1995
};

//method borrowing
mike.calculateAge = john.calcAge;

mike.calculateAge();


