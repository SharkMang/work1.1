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

        this.filterValue = 5;
        this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
        this.prevChoosedNav = this.navListCounter;

        this.prevChoosedFilter = 'all';
        
        this.initHeader = new Header(this.header, this.eventChangeCheckedForAll, this.eventAddTodo);
        this.initTodoList = new TodoList(this.sectionTodoList, this.eventChangeChecked, this.eventChangeTodo, this.eventRemoveTodo);
        this.initNavSection = new Navigator(this.sectionNavigation, this.eventClickOnNavPage);
        this.initFooter = new Footer(this.footer, this.eventClickOnAll, this.eventClickOnActive, this.eventClickOnComplited, this.eventRemoveAllChecked);
  	}

	render() {
		this.initHeader.render();
		this.initTodoList.render(this.todoList);
        this.initNavSection.render(this.navListCounter);
        this.initFooter.render(this.todoList);
	}



    changeListOfNavPages = (todos) => {
        let counterOfList = (Math.trunc(todos.length / this.filterValue) + 1);

        if(todos.length % this.filterValue === 0 && counterOfList !== 1) {
            counterOfList--;
        }

        this.prevChoosedNav = counterOfList;
        this.initNavSection.render(counterOfList);
        this.moveToTheNavPage(counterOfList, todos);
    }

    moveToTheNavPage = (index, todos) => {
        let newTodos = [];
        this.changeStyleForChoosedElem(index);

        index *= this.filterValue;

        for(let i = (index - this.filterValue); i < index; i++) {
            if(todos[i]) {

                newTodos.push(todos[i]);
            }
        }

        this.initTodoList.render(newTodos);
    }

    eventClickOnNavPage = (event) => {
        const id = parseInt(event.target.id);

        this.changeStyleForChoosedElem(id);

        switch(this.prevChoosedFilter) {
            case 'all': 
                this.moveToTheNavPage(id, this.todoList);
                break;
            case 'active':
                {const todos = this.todoList.filter(todo => !todo.isChecked);
                this.moveToTheNavPage(id, todos);}
                break;
            case 'complited':
                {const todos = this.todoList.filter(todo => todo.isChecked);
                this.moveToTheNavPage(id, todos);}
                break;
        }
    }


    changeStyleForChoosedElem = (idElem) => {
        let elem = document.getElementById(idElem);

        if(idElem !== this.prevChoosedNav) {
            elem.classList.add('selected');
            this.initNavSection.removeClassSelected(this.prevChoosedNav);
            this.prevChoosedNav = idElem;
        }
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


                if(this.prevChoosedFilter != 'all') {
                    this.initFooter.removeClassSelected(this.prevChoosedFilter);
                    const liAll = document.getElementById('all');
                    liAll.classList.add('selected');
                    this.prevChoosedFilter = 'all';
                    this.changeListOfNavPages(this.todoList);
                } else {
                    if(this.todoList.length > (this.navListCounter * this.filterValue)) {
                        this.navListCounter++;
                        this.changeListOfNavPages(this.todoList);
                    } else {
                        if(this.prevChoosedNav !== this.navListCounter) {
                            this.moveToTheNavPage(this.navListCounter, this.todoList);
                        } else {
                            this.initTodoList.addOneElem(newTodo);
                        }
                    }
                }
                event.target.placeholder = 'What needs to be done?';
            } else {
                event.target.placeholder = 'Incorrect Value';
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

        if(this.prevChoosedNav !== this.navListCounter){
            this.moveToTheNavPage(this.prevChoosedNav, this.todoList);
        }

        if(this.todoList.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.todoList.length % this.filterValue === 0) {
            this.navListCounter--;
            this.changeListOfNavPages(this.todoList);
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
        this.changeListOfNavPages(this.todoList);

    }

    eventRemoveAllChecked = () => {
        this.todoList = this.todoList.filter(todo => !todo.isChecked);

        this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);
        this.changeListOfNavPages(this.todoList);

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
                event.target.removeEventListener('blur', this.eventBlurTodo);
                label.innerHTML = todo;
            } else {
                event.target.placeholder = 'Incorrect Value';
                event.target.value = '';
            }
        }
    }

    eventBlurTodo = (event) => {
        const div = event.target.closest('div');
        const label = event.target.closest('label');
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



    eventClickOnAll = (event) => {
        const elem = event.target;
        const id = elem.id;

        if(id !== this.prevChoosedFilter) {
            elem.classList.add('selected');
            this.initFooter.removeClassSelected(this.prevChoosedFilter);
            this.prevChoosedFilter = id;
        }

        this.changeListOfNavPages(this.todoList);
    }

    eventClickOnActive = (event) => {
        const todos = this.todoList.filter(todo => !todo.isChecked);

        const elem = event.target;
        const id = elem.id;

        if(id !== this.prevChoosedFilter) {
            elem.classList.add('selected');
            this.initFooter.removeClassSelected(this.prevChoosedFilter);
            this.prevChoosedFilter = id;
        }

        this.changeListOfNavPages(todos);
    }

    eventClickOnComplited = (event) => {
        const todos = this.todoList.filter(todo => todo.isChecked);

        const elem = event.target;
        const id = elem.id;

        if(id !== this.prevChoosedFilter) {
            elem.classList.add('selected');
            this.initFooter.removeClassSelected(this.prevChoosedFilter);
            this.prevChoosedFilter = id;
        }

        this.changeListOfNavPages(todos);
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
        this.container.appendChild(this.sectionTodoList);
        this.container.appendChild(this.sectionNavigation);
        this.container.appendChild(this.footer);

		this.render();
	}
}

window.onload = function() {
	(new App('root')).init();
}