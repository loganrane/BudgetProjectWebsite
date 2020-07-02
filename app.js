var budgetController = (function () {
	var Expense = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function (id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var data = {
		allItems: {
			exp: [],
			inc: [],
		},
		totals: {
			exp: 0,
			inc: 0,
		},
	};

	return {
		addItem: function (type, des, val) {
			var newItem, ID;

			// Create new ID
			if (data.allItems[type].length > 0) {
				ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
			} else {
				ID = 0;
			}

			// Create new item basen on 'inc' or 'exp' type
			if (type === 'exp') {
				newItem = new Expense(ID, des, val);
			} else if (type === 'inc') {
				newItem = new Income(ID, des, val);
			}

			// Push it into our data structure
			data.allItems[type].push(newItem);

			// Return the new element
			return newItem;
		},

		testing: function () {
			console.log(data);
		},
	};
})();

var UIController = (function () {
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputBtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list',
	};

	return {
		getinput: function () {
			return {
				type: document.querySelector(DOMstrings.inputType).value, // Output - "inc" / "exp".
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
			};
		},

		addListItem: function (obj, type) {
			var html, newHTML, element;

			// Create an HTML string with placeholder text

			if (type === 'inc') {
				element = DOMstrings.incomeContainer;

				html =
					'<div class="item clearfix" id="income-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expenseContainer;

				html =
					'<div class="item clearfix" id="expense-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			}

			// Replace the placeholder text with actual data
			newHTML = html.replace('%id%', obj.id);
			newHTML = newHTML.replace('%description%', obj.description);
			newHTML = newHTML.replace('%value%', obj.value);

			// Insert the HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
		},

		clearFields: function () {
			var fields, fieldsArr;

			fields = document.querySelectorAll(
				DOMstrings.inputDescription + ', ' + DOMstrings.inputValue
			);

			fieldsArr = Array.prototype.slice.call(fields);

			fieldsArr.forEach(function (current, index, array) {
				current.value = '';
			});

			fieldsArr[0].focus();
		},

		getDOMstrings: function () {
			return DOMstrings;
		},
	};
})();

var controller = (function (budgetCtrl, UICtrl) {
	var setupEventListeners = function () {
		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function (event) {
			if (event.keyCode === 13 || event.which === 13) {
				ctrlAddItem();
			}
		});
	};

	var updateBudget = function () {
		// ToDo : 1. Calculate the budget
		// Return the budget
		// ToDo : 2. Display the budget on the UI
	};

	var ctrlAddItem = function () {
		var input, newItem;

		// ToDo : 1. Get the filled input data.
		input = UICtrl.getinput();

		if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
			// ToDo : 2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);

			// ToDo : 3. Add the item to the UI
			UICtrl.addListItem(newItem, input.type);
			// Clear the fields after taking the value
			UICtrl.clearFields();

			// ToDo : 4. Calculate and update budget
			updateBudget();
		}
	};

	return {
		init: function () {
			console.log('Application has started');
			setupEventListeners();
		},
	};
})(budgetController, UIController);

// Only line of code that is going to be outside.
controller.init();
