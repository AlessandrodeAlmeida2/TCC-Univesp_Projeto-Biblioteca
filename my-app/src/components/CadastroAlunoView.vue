<template>
    <div class="cadastro-aluno-container">
      <section class="cadastro-aluno">
        <h2>Cadastro de Aluno</h2>
        
        <form @submit.prevent="salvarAluno" class="formulario-cadastro">
          <div class="form-row">
            <div class="form-group">
              <label for="nome">Nome Completo</label>
              <input 
                type="text" 
                id="nome" 
                v-model="aluno.nome" 
                required 
                placeholder="Digite o nome completo"
              >
            </div>
            
            <div class="form-group">
              <label for="ra">Registro Acadêmico (RA)</label>
              <input 
                type="text" 
                id="ra" 
                v-model="aluno.ra" 
                required 
                placeholder="Digite o RA"
              >
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="email">E-mail</label>
              <input 
                type="email" 
                id="email" 
                v-model="aluno.email" 
                required 
                placeholder="Digite o e-mail"
              >
            </div>
            
            <div class="form-group">
              <label for="telefone">Telefone</label>
              <input 
                type="tel" 
                id="telefone" 
                v-model="aluno.telefone" 
                placeholder="(XX) XXXXX-XXXX"
              >
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="turma">Turma</label>
              <select 
                id="turma" 
                v-model="aluno.turma" 
                required
              >
                <option value="">Selecione a turma</option>
                <option value="1º A">1º A</option>
                <option value="1º B">1º B</option>
                <option value="2º A">2º A</option>
                <option value="2º B">2º B</option>
                <option value="3º A">3º A</option>
                <option value="3º B">3º B</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="situacao">Situação</label>
              <select 
                id="situacao" 
                v-model="aluno.situacao" 
                required
              >
                <option value="">Selecione a situação</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Pendente">Pendente</option>
              </select>
            </div>
          </div>
          
          <div class="form-group endereco">
            <label for="endereco">Endereço</label>
            <input 
              type="text" 
              id="endereco" 
              v-model="aluno.endereco" 
              placeholder="Digite o endereço completo"
            >
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn-cancelar" @click="limparFormulario">
              Cancelar
            </button>
            <button type="submit" class="btn-salvar">
              Salvar Aluno
            </button>
          </div>
        </form>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    name: 'CadastroAluno',
    data() {
      return {
        aluno: {
          nome: '',
          ra: '',
          email: '',
          telefone: '',
          turma: '',
          situacao: '',
          endereco: ''
        }
      }
    },
    methods: {
      salvarAluno() {
        // Lógica para salvar o aluno
        console.log('Salvando aluno:', this.aluno);
        
        // Aqui você normalmente faria uma chamada à API
        // Exemplo de validação e envio
        if (this.validarFormulario()) {
          // Enviar dados para o backend
          // this.$api.post('/alunos', this.aluno)
          
          // Limpar formulário após salvar
          this.limparFormulario();
          
          // Opcional: mostrar mensagem de sucesso
          // this.$toast.success('Aluno cadastrado com sucesso!');
        }
      },
      
      validarFormulario() {
        // Validações básicas
        if (!this.aluno.nome || !this.aluno.ra) {
          // this.$toast.error('Preencha todos os campos obrigatórios');
          return false;
        }
        return true;
      },
      
      limparFormulario() {
        this.aluno = {
          nome: '',
          ra: '',
          email: '',
          telefone: '',
          turma: '',
          situacao: '',
          endereco: ''
        };
      }
    }
  }
  </script>
  
  <style scoped>
  .cadastro-aluno-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .cadastro-aluno {
    background-color: var(--cor-branco);
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }
  
  h2 {
    color: var(--cor-azul);
    margin-bottom: 20px;
    border-bottom: 2px solid var(--cor-azul);
    padding-bottom: 10px;
  }
  
  .formulario-cadastro {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .form-row {
    display: flex;
    gap: 20px;
  }
  
  .form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 5px;
    color: var(--cor-cinza-escuro);
    font-weight: 500;
  }
  
  input, 
  select {
    padding: 10px;
    border: 1px solid var(--cor-cinza-claro);
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  input:focus,
  select:focus {
    outline: none;
    border-color: var(--cor-azul);
    box-shadow: 0 0 0 2px rgba(0, 119, 181, 0.2);
  }
  
  .endereco {
    width: 100%;
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 15px;
    margin-top: 20px;
  }
  
  .btn-cancelar, 
  .btn-salvar {
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  
  .btn-cancelar {
    background-color: var(--cor-cinza-claro);
    color: var(--cor-cinza-escuro);
  }
  
  .btn-cancelar:hover {
    background-color: #e0e0e0;
  }
  
  .btn-salvar {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
  }
  
  .btn-salvar:hover {
    background-color: var(--cor-azul-claro);
  }
  
  @media (max-width: 600px) {
    .form-row {
      flex-direction: column;
      gap: 15px;
    }
  }
  </style>