class App {
  	constructor(selector) {
      	this.container = document.getElementById(selector);
        this.header = document.createElement('header');
        this.sectionNavigation = document.createElement('section');
        this.sectionTodoList = document.createElement('section');
        this.footer = document.createElement('footer');

        this.container.classList.add('container');
        this.header.classList.add('header');
        this.container.classList.add('section');
        this.footer.classList.add('footer');

		this.todoList = [
            {
                todoName: 'first',
                isChecked: false,
                id: 10
            },
            {
                todoName: 'second',
                isChecked: false,
                id: 11
            },
        ];

        this.filterValue = 7;
        this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
        
        this.initHeader = new Header(this.header, this.eventChangeCheckedForAll, this.eventAddTodo);
        this.initNavSection = new Navigator(this.sectionNavigation, this.eventClickOnNavPage);
        this.initTodoList = new TodoList(this.sectionTodoList, this.eventChangeChecked, this.eventChangeTodo, this.eventRemoveTodo);
        this.initFooter = new Footer(this.footer, this.eventClickOnAll, this.eventClickOnActive, this.eventClickOnComplited, this.eventRemoveAllChecked);
  	}

	render() {
		this.initHeader.render();
        this.initNavSection.render(this.navListCounter);
		this.initTodoList.render(this.todoList);
        this.initFooter.render(this.todoList);
	}



    changeListOfNavPages = () => {
        this.initNavSection.render(this.navListCounter);
        this.moveToTheNavPage(this.navListCounter);
    }

    moveToTheNavPage = (index) => {
        let todos = [];
        index *= this.filterValue;

        for(let i = (index - this.filterValue); i < index; i++) {
            if(this.todoList[i]) {
                todos.push(this.todoList[i]);
            }
        }
        this.initTodoList.render(todos);
    }

    eventClickOnNavPage = (event) => {
        const id = parseInt(event.target.id);
        this.moveToTheNavPage(id);
    }



    eventAddTodo = (event) => {

        if(event.keyCode === 13) {

            if(this.isCorrectInput(event.target.value)) {
                let newTodo = {
                    todoName: event.target.value,
                    isChecked: false,
                    id: Math.round(Math.random() * 10000)
                };

                this.todoList.push(newTodo);

                event.target.value = '';  

                this.initHeader.changeCheckbox(this.todoList);
			    this.initFooter.changeCount(this.todoList);

                if(this.todoList.length > (this.navListCounter * this.filterValue)) {
                    this.navListCounter++;
                    this.changeListOfNavPages();
                } else {
                    this.initTodoList.addOneElem(newTodo);
                }
            } else {
                event.target.value = '';
            }
        }
    }

    eventRemoveTodo = (event) => {
        let div = event.target.parentNode;
        this.todoList = this.todoList.filter(todo => todo.id !== parseInt(div.id));
        let li = event.target.closest('li');
        li.remove();

        this.initHeader.changeCheckbox(this.todoList);
        this.initFooter.changeCount(this.todoList);

        if(this.todoList.length < (this.navListCounter * this.filterValue)) {
            this.navListCounter--;
            this.changeListOfNavPages();
        } 
    }



	eventChangeCheckedForAll = (event) => {
        let todos = this.todoList;

        for(let i = 0; i < todos.length; i++) {

            if(event.target.checked){
                todos[i].isChecked = true;
            } else {
                todos[i].isChecked = false;
            }
        }
        
        this.initFooter.changeCount(this.todoList);
        this.changeListOfNavPages();

    }

    eventRemoveAllChecked = () => {
        this.todoList = this.todoList.filter(todo => !todo.isChecked);

        this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
        this.changeListOfNavPages();

        this.initHeader.changeCheckbox(this.todoList);
        this.initFooter.changeCount(this.todoList);
    }


    eventChangeTodo = (event) => {
        let elem = event.target;
	
        elem.innerHTML = "";
        let input1 = document.createElement("INPUT");
        input1.type = "text";
        input1.classList.add('liInput');

        input1.addEventListener("keydown", this.eventChangeNameTodo);
        input1.addEventListener("blur", this.eventBlurTodo);

        elem.appendChild(input1);
        input1.focus();
    }

	eventChangeNameTodo = (event) => {

        if(event.keyCode === 13) {

            if(this.isCorrectInput(event.target.value)) {
                const todo = event.target.value;
                
                const div = event.target.closest('div');
                const todoByIndex = this.getTodoById(div.id);
                todoByIndex.todoName = todo;

                let label = event.target.closest('label');
                label.innerHTML = todo;
            } else {
                event.target.value = '';
            }
        }
    }

    eventBlurTodo = (event) => {
        let div = event.target.closest('div');
        let label = event.target.closest('label');
        const todoByIndex = this.getTodoById(div.id);

        label.innerHTML = todoByIndex.todoName;
    }

    eventChangeChecked = (event) => {
        const div = event.target.closest('div');
        const todoByIndex = this.getTodoById(div.id);
        
        todoByIndex.isChecked = !todoByIndex.isChecked;

        if(todoByIndex.isChecked) {
            div.childNodes[1].className = 'label-item-marced';
        } else {
            div.childNodes[1].className = 'label-item-notmarced';
        }

        this.initHeader.changeCheckbox(this.todoList);
        this.initFooter.changeCount(this.todoList);
    }



    eventClickOnAll = () => {
        this.changeListOfNavPages();
    }

    eventClickOnActive = () => {
        const todos = this.todoList.filter(todo => !todo.isChecked);
        this.initTodoList.render(todos);
    }

    eventClickOnComplited = () => {
        const todos = this.todoList.filter(todo => todo.isChecked);
        this.initTodoList.render(todos);
    }



    isCorrectInput = (str) => {
        const testStr = (str.search(/[^A-Za-z\s]/) == -1);

        if(str && testStr){
            return true;
        } else {
            return false;
        }
    }

    getTodoById = (id) => {
        return this.todoList.find(todo => todo.id === parseInt(id));
    }

	init() {
		const h1 = document.createElement('h1');
		h1.innerHTML = 'Todos';
		h1.classList.add('h1');
		this.header.appendChild(h1);

        this.container.appendChild(this.header);
        this.container.appendChild(this.sectionNavigation)
        this.container.appendChild(this.sectionTodoList);
        this.container.appendChild(this.footer);

		this.render();
	}
}

window.onload = function() {
	(new App('root')).init();
}