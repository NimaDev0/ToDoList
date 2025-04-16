class Todo{
    constructor(title){
        this.title = title;
        this.isCompelete = false;
    }
}

class TodoList {
    constructor(todosContainer) {
        this.todosContainer = todosContainer;
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.todoInput = document.querySelector('input');
        this.addBtn = document.querySelector('#addButton');
        this.clearBtn = document.querySelector('#clearButton');

        this.render();
    }

    render(){
        console.log('start is login');
        this.todosContainer.innerHTML = '';

        this.addBtn.addEventListener('click',() => {
            this.addNewTodo(this.todoInput.value);
        })

        this.clearBtn.addEventListener('click', () => {
            this.clearNewTodo();
        })

        this.addTodosToDom();
        this.saveTodosIntoLocalStorage();
    }

    addTodosToDom(){

        this.todosContainer.innerHTML = '';
        
        this.todos.forEach((todo,todoIndex) => {

            let li = document.createElement('li')
            li.className = 'completed well';
            
            let todoTitle = document.createElement('label');
            todoTitle.innerHTML = todo.title;
            todo.isCompelete ? todoTitle.classList.add('todo-completed') : null;

            let completeBtn = document.createElement('button');
            completeBtn.className = 'btn btn-success';
            completeBtn.innerHTML = 'Complete';
            completeBtn.addEventListener('click',(event) => {
                event.target.previousSibling.classList.toggle('todo-completed'); 
                todo.isCompelete = !todo.isCompelete;
                this.saveTodosIntoLocalStorage();
                this.addTodosToDom();
            })

            let removeBtn = document.createElement('button');
            removeBtn.className = 'btn btn-danger';
            removeBtn.innerHTML = 'Remove';
            removeBtn.addEventListener('click',(event) =>{
                this.todosContainer.removeChild(li);

                let mainTodoIndex = this.todos.findIndex((todo,index)=> index === todoIndex);
                this.todos.splice(mainTodoIndex,1);

                this.saveTodosIntoLocalStorage();
                this.addTodosToDom();
            })

            li.append(todoTitle,completeBtn,removeBtn);
            this.todosContainer.append(li);

            this.todoInput.value = '';
        })
    }

    saveTodosIntoLocalStorage(){
        localStorage.setItem('todos',JSON.stringify(this.todos))
    }

    addNewTodo(newTodoList){
        console.log('added new Todo',newTodoList)
        if(newTodoList.trim()){
            this.todos.push(new Todo(newTodoList));
            this.saveTodosIntoLocalStorage();
            this.addTodosToDom();
        }
    }
    clearNewTodo(){
        console.log('delete todos')
        this.todos = [];
        this.saveTodosIntoLocalStorage();
        this.render();
    }
}

new TodoList(document.querySelector('#todoList'));