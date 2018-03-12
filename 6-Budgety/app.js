/****************************************************************
BUDGET CONTROLLER MODULE
****************************************************************/

var budgetController = (function() {
    
    //Private Methods and Variables
    var Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    // calculates percentages
    Expense.prototype.calcPercentage = function (totalIncome) {
        
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);
        } else {
            this.percentage = -1;
        }
        
    };
    
    // returns percentage
    Expense.prototype.getPercentage = function() {
        return this.percentage;
    }
    
    
    var Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach( function(current) {
            sum += current.value;
        });
        data.totals[type] = sum;
    };
    
    
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        
        totals: {
            exp: 0,
            inc: 0
        },
        
        budget: 0,
        percentage: -1
    };
    
    
    //Public Methods
    return {
        addItem: function (type, des, val) {
            var newItem, ID;
            
            // create new ID
            if (data.allItems[type].length > 0){
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } 
            else {
                ID = 1;
            }
            
            // create new item based on type
            if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            else if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            }
            
            // push to data structure
            data.allItems[type].push(newItem);
            
            // return new element
            return newItem;
            
        },
        
        
        deleteItem: function(type, id) {
            var ids, index;            
            
            ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            
            index = ids.indexOf(id);
            
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
            
        },
        
        // Functions that only set data
        calculateBudget: function () {
            
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            // calculate budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            
            // calculate expenses %;
            if (data.totals.inc > 0){
            data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; 
            }
            
        },
        
        caclulatePercentages: function() {
                        
            data.allItems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
            });
            
        },
        
        getPercentages: function () {
            
            var allPerc = data.allItems.exp.map(function(cur) {
               return cur.getPercentage(); 
            });
            
            return allPerc;
        },
        
        // Functions that only retrieve data
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        }
    };
    
})();


/****************************************************************
    UI CONTROLLER MODULE
****************************************************************/

var UIController = (function() {
    
    //private
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    }
    
    var formatNumber = function(num, type) {
        var numSplit, int, dec;

        num = Math.abs(num);
        num = num.toFixed(2);

        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];

        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }

        dec = numSplit[1];

        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };
    
    
    var nodeListForEach = function(list, callback) {
        for (var i = 0; i < list.length; i++) {
            callback(list[i], i);
        }
    };
    
    //public methods are returned
    return {
        getInput: function() {
            
            return {
                type: document.querySelector(DOMstrings.inputType).value, //inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value) //convert Str -> Float
            };
        },
        
        addListItem: function (obj, type) {
            var html, newHtml, element;
            
            // Create HTML string with placeholder text.
            if(type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expenseContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            
            // Replace placeholder text with actual data.
            newHtml = html.replace('%id%', obj.id); 
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // Insert HTML to the DOM.
            document.querySelector(element).insertAdjacentHTML('beforeEnd', newHtml);
            
        },
        
        deleteListItem: function(selectorID) {
            
            // cannot delete element itself
            // can only delete children of an item
            // so we use the parent of the element we want to delete.
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        
        clearFields: function () {
            var fields, fieldsArray;
            
            fields = document.querySelectorAll( DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);
            
            // convert fields list to array
            fieldsArray = Array.prototype.slice.call(fields);
            
            fieldsArray.forEach(function(current, index, array) {
                //empty all field values
                current.value = "";                            
            });
            
            fieldsArray[0].focus();
            
        },
        
        
        displayBudget: function(obj) {
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp'
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
           
           if (obj.percentage > 0){ 
               document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';

            }
        },
        
        displayPercentages: function(percentages) {
            
            //node list
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            nodeListForEach(fields, function(current, index) {
                
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        },
        
        displayDate: function() {
            var now, year, month;
            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            
            now = new Date() //todays date
            
            year = now.getFullYear();
            month = now.getMonth();
            document.querySelector(DOMstrings.dateLabel).textContent = months[month] + ' ' + year;
        },
        
        changeType: function() {
            
            var fields = document.querySelectorAll(
                DOMstrings.inputType + ',' +
                DOMstrings.inputDescription + ',' + 
                DOMstrings.inputValue);
            
            nodeListForEach(fields, function(cur) {
                cur.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
            
        },
                
        getDOMstrings: function() {
            return DOMstrings;
        }
    };
    
})();



/***************************************************************
    GLOBAL APP CONTROLLER
****************************************************************/

var controller = (function (budgetCtrl, UICtrl) {
    
    // Initializer Function
    var setupEventListeners = function () {
            
        var DOM = UICtrl.getDOMstrings();
        
        //triggers
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function(event) {

            if (event.keyCode === 13 || event.which === 13) {
               ctrlAddItem();
            }
        });
        
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeType);
    };
    
    var updateBudget = function() {
        
        // 1) Calculate the budget
        budgetCtrl.calculateBudget();
        
        // 2) Return budget
        var budget = budgetCtrl.getBudget();
        
        // 3) Display budget in UI Controller
        UICtrl.displayBudget(budget);
    };
    
    var unpdatePercentages = function() {
        
        // 1) Calculate Percentages
        budgetCtrl.caclulatePercentages();
        
        // 2) Read from Budget Controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3) Update UI
        UICtrl.displayPercentages(percentages);
        
    };
    
    var ctrlAddItem = function () {
        var input, newItem;
        
        
        // 1) Get field input data
        input = UICtrl.getInput();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            
        // 2) Add item to budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

        // 3) Add the new item to UI
            UICtrl.addListItem(newItem, input.type);

        // 4) Clear the fields
            UICtrl.clearFields();

        // 5) Calculate and Update Budget
            updateBudget();
        
        // 6) Calc and Update Percentages
            unpdatePercentages();
        }
    };
    
    var ctrlDeleteItem = function(event) {
        //accessing the event object to dtermine target object.
        var itemID, splitID, type, id;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID !== "") {
            
            splitID = itemID.split('-');
            type = splitID[0];
            id = parseInt(splitID[1]);
            
            // 1) Delete the item form the data structure
            budgetCtrl.deleteItem(type, id);
            
            // 2) Delete item from UI
            UICtrl.deleteListItem(itemID);
            
            // 3) Update and show new budget
            updateBudget();
            
            // 4) Calc and Update Percentages
            unpdatePercentages();
                        
        }
        
        
    };
    
    return {
        init: function() { //initializer
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            
            setupEventListeners();
        }
    };
    
})(budgetController, UIController);

//initializer
controller.init();



/***************
    NOTES
****************/


// Closure: An inner funciton i of parent function j will always
// have access to the variables of j even after j has returned.

// Seperation of concerns. UI Module will never interfere or interact
// with anything related to the Budget Controller Module.

// Calling variables will keep the module more independent.
