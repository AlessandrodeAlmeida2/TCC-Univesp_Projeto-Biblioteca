<template>
  <section class="consulta-livros">
      <h2>Consulta de Livros</h2>
      
      <!-- Versão Desktop -->
      <div class="tabela-desktop">
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
      </div>

      <!-- Versão Mobile -->
      <div class="tabela-mobile">
          <div v-for="livro in livros" :key="livro.codigo" class="card-livro">
              <div class="card-header">
                  <span class="titulo">{{ livro.titulo }}</span>
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
              </div>
              <div class="card-body">
                  <div class="info-linha">
                      <strong>Código:</strong> {{ livro.codigo }}
                  </div>
                  <div class="info-linha">
                      <strong>Autor:</strong> {{ livro.autor }}
                  </div>
                  <div class="info-linha">
                      <strong>Categoria:</strong> {{ livro.categoria }}
                  </div>
              </div>
              <div class="card-acoes">
                  <button class="btn-table" @click="visualizarLivro(livro)">
                      <i class="fas fa-eye"></i> Visualizar
                  </button>
                  <button class="btn-table" @click="editarLivro(livro)">
                      <i class="fas fa-edit"></i> Editar
                  </button>
                  <button class="btn-table btn-excluir" @click="excluirLivro(livro)">
                      <i class="fas fa-trash-alt"></i> Excluir
                  </button>
              </div>
          </div>
      </div>

      <a href="#" class="ver-todos">Ver todos os livros</a>
  </section>
</template>

<script>
import { getLivros } from '../services/livrosService.js';

export default {
  name: 'ConsultaLivro',
  data() {
    return {
      livros: [],
      carregando: false,
      erro: ''
    };
  },
  async mounted() {
    this.carregando = true;
    try {
      const { data, error } = await getLivros();
      if (error) {
        this.erro = 'Erro ao carregar livros: ' + (error.message || error);
      } else {
        this.livros = data;
      }
    } catch (e) {
      this.erro = 'Erro inesperado ao carregar livros.';
    } finally {
      this.carregando = false;
    }
  },
  methods: {
    visualizarLivro(livro) {
      // Lógica para visualizar detalhes do livro
      console.log('Visualizando livro:', livro);
    },
    editarLivro(livro) {
      // Lógica para editar livro
      this.$router.push({ name: 'editar-livro', params: { id: livro.id }});
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

/* Estilos da Tabela Desktop */
.tabela-desktop {
display: block;
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

/* Estilos da Versão Mobile */
.tabela-mobile {
display: none;
}

@media screen and (max-width: 768px) {
.tabela-desktop {
  display: none;
}

.tabela-mobile {
  display: block;
}

.card-livro {
  background-color: var(--cor-branco);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  padding: 15px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid var(--cor-cinza-claro);
  padding-bottom: 10px;
}

.card-header .titulo {
  font-weight: bold;
  font-size: 1rem;
  flex-grow: 1;
  margin-right: 10px;
}

.card-body {
  margin-bottom: 15px;
}

.info-linha {
  margin-bottom: 8px;
  color: #555;
}

.card-acoes {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.card-acoes .btn-table {
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  background-color: var(--cor-cinza-claro);
  color: var(--cor-azul);
  border-radius: 4px;
  font-size: 0.9rem;
}

.card-acoes .btn-table i {
  margin-right: 5px;
}

.card-acoes .btn-excluir {
  background-color: #FFEBEE;
  color: var(--cor-vermelho);
}
}
</style>
