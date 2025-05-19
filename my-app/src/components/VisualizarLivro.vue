<template>
  <section class="visualizar-livro">
    <h2>Detalhes do Livro</h2>
    <div v-if="carregando">Carregando...</div>
    <div v-else-if="erro" class="erro">{{ erro }}</div>
    <div v-else-if="livro">
      <p><strong>Código:</strong> {{ livro.id }}</p>
      <p><strong>Título:</strong> {{ livro.titulo }}</p>
      <p><strong>Autor:</strong> {{ livro.autor }}</p>
      <p><strong>Categoria:</strong> {{ livro.categoria }}</p>
      <p><strong>Status:</strong> {{ livro.status }}</p>
      <router-link to="/consulta-livros">Voltar</router-link>
    </div>
    <div v-else>Nenhum livro encontrado.</div>
  </section>
</template>

<script>
import { getLivroById } from '../services/livrosService.js';

export default {
  name: 'VisualizarLivro',
  data() {
    return {
      livro: null,
      carregando: true,
      erro: ''
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    try {
      const { data, error } = await getLivroById(id);
      if (error) {
        this.erro = 'Erro ao carregar livro: ' + (error.message || error);
      } else {
        this.livro = data;
      }
    } catch (e) {
      this.erro = 'Erro inesperado ao carregar livro.';
    } finally {
      this.carregando = false;
    }
  }
};
</script>

<style scoped>
.visualizar-livro {
  max-width: 500px;
  margin: 40px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  padding: 32px 24px;
}
.visualizar-livro h2 {
  margin-bottom: 24px;
  color: #0077b5;
}
.visualizar-livro p {
  font-size: 1.1rem;
  margin: 12px 0;
}
.erro {
  color: red;
  margin-bottom: 20px;
}
</style>
