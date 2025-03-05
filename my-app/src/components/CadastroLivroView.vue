<template>
    <section class="cadastro-livros">
      <h2>Cadastro de Livro</h2>
      
      <form @submit.prevent="salvarLivro" class="formulario-livro">
        <div class="form-grupo">
          <label for="codigo">Código do Livro</label>
          <input 
            type="text" 
            id="codigo" 
            v-model="novoLivro.codigo" 
            placeholder="Digite o código"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="titulo">Título</label>
          <input 
            type="text" 
            id="titulo" 
            v-model="novoLivro.titulo" 
            placeholder="Digite o título do livro"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="autor">Autor</label>
          <input 
            type="text" 
            id="autor" 
            v-model="novoLivro.autor" 
            placeholder="Digite o nome do autor"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="categoria">Categoria</label>
          <select 
            id="categoria" 
            v-model="novoLivro.categoria"
            required
          >
            <option value="">Selecione uma categoria</option>
            <option value="Literatura Brasileira">Literatura Brasileira</option>
            <option value="Literatura Infantil">Literatura Infantil</option>
            <option value="Fantasia">Fantasia</option>
            <option value="Romance">Romance</option>
            <option value="Ficção Científica">Ficção Científica</option>
            <option value="História">História</option>
          </select>
        </div>
  
        <div class="form-grupo">
          <label for="status">Status</label>
          <select 
            id="status" 
            v-model="novoLivro.status"
            required
          >
            <option value="">Selecione o status</option>
            <option value="Disponível">Disponível</option>
            <option value="Emprestado">Emprestado</option>
            <option value="Reservado">Reservado</option>
          </select>
        </div>
  
        <div class="form-acoes">
          <button type="submit" class="btn-salvar">
            <i class="fas fa-save"></i> Salvar Livro
          </button>
          <button type="button" class="btn-cancelar" @click="limparFormulario">
            <i class="fas fa-times"></i> Cancelar
          </button>
        </div>
      </form>
    </section>
  </template>
  
  <script>
  export default {
    name: 'CadastroLivro',
    data() {
      return {
        novoLivro: {
          codigo: '',
          titulo: '',
          autor: '',
          categoria: '',
          status: 'Disponível'
        }
      }
    },
    methods: {
      salvarLivro() {
        // Emitir evento para o componente pai com o novo livro
        this.$emit('livro-adicionado', { ...this.novoLivro });
        
        // Limpar formulário após salvar
        this.limparFormulario();
      },
      limparFormulario() {
        this.novoLivro = {
          codigo: '',
          titulo: '',
          autor: '',
          categoria: '',
          status: 'Disponível'
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .cadastro-livros {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--cor-branco);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
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
  
  .form-acoes {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }
  
  .btn-salvar, .btn-cancelar {
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1rem;
  }
  
  .btn-salvar {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
  }
  
  .btn-cancelar {
    background-color: var(--cor-vermelho);
    color: var(--cor-branco);
  }
  </style>
  