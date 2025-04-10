document.addEventListener('DOMContentLoaded', () => {
    
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const errorMessage = document.querySelector('.error-message');
    const emptyMessage = document.getElementById('alert-message');
  
    // Carregar tarefas do localStorage
    let todos = JSON.parse(localStorage.getItem('todos')) || [];
  
    // Salvar tarefas no localStorage
    const saveTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
      updateEmptyMessage();
    };
  
    // Atualizar a mensagem de lista vazia
    const updateEmptyMessage = () => {
      emptyMessage.style.display = todos.length === 0 ? 'block' : 'none';
    };
  
    //Criando um novo item de tarefa
    const createTodoItem = (todo) => {
      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.dataset.id = todo.id;
  
      const checkbox = document.createElement('div');
      checkbox.className = `todo-checkbox ${todo.completed ? 'checked' : ''}`;
      checkbox.innerHTML = todo.completed ? '<i class="ri-check-line"></i>' : '';
  
      const text = document.createElement('span');
      text.className = 'todo-text';
      text.textContent = todo.text;
  
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
  
      li.appendChild(checkbox);
      li.appendChild(text);
      li.appendChild(deleteBtn);
  
      // Event listeners
      checkbox.addEventListener('click', () => toggleTodo(todo.id));
      deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
  
      return li;
    };
  
    // Função para renderizar a lista de tarefas
    const renderTodos = () => {
      todoList.innerHTML = '';
      todos.forEach(todo => {
        todoList.appendChild(createTodoItem(todo));
      });
      updateEmptyMessage();
    };
  
    // Adicionando uma nova tarefa
    const addTodo = (text) => {
      const newTodo = {
        id: Date.now().toString(),
        text: text.trim(),
        completed: false
      };
      todos.push(newTodo);
      saveTodos();
      renderTodos();
    };
  
    // Alternando o estado de uma tarefa
    const toggleTodo = (id) => {
      todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      saveTodos();
      renderTodos();
    };
  
    // Deletar uma tarefa
    const deleteTodo = (id) => {
      todos = todos.filter(todo => todo.id !== id);
      saveTodos();
      renderTodos();
    };
  
    // Event listener para o formulário
    todoForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = todoInput.value;
  
      if (!text.trim()) {
        errorMessage.textContent = 'Por favor, digite uma tarefa';
        todoForm.classList.add('shake');
        setTimeout(() => todoForm.classList.remove('shake'), 300);
        return;
      }
  
      if (text.length > 100) {
        errorMessage.textContent = 'A tarefa não pode ter mais de 100 caracteres';
        return;
      }
  
      errorMessage.textContent = '';
      addTodo(text);
      todoInput.value = '';
    });
  
    // Inicializar a lista
    renderTodos();
  });