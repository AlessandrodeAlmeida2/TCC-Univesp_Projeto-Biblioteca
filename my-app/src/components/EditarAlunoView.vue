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
  </template>
  
  <script>
  export default {
    name: 'EditarAlunoView',
    data() {
      return {
        searchQuery: '',
        alunos: [
          { ra: '076245/8570', nome: 'Luiza Souza Ferreira' },
          { ra: '746697480/1', nome: 'Erick Dias Lima' },
          { ra: '455538/6233', nome: 'Luis Rodrigues Cunha' },
          { ra: '407688/7244', nome: 'Maria Oliveira Gomes' },
          { ra: '318602/5363', nome: 'Eduardo Souza Fernandes' },
          { ra: '474740/9869', nome: 'Leticia Castro Martins' }
        ]
      }
    },
    computed: {
      filteredAlunos() {
        return this.alunos.filter(aluno => 
          aluno.nome.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          aluno.ra.includes(this.searchQuery)
        )
      }
    },
    methods: {
      editarAluno(aluno) {
        // Lógica para editar aluno
        console.log('Editando aluno:', aluno)
      },
      excluirAluno(aluno) {
        // Lógica para excluir aluno
        console.log('Excluindo aluno:', aluno)
      }
    }
  }
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
  </style>