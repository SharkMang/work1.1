class App {
  	constructor(selector) {
      	this.container = document.getElementById(selector);
        this.section = document.createElement('section');
        this.header = document.createElement('header');
        this.container.className = 'section';


		this.todoList = [
            {
                todoName: 'first',
                isChecked: false
            },
            {
                todoName: 'second',
                isChecked: false
            },
        ];
		
        this.initHeader = new HeaderInput(this.header, this.eventChangeStyleForAll, this.eventAddTodo);
        this.initTodoList = new TodoList(this.section, this.todoList, this.eventChangeStyle, this.eventChangeTodo, this.eventRemove);
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
        
	    this.render();
    }

	eventRemove = (event) => {
        let elem = event.target.parentNode;
        let index = parseInt(elem.getAttribute('data-index'));
        this.todoList.splice(index, 1);

        this.initTodoList.render();
    }

	eventChangeTodo = (event) => {
        let elem = event.target;
	
        elem.innerHTML = "";
        let input1 = document.createElement("INPUT");
        input1.type = "text";

        input1.addEventListener("keydown", this.eventNewTodo);
        input1.addEventListener("blur", this.eventBlurTodo);

        elem.appendChild(input1);
        input1.focus();
    }

	eventNewTodo = (event) => {

        if(event.keyCode === 13 && event.target.value) {
    
            let todo = event.target.value;
    
            let div = event.target.closest('div');
            let index = parseInt(div.getAttribute('data-index'));
    
            this.todoList[index].todoName = todo;
    
            this.initTodoList.render();
        }
    }

	eventBlurTodo = (event) => {
        let div = event.target.closest('div');
        let label = event.target.closest('label');
        let index = div.getAttribute('data-index');
        
        label.innerHTML = this.todoList[index].todoName;
    }

    eventAddTodo = (event) => {

        if(event.keyCode === 13 && event.target.value) {
            let newTodo = {
                todoName: event.target.value,
                isChecked: false
            };

            this.todoList.push(newTodo);

            event.target.value = '';  
			
            this.initTodoList.addOneElem(newTodo);
        }
    }

	eventChangeStyle = (event) => {
        const indexOfElem = event.target.parentElement.getAttribute('data-index');
        let todo = this.todoList[indexOfElem];
        
        todo.isChecked = !todo.isChecked;
        this.initTodoList.render();
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