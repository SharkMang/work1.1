class App {
  	constructor(selector) {
      	this.container = document.getElementById(selector);
        this.section = document.createElement('section');
        this.header = document.createElement('header');
        this.container.className = 'section';


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
		
        this.initHeader = new HeaderInput(this.header, this.eventChangeStyleForAll, this.eventAddTodo);
        this.initTodoList = new TodoList(this.section, this.eventChangeStyle, this.eventChangeTodo, this.eventRemove);
  	}

	render() {
		this.initHeader.render();
		this.initTodoList.render(this.todoList);
	}

	eventChangeStyleForAll = (event) => {
        let todos = this.todoList;

        for(let i = 0; i < todos.length; i++) {
            if(event.target.checked){
                todos[i].isChecked = true;
            } else {
                todos[i].isChecked = false;
            }
        }
        
	    this.initTodoList.render(this.todoList);
    }

    eventAddTodo = (event) => {

        if(event.keyCode === 13 && event.target.value) {
            let newTodo = {
                todoName: event.target.value,
                isChecked: false,
                id: Math.round(Math.random() * 10000)
            };

            this.todoList.push(newTodo);

            event.target.value = '';  
			
            this.initTodoList.addOneElem(newTodo);
        }
    }

    eventChangeTodo = (event) => {
        let elem = event.target;
	
        elem.innerHTML = "";
        let input1 = document.createElement("INPUT");
        input1.type = "text";

        input1.addEventListener("keydown", this.eventChangeNameTodo);
        input1.addEventListener("blur", this.eventBlurTodo);

        elem.appendChild(input1);
        input1.focus();
    }

	eventChangeNameTodo = (event) => {

        if(event.keyCode === 13 && event.target.value) {
            const todo = event.target.value;
            
            const div = event.target.closest('div');
            const todoByIndex = this.getTodoById(div.id);
            todoByIndex.todoName = todo;

            let label = event.target.closest('label');
            label.innerHTML = todo;
        }
    }

    eventBlurTodo = (event) => {
        let div = event.target.closest('div');
        let label = event.target.closest('label');
        const todoByIndex = this.getTodoById(div.id);

        label.innerHTML = todoByIndex.todoName;
    }

    eventChangeStyle = (event) => {
        const div = event.target.closest('div');
        const todoByIndex = this.getTodoById(div.id);
        
        todoByIndex.isChecked = !todoByIndex.isChecked;

        if(todoByIndex.isChecked) {
            div.childNodes[1].className = 'label-item-marced';
        } else {
            div.childNodes[1].className = 'label-item-notmarced';
        }
    }

	eventRemove = (event) => {
        let div = event.target.parentNode;

        this.todoList = this.todoList.filter(todo => todo.id !== parseInt(div.id));
        let li = event.target.closest('li');
        li.remove();
    }

    getTodoById = (id) => {
        return this.todoList.find(todo => todo.id === parseInt(id));
    }

	init() {
		this.container.classList.add('container');
		this.header.classList.add('header');

		const h1 = document.createElement('h1');
		h1.innerHTML = 'Todos';
		h1.classList.add('h1');
		this.header.appendChild(h1);

        this.container.appendChild(this.header);
        this.container.appendChild(this.section);

		this.render();
	}
}

window.onload = function() {
	(new App('root')).init();
}