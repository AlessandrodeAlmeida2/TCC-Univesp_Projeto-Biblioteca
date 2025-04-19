<template>
  <section class="edicao-emprestimos">
    <h2>Cadastro de Empréstimo</h2>
    <form @submit.prevent="cadastrarEmprestimo" class="formulario-emprestimo">
      
      <div class="form-grupo">
        <label for="aluno_id">Aluno</label>
        <select 
          id="aluno_id" 
          v-model="emprestimoEditado.aluno_id"
          required
        >
          <option value="">Selecione um aluno</option>
          <option v-for="aluno in alunos" :key="aluno.id" :value="aluno.id">
            {{ aluno.nome }}
          </option>
        </select>
      </div>
      <div class="form-grupo">
        <label for="livro_id">Livro</label>
        <select 
          id="livro_id" 
          v-model="emprestimoEditado.livro_id"
          required
        >
          <option value="">Selecione um livro</option>
          <option v-for="livro in livros" :key="livro.id" :value="livro.id">
            {{ livro.titulo }}
          </option>
        </select>
      </div>
      <div class="form-grupo">
        <label for="data_retirada">Data de Retirada</label>
        <input 
          type="date" 
          id="data_retirada" 
          v-model="emprestimoEditado.data_retirada"
          required
        >
      </div>
      <div class="form-grupo">
        <label for="data_devolucao_prevista">Data de Devolução Prevista</label>
        <input 
          type="date" 
          id="data_devolucao_prevista" 
          v-model="emprestimoEditado.data_devolucao_prevista"
          required
        >
      </div>
      <div class="form-grupo">
        <label for="status">Status</label>
        <select 
          id="status" 
          v-model="emprestimoEditado.status"
          required
        >
          <option value="Em Andamento">Em Andamento</option>
          <option value="Atrasado">Atrasado</option>
          <option value="Devolvido">Devolvido</option>
        </select>
      </div>
      <div class="form-grupo">
        <label for="observacoes">Observações</label>
        <textarea 
          id="observacoes" 
          v-model="emprestimoEditado.observacoes"
          placeholder="Observações (opcional)"
          rows="2"
        ></textarea>
      </div>
      <div class="form-acoes">
        <button type="submit" class="btn-cadastrar">
          <i class="fas fa-save"></i> Cadastrar Empréstimo
        </button>
        <button type="button" class="btn-cancelar" @click="cancelarEdicao">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
    </form>
  </section>
</template>

<script>
import { supabase } from '../supabase'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'CadastroEmprestimo',
  data() {
    return {
      emprestimoEditado: {
        aluno_id: '',
        livro_id: '',
        data_retirada: '',
        data_devolucao_prevista: '',
        status: '',
        observacoes: ''
      },
      alunos: [],
      livros: []
    }
  },
  async mounted() {
    const route = useRoute();
    const id = route.params.id;
    await this.buscarAlunos();
    await this.buscarLivros();
  },
  methods: {
    async buscarAlunos() {
      const { data, error } = await supabase
        .from('alunos')
        .select('id, nome');
      if (!error) this.alunos = data;
    },
    async buscarLivros() {
      const { data, error } = await supabase
        .from('livros')
        .select('id, titulo, status');
      if (!error) this.livros = data;
    },
    async cadastrarEmprestimo() {
      const { id, ...dados } = this.emprestimoEditado;
      const { error } = await supabase
        .from('emprestimos')
        .insert(dados);
      if (error) {
        alert('Erro ao cadastrar empréstimo!');
      } else {
        await this.alterarStatusLivro();
        alert('Empréstimo cadastrado com sucesso!');
        this.$router.push('/cadastro-emprestimo');
      }
    },
    async alterarStatusLivro() {
      const { error } = await supabase
        .from('livros')
        .update({ status: 'indisponivel' })
        .eq('id', this.emprestimoEditado.livro_id);
      if (error) {
        alert('Erro ao alterar status do livro!');
      }
    },
    cancelarEdicao() {
      this.$router.push('/cadastro-emprestimo');
    }
  }
}
</script>

  <style scoped>
  .edicao-emprestimos {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--cor-branco);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .formulario-emprestimo {
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
  
  .btn-cadastrar {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
  }
  
  .btn-cancelar {
    background-color: var(--cor-vermelho);
    color: var(--cor-branco);
  }
  </style>
  