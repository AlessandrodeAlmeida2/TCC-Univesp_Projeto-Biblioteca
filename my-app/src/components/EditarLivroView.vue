<template>
  <div class="modal-backdrop">
    <section class="edicao-livros modal-content">
      <h2>Edição de Livro</h2>
      
      <form @submit.prevent="atualizarLivro" class="formulario-livro">
        <div class="form-grupo">
          <label for="codigo">ISBN</label>
          <input 
            type="text" 
            id="codigo" 
            v-model="livroEditado.codigo" 
            placeholder="Digite o ISBN do livro"
            readonly
          >
        </div>
  
        <div class="form-grupo">
          <label for="titulo">Título</label>
          <input 
            type="text" 
            id="titulo" 
            v-model="livroEditado.titulo" 
            placeholder="Digite o título do livro"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="autor">Autor</label>
          <input 
            type="text" 
            id="autor" 
            v-model="livroEditado.autor" 
            placeholder="Digite o nome do autor"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="categoria">Categoria</label>
          <select 
            id="categoria" 
            v-model="livroEditado.categoria"
            required
          >
          <option value="">Selecione uma categoria</option>
            <option value="Literatura Brasileira">Literatura Brasileira</option>
            <option value="Literatura Infantil">Literatura Infantil</option>
            <option value="Literatura Estrangeira">Literatura Estrangeira</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Romance">Romance</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="História">História</option>
          </select>
        </div>

        <div class="form-grupo">
          <label for="editora">Editora</label>
          <input 
            type="text" 
            id="editora" 
            v-model="livroEditado.editora" 
            placeholder="Digite o nome da editora"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="edicao">Edição</label>
          <input 
            type="text" 
            id="edicao" 
            v-model="livroEditado.edicao" 
            placeholder="Digite a edição"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="num_pag">Número de Páginas</label>
          <input 
            type="number" 
            id="num_pag" 
            v-model="livroEditado.num_pag" 
            placeholder="Digite o número de páginas"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="data_pub">Data de Publicação</label>
          <input 
            type="date" 
            id="data_pub" 
            v-model="livroEditado.data_pub" 
            required
          >
        </div>

        <div class="form-grupo">
          <label for="data_aq">Data de Aquisição</label>
          <input 
            type="date" 
            id="data_aq" 
            v-model="livroEditado.data_aq" 
            required
          >
        </div>

        <div class="form-grupo">
          <label for="observacoes">Observações</label>
          <textarea 
            id="observacoes" 
            v-model="livroEditado.observacoes"
            placeholder="Observações (opcional)"
            rows="2"
          ></textarea>
        </div>
  
        <div class="form-grupo">
          <label for="status">Status</label>
          <select 
            id="status" 
            v-model="livroEditado.status"
            required
          >
            <option value="Disponivel">Disponível</option>
            <option value="Emprestado">Emprestado</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>
  
        <div class="form-acoes">
          <button type="submit" class="btn-atualizar">
            <i class="fas fa-save"></i> Atualizar Livro
          </button>
          <button type="button" class="btn-cancelar" @click="cancelarEdicao">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
      <p v-if="mensagem" style="color: green">{{ mensagem }}</p>
      <p v-if="erro" style="color: red">{{ erro }}</p>
    </section>
  </div>
</template>
  
  <script>
  import { updateLivro, getLivroById } from '../services/livrosService.js';

  export default {
    name: 'EdicaoLivro',
    props: {
      livro: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        livroEditado: { ...this.livro },
        mensagem: '',
        erro: ''
      }
    },
    methods: {
      async atualizarLivro() {
        this.mensagem = '';
        this.erro = '';
        // Converter status para o padrão do banco
        let statusDb = this.livroEditado.status;
        if (statusDb === 'Disponivel') statusDb = 'Disponivel';
        // Montar objeto para atualização
        const updates = {
          titulo: this.livroEditado.titulo,
          autor: this.livroEditado.autor,
          categoria: this.livroEditado.categoria,
          editora: this.livroEditado.editora,
          edicao: this.livroEditado.edicao,
          num_pag: this.livroEditado.num_pag,
          data_pub: this.livroEditado.data_pub,
          data_aq: this.livroEditado.data_aq,
          observacoes: this.livroEditado.observacoes,
          status: statusDb
        };
        try {
          const { data, error } = await updateLivro(this.livroEditado.id, updates);
          if (error) {
            this.erro = 'Erro ao atualizar livro: ' + (error.message || error);
          } else {
            this.mensagem = 'Livro atualizado com sucesso!';
            // Emitir evento para o pai atualizar a lista
            this.$emit('livro-atualizado', { ...this.livroEditado, ...updates });
          }
        } catch (e) {
          this.erro = 'Erro inesperado ao atualizar livro.';
        }
      },
      cancelarEdicao() {
        this.$emit('cancelar-edicao');
      }
    }
  }
  </script>
  
  <style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }

  .edicao-livros.modal-content {
    max-width: 600px;
    width: 100%;
    max-height: 100vh;
    overflow-y: auto;
    background-color: var(--cor-branco);
    border-radius: 8px;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
    padding: 32px 24px;
    position: relative;
  }
  
  .formulario-livro {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-grupo {
    display: flex;
    flex-direction: column;
  }
  
  .form-grupo label {
    margin-bottom: 5px;
    color: var(--cor-azul);
    font-weight: 500;
  }
  
  .form-grupo input, 
  .form-grupo select {
    padding: 10px;
    border: 1px solid var(--cor-cinza-claro);
    border-radius: 4px;
    font-size: 1rem;
  }
  
  .form-grupo input[readonly] {
    background-color: var(--cor-cinza-claro);
    cursor: not-allowed;
  }
  
  .form-acoes {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .btn-atualizar, .btn-cancelar {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
  }
  
  .btn-atualizar {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
  }
  
  .btn-cancelar {
    background-color: var(--cor-vermelho);
    color: var(--cor-branco);
  }
  </style>
  