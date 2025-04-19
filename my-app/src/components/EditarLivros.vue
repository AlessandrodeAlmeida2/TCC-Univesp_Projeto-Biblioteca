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
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="livro in livros" :key="livro.id">
          <td>{{ livro.codigo }}</td>
          <td>{{ livro.titulo }}</td>
          <td>{{ livro.autor }}</td>
          <td>{{ livro.categoria }}</td>
          <td>{{ livro.status }}</td>
          <td>
            <button @click="editarLivro(livro)">Editar</button>
            <button @click="deletarLivro(livro.id)">Excluir</button>
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
button {
  margin-right: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:first-of-type {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
}
button:last-of-type {
  background-color: var(--cor-vermelho);
  color: var(--cor-branco);
}
</style>
