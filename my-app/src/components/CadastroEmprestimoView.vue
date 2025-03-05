<template>
    <section class="cadastro-emprestimos">
      <h2>Cadastro de Empréstimo</h2>
      
      <form @submit.prevent="salvarEmprestimo" class="formulario-emprestimo">
        <div class="form-grupo">
          <label for="aluno">Aluno</label>
          <input 
            type="text" 
            id="aluno" 
            v-model="novoEmprestimo.aluno" 
            placeholder="Nome do aluno"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="livro">Livro</label>
          <select 
            id="livro" 
            v-model="novoEmprestimo.livro"
            required
          >
            <option value="">Selecione um livro</option>
            <option value="Dom Casmurro">Dom Casmurro</option>
            <option value="O Pequeno Príncipe">O Pequeno Príncipe</option>
            <option value="Harry Potter e a Pedra Filosofal">Harry Potter e a Pedra Filosofal</option>
            <option value="A Culpa é das Estrelas">A Culpa é das Estrelas</option>
          </select>
        </div>
  
        <div class="form-grupo">
          <label for="dataRetirada">Data de Retirada</label>
          <input 
            type="date" 
            id="dataRetirada" 
            v-model="novoEmprestimo.dataRetirada"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="dataDevolucao">Data de Devolução</label>
          <input 
            type="date" 
            id="dataDevolucao" 
            v-model="novoEmprestimo.dataDevolucao"
            required
          >
        </div>
  
        <div class="form-grupo">
          <label for="status">Status</label>
          <select 
            id="status" 
            v-model="novoEmprestimo.status"
            required
          >
            <option value="Em Andamento">Em Andamento</option>
            <option value="Atrasado">Atrasado</option>
            <option value="Devolvido">Devolvido</option>
          </select>
        </div>
  
        <div class="form-acoes">
          <button type="submit" class="btn-salvar">
            <i class="fas fa-save"></i> Salvar Empréstimo
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
    name: 'CadastroEmprestimo',
    data() {
      return {
        novoEmprestimo: {
          id: null,
          aluno: '',
          livro: '',
          dataRetirada: '',
          dataDevolucao: '',
          status: 'Em Andamento'
        }
      }
    },
    methods: {
      salvarEmprestimo() {
        // Gerar ID único (apenas para demonstração)
        this.novoEmprestimo.id = Date.now();
  
        // Emitir evento para o componente pai com o novo empréstimo
        this.$emit('emprestimo-adicionado', { ...this.novoEmprestimo });
        
        // Limpar formulário após salvar
        this.limparFormulario();
      },
      limparFormulario() {
        this.novoEmprestimo = {
          id: null,
          aluno: '',
          livro: '',
          dataRetirada: '',
          dataDevolucao: '',
          status: 'Em Andamento'
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .cadastro-emprestimos {
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
  