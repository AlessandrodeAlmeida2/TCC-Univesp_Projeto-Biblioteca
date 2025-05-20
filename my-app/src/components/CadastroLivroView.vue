<template>
    <section class="cadastro-livros">
      <h2>Cadastro de Livro</h2>
      
      <form @submit.prevent="salvarLivro" class="formulario-livro">
        <div class="form-grupo">
          <label for="codigo">ISBN</label>
          <input 
            type="text" 
            id="codigo" 
            v-model="novoLivro.codigo" 
            placeholder="Digite o ISBN"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="num_cham">Número de Chamada</label>
          <input 
            type="text" 
            id="num_cham" 
            v-model="novoLivro.num_cham" 
            placeholder="Digite o número de chamada"
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
            v-model="novoLivro.editora" 
            placeholder="Digite o nome da editora"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="edicao">Edição</label>
          <input 
            type="text" 
            id="edicao" 
            v-model="novoLivro.edicao" 
            placeholder="Digite a edição"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="num_pag">Número de Páginas</label>
          <input 
            type="number" 
            id="num_pag" 
            v-model="novoLivro.num_pag" 
            placeholder="Digite o número de páginas"
            required
          >
        </div>

        <div class="form-grupo">
          <label for="data_pub">Data de Publicação</label>
          <input 
            type="date" 
            id="data_pub" 
            v-model="novoLivro.data_pub" 
            required
          >
        </div>

        <div class="form-grupo">
          <label for="data_aq">Data de Aquisição</label>
          <input 
            type="date" 
            id="data_aq" 
            v-model="novoLivro.data_aq" 
            required
          >
        </div>

        <div class="form-grupo">
          <label for="observacoes">Observações</label>
          <textarea 
            id="observacoes" 
            v-model="novoLivro.observacoes"
            placeholder="Observações (opcional)"
            rows="2"
          ></textarea>
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
import { createLivro } from '../services/livrosService.js';

export default {
  name: 'CadastroLivro',
  data() {
    return {
      novoLivro: {
        codigo: '',
        titulo: '',
        num_cham: '',
        autor: '',
        categoria: '',
        editora: '',
        edicao: '',
        num_pag: '',
        data_pub: '',
        data_aq: '',
        observacoes: '',
        status: 'Disponível'
      },
      mensagem: '',
      erro: ''
    };
  },
  methods: {
    async salvarLivro() {
      this.mensagem = '';
      this.erro = '';
      // Converter status para o padrão do banco
      let statusDb = this.novoLivro.status;
      if (statusDb === 'Disponível') statusDb = 'Disponivel';
      // Montar objeto conforme tabela
      const livroParaSalvar = {
        codigo: this.novoLivro.codigo,
        titulo: this.novoLivro.titulo,
        num_cham: this.novoLivro.num_cham,
        autor: this.novoLivro.autor,
        categoria: this.novoLivro.categoria,
        editora: this.novoLivro.editora,
        edicao: this.novoLivro.edicao,
        num_pag: this.novoLivro.num_pag,
        data_pub: this.novoLivro.data_pub,
        data_aq: this.novoLivro.data_aq,
        observacoes: this.novoLivro.observacoes,
        status: statusDb
      };
      try {
        const { data, error } = await createLivro(livroParaSalvar);
        console.log('Tentando cadastrar livro:', livroParaSalvar);
        console.log('Resposta do Supabase:', { data, error });
        if (error) {
          this.erro = 'Erro ao cadastrar livro: ' + (error.message || JSON.stringify(error));
          alert(this.erro);
        } else if (!data || (Array.isArray(data) && data.length === 0)) {
          this.erro = 'Livro não foi cadastrado. Nenhum dado retornado.';
          alert(this.erro);
        } else {
          alert('Livro cadastrado com sucesso!');
          this.limparFormulario();
        }
      } catch (e) {
        this.erro = 'Erro inesperado ao cadastrar livro.';
        alert('Erro inesperado ao cadastrar livro: ' + (e.message || e));
      }
    },
    limparFormulario() {
      this.novoLivro = {
        codigo: '',
        titulo: '',
        num_cham: '',
        autor: '',
        categoria: '',
        editora: '',
        edicao: '',
        num_pag: '',
        data_pub: '',
        data_aq: '',
        observacoes: '',
        status: 'Disponível'
      };
    }
  }
};
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
  