// Pega os elementos da página que vamos usar
const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const counter = document.getElementById('counter');
const card = document.querySelector('.card');

// Nossa "lista de tarefas" começa vazia.
// Cada tarefa é um objeto: { id, text, done }
let tasks = [];

// Quando o formulário é enviado (usuário aperta Enter ou clica no +)
form.addEventListener('submit', function (event) {
  event.preventDefault(); // evita que a página recarregue

  const text = input.value.trim();
  if (text === '') return; // não adiciona tarefa vazia

  tasks.push({
    id: Date.now(), // um número único baseado no horário atual
    text: text,
    done: false
  });

  input.value = '';
  render();
});

// Desenha a lista inteira na tela, do zero, toda vez que algo muda
function render() {
  list.innerHTML = '';

  tasks.forEach(function (task) {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.done ? ' done' : '');

    li.innerHTML = `
      <span class="check">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 8L6 12L14 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </span>
      <span class="text">${task.text}</span>
      <button class="remove" aria-label="Remover tarefa">×</button>
    `;

    // Marcar/desmarcar como concluída ao clicar no texto ou no quadradinho
    li.querySelector('.check').addEventListener('click', () => toggleTask(task.id));
    li.querySelector('.text').addEventListener('click', () => toggleTask(task.id));

    // Remover tarefa
    li.querySelector('.remove').addEventListener('click', () => removeTask(task.id));

    list.appendChild(li);
  });

  updateCounter();
  card.classList.toggle('is-empty', tasks.length === 0);
}

function toggleTask(id) {
  tasks = tasks.map(function (task) {
    if (task.id === id) {
      return { ...task, done: !task.done };
    }
    return task;
  });
  render();
}

function removeTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });
  render();
}

function updateCounter() {
  const total = tasks.length;
  const pendentes = tasks.filter(t => !t.done).length;

  if (total === 0) {
    counter.textContent = 'Nenhuma tarefa ainda';
  } else if (pendentes === 0) {
    counter.textContent = 'Tudo concluído! 🎉';
  } else {
    counter.textContent = `${pendentes} de ${total} tarefa${total > 1 ? 's' : ''} pendente${pendentes > 1 ? 's' : ''}`;
  }
}

// Desenha a tela pela primeira vez (lista vazia)
render();
