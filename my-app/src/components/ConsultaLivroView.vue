<template>
    <section class="consulta-livros">
        <h2>Consulta de Livros</h2>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="livro in livros" :key="livro.codigo">
              <td>{{ livro.codigo }}</td>
              <td>{{ livro.titulo }}</td>
              <td>{{ livro.autor }}</td>
              <td>{{ livro.categoria }}</td>
              <td>
                <span 
                  class="status" 
                  :class="{
                    'disponivel': livro.status === 'Disponível',
                    'emprestado': livro.status === 'Emprestado',
                    'reservado': livro.status === 'Reservado'
                  }"
                >
                  {{ livro.status }}
                </span>
              </td>
              <td>
                <button class="btn-table" @click="visualizarLivro(livro)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-table" @click="editarLivro(livro)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-table" @click="excluirLivro(livro)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="ver-todos">Ver todos os livros</a>
    </section>
</template>

<script>
export default {
  name: 'ConsultaLivro',
  data() {
    return {
      livros: [
        {
          codigo: 'L001',
          titulo: 'Dom Casmurro',
          autor: 'Machado de Assis',
          categoria: 'Literatura Brasileira',
          status: 'Emprestado'
        },
        {
          codigo: 'L002',
          titulo: 'O Pequeno Príncipe',
          autor: 'Antoine de Saint-Exupéry',
          categoria: 'Literatura Infantil',
          status: 'Disponível'
        },
        {
          codigo: 'L003',
          titulo: 'Harry Potter e a Pedra Filosofal',
          autor: 'J.K. Rowling',
          categoria: 'Fantasia',
          status: 'Reservado'
        },
        {
          codigo: 'L004',
          titulo: 'A Culpa é das Estrelas',
          autor: 'John Green',
          categoria: 'Romance',
          status: 'Disponível'
        }
      ]
    }
  },
  methods: {
    visualizarLivro(livro) {
      // Lógica para visualizar detalhes do livro
      console.log('Visualizando livro:', livro);
    },
    editarLivro(livro) {
      // Lógica para editar livro
      console.log('Editando livro:', livro);
    },
    excluirLivro(livro) {
      // Lógica para excluir livro
      console.log('Excluindo livro:', livro);
    }
  }
}
</script>

<style scoped>
.consulta-livros {
  margin-bottom: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--cor-branco);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  font-weight: 500;
}

tr:nth-child(even) {
  background-color: var(--cor-cinza-claro);
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: inline-block;
}

.status.disponivel {
  background-color: #E8F5E9;
  color: #388E3C;
}

.status.emprestado {
  background-color: #FFF8E1;
  color: #FF8F00;
}

.status.reservado {
  background-color: #FFEBEE;
  color: var(--cor-vermelho);
}

.btn-table {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--cor-azul);
  margin-right: 5px;
  font-size: 1rem;
}

.btn-table:hover {
  color: var(--cor-azul-claro);
}

.ver-todos {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: var(--cor-azul);
  text-decoration: none;
}

.ver-todos:hover {
  text-decoration: underline;
}
</style>