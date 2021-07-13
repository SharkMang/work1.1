/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./app.js":
/*!****************!*\
  !*** ./app.js ***!
  \****************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_home_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/home.js */ \"./pages/home.js\");\n/* harmony import */ var _pages_login_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pages/login.js */ \"./pages/login.js\");\n/* harmony import */ var _src_components_eventEmitter_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./src/components/eventEmitter.js */ \"./src/components/eventEmitter.js\");\n\n\n\n\nclass App {\n  constructor(selector) {\n    this.container = document.getElementById(selector);\n\n    this.initEventEmitter = new _src_components_eventEmitter_js__WEBPACK_IMPORTED_MODULE_2__.default();\n\n    this.initLogin = new _pages_login_js__WEBPACK_IMPORTED_MODULE_1__.default(selector, this.initEventEmitter);\n    this.initHome = new _pages_home_js__WEBPACK_IMPORTED_MODULE_0__.default(selector, this.initEventEmitter);\n    \n  }\n\n  init() {\n    this.initEventEmitter.subscribe('isAuthenticated', (value) => {\n      if (value) {\n        localStorage.setItem('isAuthenticated', true);\n        this.render(this.initHome);\n      } else {\n        localStorage.setItem('isAuthenticated', false);\n        this.render(this.initLogin);\n      }\n    });\n\n    this.render(this.initLogin);\n  }\n\n  render(page) {\n    this.container.innerHTML = '';\n    page.init();\n  }\n}\n\nwindow.onload = function() {\n  (new App('root')).init();\n}\n\n\n\n//# sourceURL=webpack://work1.1/./app.js?");

/***/ }),

/***/ "./pages/home.js":
/*!***********************!*\
  !*** ./pages/home.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Home)\n/* harmony export */ });\n/* harmony import */ var _src_components_headerInput_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../src/components/headerInput.js */ \"./src/components/headerInput.js\");\n/* harmony import */ var _src_components_todoList_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../src/components/todoList.js */ \"./src/components/todoList.js\");\n/* harmony import */ var _src_components_navigator_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/components/navigator.js */ \"./src/components/navigator.js\");\n/* harmony import */ var _src_components_footer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/components/footer.js */ \"./src/components/footer.js\");\n\n\n\n\n\nclass Home {\n  constructor(selector, initEE) {\n    this.container = document.getElementById(selector);\n    this.header = document.createElement('header');\n    this.sectionNavigation = document.createElement('section');\n    this.sectionTodoList = document.createElement('section');\n    this.footer = document.createElement('footer');\n\n    this.container.classList.add('container');\n    this.header.classList.add('header');\n    this.container.classList.add('section');\n    this.footer.classList.add('footer');\n    \n    this.todoList = [\n      {\n        todoName: 'first',\n        isChecked: false,\n        id: 10\n      },\n      {\n        todoName: 'second',\n        isChecked: false,\n        id: 11\n      },\n    ];\n\n    this.filterValue = 6;\n    this.navListCounter = (Math.trunc(this.todoList.length / this.filterValue) + 1);\n    this.prevChoosedNav = this.navListCounter;\n    this.prevChoosedFilter = 'all';\n\n    this.initEventEmitter = initEE;\n\n    this.initHeader = new _src_components_headerInput_js__WEBPACK_IMPORTED_MODULE_0__.default(this.header, this.initEventEmitter);\n    this.initTodoList = new _src_components_todoList_js__WEBPACK_IMPORTED_MODULE_1__.default(this.filterValue, this.sectionTodoList, this.initEventEmitter);\n    this.initNavSection = new _src_components_navigator_js__WEBPACK_IMPORTED_MODULE_2__.default(this.sectionNavigation, this.initEventEmitter);\n    this.initFooter = new _src_components_footer_js__WEBPACK_IMPORTED_MODULE_3__.default(this.footer, this.initEventEmitter);\n  }\n  \n  render() {\n    this.initHeader.render();\n    this.initTodoList.render(this.todoList,this.navListCounter);\n    this.initNavSection.render(this.navListCounter);\n    this.initFooter.render(this.todoList.length);\n  }\n\n  eventChangeTodo = (elem) => {\n    elem.innerHTML = \"\";\n    let input1 = document.createElement(\"INPUT\");\n    input1.type = \"text\";\n    input1.classList.add('liInput');\n\n    input1.addEventListener(\"keydown\", this.eventChangeNameTodo);\n    input1.addEventListener(\"blur\", this.eventBlurTodo);\n\n    elem.appendChild(input1);\n    input1.focus();\n  }\n\n  eventChangeNameTodo = (event) => {\n\n    if (event.keyCode === 13) {\n\n      if (this.isCorrectInput(event.target.value)) {\n        const todo = event.target.value;\n        \n        const div = event.target.closest('div');\n        const todoByIndex = this.getTodoById(div.id);\n        todoByIndex.todoName = todo;\n\n        let label = event.target.closest('label');\n        event.target.removeEventListener('blur', this.eventBlurTodo);\n        label.innerHTML = todo;\n      } else {\n        event.target.placeholder = 'Incorrect Value';\n        event.target.value = '';\n      }\n    }\n  }\n\n  eventBlurTodo = (event) => {\n    const div = event.target.closest('div');\n    const label = event.target.closest('label');\n    const todoByIndex = this.getTodoById(div.id);\n\n    label.innerHTML = todoByIndex.todoName;\n  }\n\n  eventAddTodo = (event) => {\n\n    if (event.keyCode === 13) {\n\n      if (this.isCorrectInput(event.target.value)) {\n        let newTodo = {\n          todoName: event.target.value,\n          isChecked: false,\n          id: Math.round(Math.random() * 10000)\n        };\n\n        this.todoList.push(newTodo);\n\n        event.target.value = '';  \n\n        this.initHeader.changeHeaderCheckbox(false);\n\n        this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);\n\n        if (this.prevChoosedFilter != 'all') {\n          this.initEventEmitter.emit('chooseFilter', 'all');\n        } else {\n\n          if (this.todoList.length > (this.navListCounter * this.filterValue)) {\n            this.changeListOfNavPages();\n          } else {\n\n            if (this.prevChoosedNav !== this.navListCounter) {\n              this.moveToTheNavPage(this.navListCounter);\n            } else {\n              this.initTodoList.addOneElem(newTodo);\n            }\n          }\n        }\n        event.target.placeholder = 'What needs to be done?';\n      } else {\n        event.target.placeholder = 'Incorrect Value';\n        event.target.value = '';\n      }\n    }\n  }\n\n  changeListOfNavPages = () => {\n    let todos = this.choosedTodoList();\n    let counterOfList = (Math.trunc(todos.length / this.filterValue) + 1);\n\n    if (todos.length % this.filterValue === 0 && counterOfList !== 1) {\n      counterOfList--;\n    }\n\n    this.navListCounter = counterOfList;\n    this.moveToTheNavPage(this.navListCounter);\n  }\n\n  moveToTheNavPage = (index) => {\n    let todos = this.choosedTodoList();\n    if (todos.length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && todos.length % this.filterValue === 0) {\n      this.navListCounter--;\n    }\n\n    this.prevChoosedNav = index;\n    this.initNavSection.init(this.prevChoosedNav, this.navListCounter);\n\n    this.initTodoList.render(todos, this.prevChoosedNav);\n  }\n\n  eventChangeChecked = (evTarg) => {\n    const div = evTarg.closest('div');\n    const todoByIndex = this.getTodoById(div.id);\n    \n    todoByIndex.isChecked = !todoByIndex.isChecked;\n\n    if (todoByIndex.isChecked) {\n      div.childNodes[1].className = 'label-item-marced';\n    } else {\n      div.childNodes[1].className = 'label-item-notmarced';\n    }\n\n    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);\n\n    if (this.getCountOfNotChechedTodos() === 0 && this.todoList.length !== 0) {\n      this.initHeader.changeHeaderCheckbox(true);\n    } else {\n      this.initHeader.changeHeaderCheckbox(false);\n    }\n\n    if (this.prevChoosedFilter !== 'all') {\n      setTimeout(() => {\n        let li = evTarg.closest('li');\n        li.remove();\n\n        if (this.prevChoosedNav !== this.navListCounter){\n          this.moveToTheNavPage(this.prevChoosedNav);\n        } else {\n          if (this.choosedTodoList().length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.choosedTodoList().length % this.filterValue === 0) {\n            this.changeListOfNavPages();\n          }\n        }\n      },190);\n    }\n  }\n  \n  eventChangeCheckedForAll = (event) => {\n    let todos = this.todoList;\n\n    for(let i = 0; i < todos.length; i++) {\n      if (event.target.checked){\n        todos[i].isChecked = true;\n      } else {\n        todos[i].isChecked = false;\n      }\n    }\n\n    switch(this.prevChoosedFilter) {\n      case 'all': \n        this.moveToTheNavPage(this.prevChoosedNav);\n        break;\n      case 'active':\n        this.changeListOfNavPages();\n        break;\n      case 'complited':\n        this.changeListOfNavPages();\n        break;\n    }\n\n    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);\n  }\n\n  eventRemoveTodo = (evTarg) => {\n    let div = evTarg.parentNode;\n    this.todoList = this.todoList.filter(todo => todo.id !== parseInt(div.id));\n    let li = evTarg.closest('li');\n    li.remove();\n\n    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);\n\n    if (this.getCountOfNotChechedTodos() === 0 && this.todoList.length !== 0) {\n      this.initHeader.changeHeaderCheckbox(true);\n    } else {\n      this.initHeader.changeHeaderCheckbox(false);\n    }\n\n    if (this.prevChoosedNav !== this.navListCounter){\n      this.moveToTheNavPage(this.prevChoosedNav);\n    } else {\n      if (this.choosedTodoList().length < (this.navListCounter * this.filterValue) && this.navListCounter !== 1 && this.choosedTodoList().length % this.filterValue === 0) {\n        this.changeListOfNavPages();\n      }\n    }\n  }\n\n  eventRemoveAllChecked = () => {\n    this.todoList = this.todoList.filter(todo => !todo.isChecked);\n    this.changeListOfNavPages();\n\n    this.initHeader.changeHeaderCheckbox(false);\n    this.initFooter.init(this.getCountOfNotChechedTodos(), this.todoList.length);\n  }\n\n  choosedTodoList = () => {\n    let todos;\n\n    switch(this.prevChoosedFilter) {\n      case 'all': \n        todos = this.todoList;\n        break;\n      case 'active':\n        todos = this.todoList.filter(todo => !todo.isChecked);\n        break;\n      case 'complited':\n        todos = this.todoList.filter(todo => todo.isChecked);\n        break;\n    }\n    return todos;\n  }\n\n  getCountOfNotChechedTodos = () => {\n    let count = this.todoList.length;\n\n    for(let i = 0; i < this.todoList.length; i++) {\n\n      if (this.todoList[i].isChecked) {\n        count--;\n      }\n    }\n    return count;\n  }\n\n  isCorrectInput = (str) => {\n    const testStr = (str.search(/[^A-Za-z\\s]/) == -1);\n\n    if (str && testStr){\n      return true;\n    } else {\n      return false;\n    }\n  }\n\n  getTodoById = (id) => {\n    return this.todoList.find(todo => todo.id === parseInt(id));\n  }\n  \n  init() {\n    const h1 = document.createElement('h1');\n    h1.innerHTML = 'Todos';\n    h1.classList.add('h1');\n    this.header.appendChild(h1);\n\n    const div = document.createElement('div');\n    const btnLogout = document.createElement('button');\n    btnLogout.innerHTML = 'Logout';\n    btnLogout.classList.add('loginLogoutBtn');\n    btnLogout.addEventListener('click', () => {\n      this.initEventEmitter.emit('isAuthenticated', false);\n    });\n    div.appendChild(btnLogout);\n\n    this.container.appendChild(this.header);\n    this.container.appendChild(this.sectionTodoList);\n    this.container.appendChild(this.sectionNavigation);\n    this.container.appendChild(this.footer);\n    this.container.appendChild(div);\n   \n    this.initEventEmitter.subscribe('changeHeaderCheckbox', (event) => {this.eventChangeCheckedForAll(event)});\n    this.initEventEmitter.subscribe('addTodo', (event) => {this.eventAddTodo(event)});\n\n    this.initEventEmitter.subscribe('changeTodoCheckbox', (evTarg) => {this.eventChangeChecked(evTarg)})\n    this.initEventEmitter.subscribe('changeTodoName', (elem) => {this.eventChangeTodo(elem)});\n    this.initEventEmitter.subscribe('removeTodo', (evTarg) => {this.eventRemoveTodo(evTarg)})\n\n    this.initEventEmitter.subscribe('clickOnNavEl', (id) => {this.moveToTheNavPage(id)});\n\n    this.initEventEmitter.subscribe('chooseFilter', (id) => {\n      this.prevChoosedFilter = id;\n      this.changeListOfNavPages();\n    });\n\n    this.initEventEmitter.subscribe('delAllChoosed', () => {this.eventRemoveAllChecked()});\n\n    this.render();\n  }\n}\n\n\n\n\n//# sourceURL=webpack://work1.1/./pages/home.js?");

/***/ }),

/***/ "./pages/login.js":
/*!************************!*\
  !*** ./pages/login.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Login)\n/* harmony export */ });\nclass Login {\n  constructor(selector, initEE) {\n    this.container = document.getElementById(selector);\n    this.header = document.createElement('header');\n\n    this.container.classList.add('container');\n\n    const h1 = document.createElement('h1');\n    h1.classList.add('h1');\n    h1.innerHTML = 'LogIn:';\n    this.header.appendChild(h1);\n    \n    this.formLogin = document.createElement('form');\n    this.formLogin.classList.add('loginForm');\n\n    this.inputEmail = document.createElement('input');\n    this.inputEmail.classList.add('loginInputs');\n    this.inputEmail.type = 'email';\n    this.inputEmail.name = 'email';\n    this.inputEmail.placeholder = 'Email';\n    this.formLogin.appendChild(this.inputEmail);\n\n    this.inputPassword = document.createElement('input');\n    this.inputPassword.classList.add('loginInputs');\n    this.inputPassword.type = 'password';\n    this.inputPassword.name = 'password';\n    this.inputPassword.placeholder = 'Password';\n    this.formLogin.appendChild(this.inputPassword);\n\n    this.inputSubmit = document.createElement('input');\n    this.inputSubmit.value = 'Login';\n    this.inputSubmit.name = 'send';\n    this.inputSubmit.type = 'submit';\n    this.inputSubmit.addEventListener('click', this.eventEnterLogin);\n    this.inputSubmit.classList.add('loginLogoutBtn');\n    this.formLogin.appendChild(this.inputSubmit);\n\n    this.users = [\n      {\n        email:'em@gmail.com',\n        password: 'pw1'\n      },{\n        email: 'email2@gmail.com',\n        password: 'password2'\n      },{\n        email: 'email3@gmail.com',\n        password: 'password3'\n      },{\n        email: 'email4@gmail.com',\n        password: 'password4'\n      },\n    ];\n\n    this.initEE = initEE;\n  }\n\n  init() {\n    this.container.appendChild(this.header);\n    this.container.appendChild(this.formLogin);\n  }\n\n  eventEnterLogin = (event) => {\n    event.preventDefault();\n    \n    let form = event.target.closest(\"form\");\n    let formData = new FormData(form);\n\n    let user = {\n      email: formData.get('email'),\n      password: formData.get('password')\n    };\n\n    this.inputEmail.value = '';\n    this.inputPassword.value = '';\n\n    if (this.checkInputIsCorrect(user)) {\n      this.initEE.emit('isAuthenticated', true);\n    } else {\n      localStorage.setItem('isAuthenticated', false);\n\n      this.inputEmail.placeholder = 'InCorrect Email.';\n      this.inputPassword.placeholder = 'Incorrect Password.';\n      this.inputEmail.focus();\n    }\n  }\n\n  checkInputIsCorrect = (user) => {\n    let testEmail = new RegExp(/\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,6}/);\n\n    if (testEmail.test(user.email)) {\n      for(let users of this.users) {\n        if (users.email === user.email && users.password === user.password) {\n          return true;\n        }\n      }\n    } else {\n      return false;\n    }\n  }\n}\n\n\n\n//# sourceURL=webpack://work1.1/./pages/login.js?");

/***/ }),

/***/ "./src/components/eventEmitter.js":
/*!****************************************!*\
  !*** ./src/components/eventEmitter.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventEmitter)\n/* harmony export */ });\nclass EventEmitter {\n  constructor() {\n    this.events = {\n    };\n  }\n\n  subscribe(eventName, fn) {\n    if(!this.events[eventName]) {\n      this.events[eventName] = [];\n    }\n      \n    this.events[eventName].push(fn);\n    \n    return () => {\n      this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);\n    }\n  }\n\n  emit(eventName, args) {\n    const event = this.events[eventName];\n    event && event.forEach(callback => callback.call(null, args));\n  }\n}\n\n//# sourceURL=webpack://work1.1/./src/components/eventEmitter.js?");

/***/ }),

/***/ "./src/components/footer.js":
/*!**********************************!*\
  !*** ./src/components/footer.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Footer)\n/* harmony export */ });\nclass Footer {\n  constructor(footer, initEE) {\n    this.footer = footer;\n\n    this.initEE = initEE;\n\n    this.span = document.createElement('span');\n    this.ul = document.createElement('ul');\n    this.liAll = document.createElement('li');\n    this.liActive = document.createElement('li');\n    this.liComplited = document.createElement('li');\n    this.buttonDel = document.createElement('button');\n\n    this.liAll.innerHTML = 'All';\n    this.liActive.innerHTML = 'Active';\n    this.liComplited.innerHTML = 'Complited';\n\n    this.buttonDel.innerHTML = 'Clear complited';\n\n    this.liAll.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'all')});\n    this.liActive.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'active')});\n    this.liComplited.addEventListener('click', (event) => {this.initEE.emit('chooseFilter', 'complited')});\n    this.buttonDel.addEventListener('click', () => {this.initEE.emit('delAllChoosed', )});\n\n    this.liAll.id = 'all';\n    this.liActive.id = 'active';\n    this.liComplited.id = 'complited';\n\n    this.ul.classList.add('ulFooter');\n    this.liAll.classList.add('liFooter');\n    this.liActive.classList.add('liFooter');\n    this.liComplited.classList.add('liFooter');\n    this.buttonDel.classList.add('buttonDelFooter');\n\n    this.ul.appendChild(this.liAll);\n    this.ul.appendChild(this.liActive);\n    this.ul.appendChild(this.liComplited);\n\n    this.prevChoosedFilter = 'all';\n  }\n\n  render(index) {\n    this.liAll.classList.add('selected');\n    this.footer.appendChild(this.span);\n    this.footer.appendChild(this.ul);\n\n    this.initEE.subscribe('chooseFilter', (id) => {this.renderClassSelected(id)});\n\n    this.init(index, index);\n  }\n\n  init(todosCounter, todosLength) {\n    this.span.innerHTML = `${todosCounter} items left.`;\n\n    if (todosCounter < todosLength){\n      this.footer.appendChild(this.buttonDel);\n    } else {\n      this.buttonDel.remove();\n    }\n  }\n\n  renderClassSelected = (choosedFilter) => {\n    if (choosedFilter !== this.prevChoosedFilter) {\n      const elemChoosed = document.getElementById(choosedFilter);\n      const elemPrevChoosed = document.getElementById(this.prevChoosedFilter)\n      elemPrevChoosed.classList.remove('selected');\n      elemChoosed.classList.add('selected');\n      this.prevChoosedFilter = choosedFilter;\n    }\n\n    return this.prevChoosedFilter;\n  }\n}\n\n//# sourceURL=webpack://work1.1/./src/components/footer.js?");

/***/ }),

/***/ "./src/components/headerInput.js":
/*!***************************************!*\
  !*** ./src/components/headerInput.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\nclass Header {\n  constructor(container, initEE) {\n    this.container = container;\n    this.initEE = initEE;\n\n    this.checkBoxAll = document.createElement('input');\n    this.checkBoxAll.type = 'checkbox';\n    this.checkBoxAll.classList.add('headerChackBox');\n    this.checkBoxAll.addEventListener('change', (event) => {this.initEE.emit('changeHeaderCheckbox', event)});\n\n    this.input = document.createElement('input');\n    this.input.type = 'text';\n    this.input.className = 'headerInput';\n    this.input.placeholder = 'What needs to be done?';\n    this.input.addEventListener('keydown', (event) => {this.initEE.emit('addTodo', event)});\n    this.input.addEventListener(\"blur\", (event) => {\n      event.target.value = '';\n      event.target.placeholder = 'What needs to be done?';\n    });\n  }\n\n  render() {\n    this.container.appendChild(this.checkBoxAll);\n    this.container.appendChild(this.input);\n  }\n\n  changeHeaderCheckbox(value) {\n    this.checkBoxAll.checked = value;\n  }\n}\n\n//# sourceURL=webpack://work1.1/./src/components/headerInput.js?");

/***/ }),

/***/ "./src/components/navigator.js":
/*!*************************************!*\
  !*** ./src/components/navigator.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Navigator)\n/* harmony export */ });\nclass Navigator {\n  constructor(container, initEE) {\n    this.container = container;\n\n    this.initEE = initEE;\n\n    this.ul = document.createElement('ul');\n    this.ul.classList.add('ulNavSection');\n\n    this.prevChoosedNav = 0;\n    this.countOfPages = 0;\n  }\n\n  render(totalPages) {\n    this.ul.innerHTML = '';\n\n    for(let i = 1; i <= totalPages; i++) {\n      const li = document.createElement('li');\n\n      li.id = i;\n      li.classList.add('liNavSection');\n      li.addEventListener('click', (event) => {this.initEE.emit('clickOnNavEl', parseInt(event.target.id))});\n      li.innerHTML = `${i} page.`;\n\n      this.ul.appendChild(li);\n    }\n\n    if (totalPages > 1) {\n      this.container.appendChild(this.ul);\n      this.ul.lastChild.classList.add('selected');\n    } else {\n      this.ul.remove();\n    }\n\n    this.prevChoosedNav = totalPages;\n  }\n\n  renderClassSelected = (idElem) => {\n    if (idElem !== this.prevChoosedNav) {\n      let elem = document.getElementById(idElem);\n\n      elem.classList.add('selected');\n      this.ul.childNodes[this.prevChoosedNav-1].classList.remove('selected');\n      this.prevChoosedNav = idElem;\n    }\n  }\n\n  init(currentPage, totalPages) {\n    if (this.countOfPages !== totalPages) {\n      this.render(totalPages);\n    }\n\n    if (currentPage !== this.prevChoosedNav) {\n      this.renderClassSelected(currentPage);\n    }\n  }\n}\n\n//# sourceURL=webpack://work1.1/./src/components/navigator.js?");

/***/ }),

/***/ "./src/components/todoList.js":
/*!************************************!*\
  !*** ./src/components/todoList.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TodoList)\n/* harmony export */ });\nclass TodoList {\n  constructor(filterValue, container, initEE) {\n    this.container = container;\n    this.initEE = initEE;\n\n    this.ul = document.createElement('ul');\n    this.ul.classList.add('ulSection');\n\n    this.filterValue = filterValue;\n  }\n\n  render(elemList, currentPage) {\n    this.ul.innerHTML = '';\n\n    currentPage *= this.filterValue;\n\n    for(let i = (currentPage - this.filterValue); i < currentPage; i++) {\n      if (elemList[i]) {\n        this.addOneElem(elemList[i]);\n      }\n    }\n\n    this.container.appendChild(this.ul);\n  }\n\n  addOneElem = (elem) => {\n    const li = document.createElement('li');\n    li.classList.add(\"listItem\");\n\n    const div = document.createElement('div');\n    div.id = elem.id;\n    div.classList.add('box');\n\n    const checkBox = document.createElement('input');\n    checkBox.type = 'checkbox';\n    checkBox.classList.add('liCheckbox');\n    checkBox.checked = elem.isChecked;\n    checkBox.addEventListener('change', (event) => {this.initEE.emit('changeTodoCheckbox', event.target)});\n        \n    const label = document.createElement('label');\n    label.innerHTML = elem.todoName;\n    label.addEventListener('dblclick', (event) => {this.initEE.emit('changeTodoName', event.target)});\n\n    if (elem.isChecked) {\n      label.classList.add('label-item-marced');\n    } else {\n      label.classList.add('label-item-notmarced');\n    }\n\n    const buttonDel = document.createElement('button');\n    buttonDel.innerHTML = 'X';\n    buttonDel.className = 'buttonDel';\n    buttonDel.addEventListener('click', (event) => {this.initEE.emit('removeTodo', event.target)});\n\n    div.appendChild(checkBox);\n    div.appendChild(label);\n    div.appendChild(buttonDel);\n    li.appendChild(div);\n\n    this.ul.appendChild(li);\n  }\n}\n\n//# sourceURL=webpack://work1.1/./src/components/todoList.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./app.js");
/******/ 	
/******/ })()
;