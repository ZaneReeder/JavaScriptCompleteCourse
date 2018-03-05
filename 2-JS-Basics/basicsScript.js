///*** VARIABLES AND DATA TYPES ***/
//
//
//var name = 'John';
//console.log(name);
//
//var lastName = 'Smithyman'; //Camel Case
//
//console.log(lastName);
//
//
//var age = 36;
//
//console.log(age);
//
//
///****
//Data Types
//
//Number - int, float
//
//String - sequecne of characters
//
//Boolean - Logical true or false
//
//Undefined - variable which does not have a value yet.
//
//Null - 'non-existent' => 'nothing'
//
//Dynamic Typing - 
//    determines the type of variable as it is interpreted.
//    
//***/
//
//
//var fullAge = true;
//console.log(fullAge);
//
///***
//Console logging is used for debugging 
//***/
//
//
///*** VARIABLE MUTATIONS and TYPE COERCION***/
//
//var name = 'John';
//var age = 26;
//
//console.log(name + age); //auto converted number to string. Type coercion
//console.log(age + age); //because both vars are same type.
//
//
//var job, isMarried; //declared but no value;
//
//job = 'teacher';
//isMarried = false;
//
//console.log(name + ', ' + age + ' is a ' + job + ' and married?: ' + isMarried + '.');
//
//age = 'thirty six'; //mutation. changed var type and value.
//job = 'driver';//mutation.
//
//console.log(name + ', ' + age + ', is a ' + job + '. People say he is married, and this is ' + isMarried + '.');
//
///* Code is read line to line from top to bottom... which affects variable meaning.*/
//
///*Get from console*/
//var lastName = prompt('What is his last name?');
//
//console.log(name + ' ' + lastName + ', ' + age + ', is a ' + job + '. People say he is married, and this is ' + isMarried + '.');
//
//alert(name + ' ' + lastName + ', ' + age + ', is a ' + job + '. People say he is married, and this is ' + isMarried + '.'); 
////used for early stage debugging
//
//
///*** OPERATORS ***/
//var currentYear = 2018;
//var birthYear;
//var age = prompt('Enter your age...');
//
//birthYear = currentYear - age;
//console.log(birthYear);
//
//var ageJohn = 30;
//var ageMark = 30;
//
//
///*** IF ELSE ***/
//var name = 'John';
//var age = 26;
//var isMarried = 'no';
//
//if (isMarried === 'yes'){
//    console.log(name + ' is married!');
//} else {
//    console.log(name + ' will hopefully marry soon.');
//}
//
//
//isMarried = false;
//
//if (isMarried){
//    console.log('Yes');
//} else {
//    console.log('No');
//}
//
///*
//'==' Type Coercion
//'===' No Type Coercion
//*/
//
//console.log(('23' == 23));
//
//console.log(('23' === 23)); //MOST ADVISED
//
///*** BOOLEAN LOGIC AND SWITCH ***/
//
//var age = 36;
//
//if (age < 20){
//    console.log('John is a teenager.');
//} 
//else if (age >= 20 && age < 30) {//20s
//    console.log('John is a young man.')
//}
//else {
//    console.log('John is a man.');
//}
//
////Switch Statement
//
//var job = prompt('What does John do?');
//
//switch (job) {
//    case 'teacher':
//        console.log('John teaches kids');
//        break;
//    case 'driver':
//        console.log('John drives a cab in LBK.');
//        break;
//    case 'policeman':
//        console.log('John helps fight crime');
//        break;
//    case 'judge':
//        console.log('John sentences people to jail time.')
//        break;
//    default:
//        console.log('John does something productive we hope.');
//}
//
//
//
//
//var johnHeight = 52;
//var johnAge = 20;
//
//var fredHeight = 60;
//var fredAge = 18;
//
//var bradHeight = 55;
//var bradAge = 16;
//
//var johnScore = 5 * johnAge + johnHeight;
//var fredScore = 5 * fredAge + fredHeight;
//var bradScore = 5 * bradAge + bradHeight;
//
//console.log('John: ' + johnScore)
//console.log('Fred: ' + fredScore)
//console.log('Brad: ' + bradScore)
//
//if (johnScore > bradScore) {
//    if (johnScore > fredScore) {
//        console.log('John wins with a score of: ' + johnScore);
//    }
//    else if (johnScore < fredScore) {
//        console.log('Fred wins with a score of: ' + fredScore);
//    }
//    else {
//        console.log('John and Fred draw with a score of: ' + fredScore);
//    }
//}
//else if (bradScore > johnScore) {
//    if (bradScore > fredScore){
//        console.log('Brad wins with a score of: ' + bradScore);
//    }
//    else if (bradScore < fredScore){
//        console.log('Fred wins with a score of: ' + fredScore);
//    }
//    else {
//        console.log('Brad and Fred draw with a score of: ' + fredScore);
//    }
//}
//
//else {
//    if (fredScore > johnScore){
//        console.log('Fred wins with a score of: ' + fredScore);
//    }
//    else{
//        console.log('John and Brad draw with a score of: ' + johnScore);
//    }
//}
//
//
///***FUNCTIONS***/
////functionStatement
//function calculateAge(yearOfBirth){
//    var age = 2018 - yearOfBirth;
//    return age;
//}
//
////functionExpression
//var someFun = function(par) {
//    //code
//}
//
//
///***Arrays***/
//
//var names = ['John', 'Jane', 'Mark'];
//var years = new Array(1996, 1994, 2000);
//
//var john= = ['John', 'Smith', 1990, 'designer', false];
//console.log(john);
//john.push('blue');
//john.unshift('Mr.');
//john.pop();
//john.shift();
//console.log(john);
//alert(john.indexOf('Smith'));
//
//if (john.indexOf('teacher') === -1) {
//    console.log('John is NOT a teacher');
//}
//
//
///***Objects***/
//
////dictionary object
//var john = {
//    firstName: 'John',
//    lastName: 'Smith',
//    age: 26,
//    yearOfBirth: 1990,
//    job: 'teacher',
//    isMarried: false
//};
//
//console.log(john);
//console.log(john.lastName);
//console.log(john['lastName']);
//
//var xyz = 'job';
//console.log(john[xyz]);
//
////data mutation
//john.lastName = 'Wagner';
//john['job'] = 'programmer';
//
//console.log(john);
//
//var jane = new Object();
//jane.name = 'Jane';
//jane.lastName = 'Smith';
//jane['yearOfBirth'] = 1969;
//jan['job'] = 'retired';
//jane['isMarried'] = true;
//
//console.log(jane);
//
//
//
//var john = {
//    firstName: 'John',
//    lastName: 'Smith',
//    yearOfBirth: 1990,
//    job: 'teacher',
//    isMarried: false,
//    family: ['Jane', 'Mark', 'Mary'],
//    calculateAge: function(){//function expression
//        //return 2018 - this.yearOfBirth;
//        this.age = 2018 - this.yearOfBirth;
//    }
//};
//
///*console.log(john.calculateAge());
//
//var age = john.calculateAge();
//john.age = age;*/
//
//
//
///***Loops***/
//
//for (var i = 0; i < 5; i++){
//    console.log(i);
//}
//
//var names = ['John', 'Bob', 'Mary', 'Mark', 'Jane'];
//
//for (i = 0; i < names.length; i++){
//    console.log(names[i]);
//}
//
//
//var i = 0;
//while(i<names.length){
//    console.log(names[i]);
//    i++;
//}
//
//
//for (var = 1; i <= 5; i++){
//    if (i==2){
//        continue;
//    }
//    if(i==4){
//        break;
//    }
//    
//    console.log(i);
//}
//
//
//
//

/***CODING CHALLENGE 2***/


function calcAge(n){
    return 2018 - n;
}

var birthYears = [1984, 1983, 2001, 1994];
var testArray = [];
var i; //iteration variable

for (i = 0; i < birthYears.length; i++){
    testArray[i] = birthYears[i];
}

for (i = 0; i < testArray.length; i++){
    var year = testArray[i];
    var age = calcAge(testArray[i]);
    var id = i+1
    if (age >= 18 ){
        console.log('Person ' + id + ' is of full age because they were born in ' + year + ' and is ' + age + ' years old.');
    }
    else {
        console.log('Person' + id + ' is not of full age because they were born in ' + year + ' and is only ' + age + ' years old.');
    }
}


function printFullAge(years){
    var  bools = [];
    for (var i = 0; i < years.length; i++){
        var age = calcAge(years[i]);
        bools[i] = age >= 18;
    }
    console.log(years);
    console.log(bools);
}

printFullAge(birthYears);


