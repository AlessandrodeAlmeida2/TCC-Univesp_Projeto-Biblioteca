<template>
  <section class="lista-livros">
    <h2>Livros Cadastrados</h2>
    <table>
      <thead>
        <tr>
          <th>Código</th>
          <th>Título</th>
          <th>Autor</th>
          <th>Categoria</th>
          <th>Status</th>
          <th>Editar / Excluir</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="livro in livros" :key="livro.id">
          <td>{{ livro.codigo }}</td>
          <td>{{ livro.titulo }}</td>
          <td>{{ livro.autor }}</td>
          <td>{{ livro.categoria }}</td>
          <td>{{ livro.status }}</td>
          <td class="card-desktop">
            <div class="card-acoes">
              <button class="btn-editar" @click="editarLivro(livro)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-excluir" @click="deletarLivro(livro.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
          <td class="card-mobile">
            <div class="card-acoes">
              <button class="btn-editar" @click="editarLivro(livro)">
                <i class="fas fa-edit"></i> Editar
              </button>
              <button class="btn-excluir" @click="deletarLivro(livro.id)">
                <i class="fas fa-trash-alt"></i> Excluir
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <EditarLivroView
      v-if="livroSelecionado"
      :livro="livroSelecionado"
      @livro-atualizado="onLivroAtualizado"
      @cancelar-edicao="livroSelecionado = null"
    />
  </section>
</template>

<script>
import { getLivros, deleteLivro } from '../services/livrosService.js';
import EditarLivroView from './EditarLivroView.vue';

export default {
  name: 'EditarLivros',
  components: { EditarLivroView },
  data() {
    return {
      livros: [],
      livroSelecionado: null,
      erro: '',
      mensagem: ''
    };
  },
  async mounted() {
    await this.carregarLivros();
  },
  methods: {
    async carregarLivros() {
      this.erro = '';
      const { data, error } = await getLivros();
      if (error) {
        this.erro = 'Erro ao carregar livros: ' + (error.message || error);
      } else {
        this.livros = data;
      }
    },
    editarLivro(livro) {
      this.livroSelecionado = { ...livro };
    },
    async deletarLivro(id) {
      if (confirm('Tem certeza que deseja excluir este livro?')) {
        const { error } = await deleteLivro(id);
        if (error) {
          this.erro = 'Erro ao excluir livro: ' + (error.message || error);
        } else {
          this.mensagem = 'Livro excluído com sucesso!';
          await this.carregarLivros();
        }
      }
    },
    onLivroAtualizado(livroAtualizado) {
      this.mensagem = 'Livro atualizado com sucesso!';
      this.livroSelecionado = null;
      this.carregarLivros();
    }
  }
};
</script>

<style scoped>
.lista-livros {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: var(--cor-branco);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
}

.card-desktop {
  display: block;
}

.card-mobile {
  display: none;
}

.card-acoes {
  text-align: center !important;
}

.btn-editar, 
.btn-excluir {
  background: none;
  border: none;
  cursor: pointer;
  margin: 0 5px;
  color: #666;
  transition: color 0.3s;
}

.btn-editar:hover {
  color: #0077b5;
}

.btn-excluir:hover {
  color: #e74c3c;
}

.btn-editar i, 
.btn-excluir i {
  font-size: 1.2rem;
}

/* Responsividade para dispositivos móveis */
@media (max-width: 768px) {
  .lista-livros {
    padding: 15px;
  }
  
  table {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .card-desktop {
    display: none;
  }

  .card-mobile {
    display: block;
  }

  .card-acoes {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .card-acoes .btn-editar,
  .card-acoes .btn-excluir {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .card-acoes .btn-editar {
    background-color: #e6f2ff;
    color: #0077b5;
  }
  
  .card-acoes .btn-excluir {
    background-color: #ffebee;
    color: #e74c3c;
  }
  
  .card-acoes .btn-editar i,
  .card-acoes .btn-excluir i {
    margin-right: 5px;
  }
}

@media (max-width: 576px) {
  /* Transformar tabela em layout de cartões para telas pequenas */
  table, thead, tbody, th, td, tr {
    display: block;
  }
  
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  tr {
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
  }
  
  td {
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid #eee;
    text-align: right;
  }
  
  td:before {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
  }
  
  /* Adicionar os cabeçalhos para cada célula */
  td:nth-of-type(1):before { content: "Código"; }
  td:nth-of-type(2):before { content: "Título"; }
  td:nth-of-type(3):before { content: "Autor"; }
  td:nth-of-type(4):before { content: "Categoria"; }
  td:nth-of-type(5):before { content: "Status"; }
  
  /* Ajustar botões */
  td:last-child {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px;
  }
  
  button {
    padding: 8px;
    margin: 0;
    flex: 1;
    max-width: 80px;
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .lista-livros {
    padding: 10px;
  }
  
  td {
    padding-left: 45%;
  }
  
  /* Para telas muito pequenas, alinhar botões verticalmente */
  td:last-child {
    flex-direction: column;
    padding: 8px;
  }
  
  button {
    max-width: none;
    width: 100%;
    margin: auto;
  }
}
</style>
