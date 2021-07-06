class App {
  	constructor(selector) {
      	this.container = document.getElementById(selector);
        this.section = document.createElement('section');
        this.header = document.createElement('header');
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

        this.initHeader = new HeaderInput(this.header, this.eventChangeCheckedForAll, this.eventAddTodo);
        this.initTodoList = new TodoList(this.section, this.eventChangeChecked, this.eventChangeTodo, this.eventRemoveTodo);
        this.initFooter = new Footer(this.footer, this.eventClickOnAll, this.eventClickOnActive, this.eventClickOnComplited, this.eventRemoveAllChecked);
  	}

	render() {
		this.initHeader.render();
		this.initTodoList.render(this.todoList);
        this.initFooter.render(this.todoList);
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
	    this.initTodoList.render(this.todoList);
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
                this.initTodoList.addOneElem(newTodo);
            } else {
                event.target.value = '';
            }
        }
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

	eventRemoveTodo = (event) => {
        let div = event.target.parentNode;
        this.todoList = this.todoList.filter(todo => todo.id !== parseInt(div.id));
        let li = event.target.closest('li');
        li.remove();

        this.initHeader.changeCheckbox(this.todoList);
        this.initFooter.changeCount(this.todoList);
    }

    eventClickOnAll = () => {
        this.initTodoList.render(this.todoList);
    }

    eventClickOnActive = () => {
        const todos = this.todoList.filter(todo => !todo.isChecked);
        this.initTodoList.render(todos);
    }

    eventClickOnComplited = () => {
        const todos = this.todoList.filter(todo => todo.isChecked);
        this.initTodoList.render(todos);
    }

    eventRemoveAllChecked = () => {
        this.todoList = this.todoList.filter(todo => !todo.isChecked);

        this.initHeader.changeCheckbox(this.todoList);
        this.initFooter.changeCount(this.todoList);
        this.initTodoList.render(this.todoList);
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
        this.container.appendChild(this.section);
        this.container.appendChild(this.footer);

		this.render();
	}
}

window.onload = function() {
	(new App('root')).init();
}