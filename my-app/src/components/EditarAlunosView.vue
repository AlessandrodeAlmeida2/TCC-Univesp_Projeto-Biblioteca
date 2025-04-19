<template>
  <div class="editar-aluno-container">
    <header class="page-header">
      <h1>Editar Aluno</h1>
    </header>
    
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Buscar aluno..." 
        v-model="searchQuery" 
        class="search-input"
      >
      <button class="search-button">
        <i class="fas fa-search"></i>
      </button>
    </div>

    <!-- Versão Desktop -->
    <div class="tabela-desktop">
      <table class="alunos-table">
        <thead>
          <tr>
            <th>RA</th>
            <th>Nome do Aluno</th>
            <th>Editar / Excluir</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="aluno in filteredAlunos" :key="aluno.ra">
            <td>{{ aluno.ra }}</td>
            <td>{{ aluno.nome }}</td>
            <td class="acoes">
              <button class="btn-editar" @click="editarAluno(aluno)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-excluir" @click="excluirAluno(aluno)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Versão Mobile -->
    <div class="tabela-mobile">
      <div 
        v-for="aluno in filteredAlunos" 
        :key="aluno.ra" 
        class="card-aluno"
      >
        <div class="card-header">
          <span class="nome">{{ aluno.nome }}</span>
          <span class="ra">RA: {{ aluno.ra }}</span>
        </div>
        <div class="card-acoes">
          <button 
            class="btn-editar" 
            @click="editarAluno(aluno)"
          >
            <i class="fas fa-edit"></i> Editar
          </button>
          <button 
            class="btn-excluir" 
            @click="excluirAluno(aluno)"
          >
            <i class="fas fa-trash-alt"></i> Excluir
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import alunoService from '../services/alunoService';

export default {
  name: 'EditarAlunos',
  data() {
    return {
      searchQuery: '',
      alunos: [],
      carregando: false,
      erro: null
    };
  },
  computed: {
    filteredAlunos() {
      if (!this.searchQuery) return this.alunos;
      const query = this.searchQuery.toLowerCase();
      return this.alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(query) ||
        (aluno.ra && aluno.ra.includes(this.searchQuery))
      );
    }
  },
  methods: {
    editarAluno(aluno) {
      this.$router.push(`/editar-aluno/${aluno.ra}`);
    },
    async carregarAlunos() {
      this.carregando = true;
      try {
        this.alunos = await alunoService.listarAlunos();
      } catch (e) {
        this.erro = 'Erro ao carregar alunos.';
      } finally {
        this.carregando = false;
      }
    }
  },
  mounted() {
    this.carregarAlunos();
  }
};
</script>


<style scoped>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';

.editar-aluno-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  background-color: #f3f3f3;
  padding: 10px 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.page-header h1 {
  margin: 0;
  color: #333;
  font-size: 1.5rem;
}

.search-container {
  display: flex;
  margin-bottom: 20px;
  max-width: 400px;
}

.search-input {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px 0 0 4px;
}

.search-button {
  padding: 10px 15px;
  background-color: #0077b5;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

/* Estilos da Tabela Desktop */
.tabela-desktop {
  display: block;
}

.alunos-table {
  width: 100%;
  border-collapse: collapse;
}

.alunos-table th, 
.alunos-table td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

.alunos-table th {
  background-color: #f3f3f3;
  font-weight: bold;
  color: #333;
}

.acoes {
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
  
  .search-container {
    max-width: 100%;
  }
  
  .card-aluno {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 15px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .card-header .nome {
    font-weight: bold;
    font-size: 1rem;
  }
  
  .card-header .ra {
    color: #666;
    font-size: 0.9rem;
  }
  
  .card-acoes {
    display: flex;
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
</style>
