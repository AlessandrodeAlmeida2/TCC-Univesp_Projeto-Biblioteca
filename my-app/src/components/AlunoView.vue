<template>
    <div class="aluno-dashboard">
      <header class="page-header">
        <h1>Minha Biblioteca</h1>
        <div class="user-info">
          <img src="" alt="Foto do Aluno" class="profile-image" />
          <div class="user-details">
            <h2>Maria Silva</h2>
            <p>RA: 2025.1234</p>
          </div>
        </div>
      </header>
  
      <main class="aluno-content">
        <section class="livros-disponiveis">
          <h2>Reservar Livros</h2>
          
          <div class="filtros">
            <input 
              type="text" 
              v-model="searchQuery" 
              placeholder="Buscar livros por título, autor ou categoria"
              class="search-input"
            />
            <select v-model="categoriaFiltro" class="categoria-select">
              <option value="">Todas as Categorias</option>
              <option value="literatura">Literatura</option>
              <option value="cientifica">Científica</option>
              <option value="historia">História</option>
              <option value="romance">Romance</option>
            </select>
          </div>
  
          <div class="lista-livros">
            <div 
              v-for="livro in livrosFiltrados" 
              :key="livro.id" 
              class="card-livro"
            >
              <div class="livro-imagem">
                <img :src="livro.imagem" :alt="livro.titulo" />
                <span 
                  :class="['disponibilidade', livro.disponivel ? 'disponivel' : 'indisponivel']"
                >
                  {{ livro.disponivel ? 'Disponível' : 'Indisponível' }}
                </span>
              </div>
              <div class="livro-detalhes">
                <h3>{{ livro.titulo }}</h3>
                <p>{{ livro.autor }}</p>
                <p>{{ livro.categoria }}</p>
                <button 
                  @click="reservarLivro(livro)" 
                  :disabled="!livro.disponivel"
                  class="btn-reservar"
                >
                  Reservar
                </button>
              </div>
            </div>
          </div>
        </section>
  
        <section class="meus-emprestimos">
          <h2>Meus Empréstimos</h2>
          
          <div class="tabs">
            <button 
              v-for="status in statusEmprestimo" 
              :key="status"
              @click="filtroStatus = status"
              :class="{ 'active': filtroStatus === status }"
            >
              {{ status }}
            </button>
          </div>
  
          <table class="tabela-emprestimos">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="emprestimo in emprestimosFiltrados" 
                :key="emprestimo.id"
              >
                <td>
                  <div class="livro-linha">
                    <img :src="emprestimo.livro.imagem" :alt="emprestimo.livro.titulo" />
                    <span>{{ emprestimo.livro.titulo }}</span>
                  </div>
                </td>
                <td>{{ emprestimo.dataRetirada }}</td>
                <td>{{ emprestimo.dataDevolucao }}</td>
                <td>
                  <span 
                    :class="['status', emprestimo.status.toLowerCase().replace(' ', '-')]"
                  >
                    {{ emprestimo.status }}
                  </span>
                </td>
                <td>
                  <button 
                    v-if="emprestimo.status === 'Em Andamento'" 
                    class="btn-renovar"
                  >
                    Renovar
                  </button>
                  <button 
                    v-if="emprestimo.status === 'Atrasado'" 
                    class="btn-comunicar"
                  >
                    Comunicar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AlunoDashboard',
    data() {
      return {
        searchQuery: '',
        categoriaFiltro: '',
        filtroStatus: 'Todos',
        statusEmprestimo: ['Todos', 'Em Andamento', 'Atrasado', 'Concluído'],
        livros: [
          {
            id: 1,
            titulo: 'Dom Casmurro',
            autor: 'Machado de Assis',
            categoria: 'Literatura',
            imagem: '/api/placeholder/200/300',
            disponivel: true
          },
          {
            id: 2,
            titulo: 'O Pequeno Príncipe',
            autor: 'Antoine de Saint-Exupéry',
            categoria: 'Literatura',
            imagem: '/api/placeholder/200/300',
            disponivel: false
          },
          {
            id: 3,
            titulo: 'Física Moderna',
            autor: 'Diversos Autores',
            categoria: 'Científica',
            imagem: '/api/placeholder/200/300',
            disponivel: true
          }
        ],
        emprestimos: [
          {
            id: 1,
            livro: {
              titulo: 'Harry Potter e a Pedra Filosofal',
              imagem: '/api/placeholder/200/300'
            },
            dataRetirada: '01/03/2025',
            dataDevolucao: '15/03/2025',
            status: 'Em Andamento'
          },
          {
            id: 2,
            livro: {
              titulo: 'A Culpa é das Estrelas',
              imagem: '/api/placeholder/200/300'
            },
            dataRetirada: '20/02/2025',
            dataDevolucao: '07/03/2025',
            status: 'Atrasado'
          }
        ]
      }
    },
    computed: {
      livrosFiltrados() {
        return this.livros.filter(livro => {
          const matchSearch = livro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              livro.autor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                              livro.categoria.toLowerCase().includes(this.searchQuery.toLowerCase());
          
          const matchCategoria = !this.categoriaFiltro || 
                                  livro.categoria.toLowerCase() === this.categoriaFiltro.toLowerCase();
          
          return matchSearch && matchCategoria;
        });
      },
      emprestimosFiltrados() {
        return this.emprestimos.filter(emprestimo => 
          this.filtroStatus === 'Todos' || emprestimo.status === this.filtroStatus
        );
      }
    },
    methods: {
      reservarLivro(livro) {
        // Lógica de reserva de livro
        alert(`Livro "${livro.titulo}" reservado com sucesso!`);
      }
    }
  }
  </script>
  
  <style scoped>
  /* Variáveis de cor */
  :root {
    --cor-azul: #0047AB;
    --cor-azul-claro: #6495ED;
    --cor-vermelho: #B22222;
    --cor-branco: #FFFFFF;
    --cor-cinza-claro: #F5F5F5;
    --cor-cinza: #CCCCCC;
    --cor-texto: #333333;
  }
  
  .aluno-dashboard {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: var(--cor-cinza-claro);
  }
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 2px solid var(--cor-azul);
  }
  
  .page-header h1 {
    color: var(--cor-azul);
    margin: 0;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid var(--cor-azul);
  }
  
  .user-details h2 {
    margin: 0;
    color: var(--cor-texto);
    font-size: 1.2rem;
  }
  
  .user-details p {
    margin: 5px 0 0;
    color: var(--cor-cinza);
    font-size: 0.9rem;
  }
  
  /* Seção de Reserva de Livros */
  .livros-disponiveis, .meus-emprestimos {
    background-color: var(--cor-branco);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .filtros {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
  }
  
  .search-input, .categoria-select {
    flex: 1;
    padding: 10px;
    border: 1px solid var(--cor-cinza);
    border-radius: 4px;
  }
  
  .lista-livros {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .card-livro {
    border: 1px solid var(--cor-cinza);
    border-radius: 8px;
    overflow: hidden;
    transition: transform 0.3s;
  }
  
  .card-livro:hover {
    transform: translateY(-5px);
  }
  
  .livro-imagem {
    position: relative;
  }
  
  .livro-imagem img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
  
  .disponibilidade {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .disponivel {
    background-color: #28a745;
    color: white;
  }
  
  .indisponivel {
    background-color: var(--cor-vermelho);
    color: white;
  }
  
  .livro-detalhes {
    padding: 15px;
  }
  
  .livro-detalhes h3 {
    margin: 0 0 10px;
    color: var(--cor-azul);
  }
  
  .btn-reservar {
    width: 100%;
    padding: 10px;
    background-color: var(--cor-azul);
    color: var(--cor-branco);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-reservar:disabled {
    background-color: var(--cor-cinza);
    cursor: not-allowed;
  }
  
  /* Seção de Empréstimos */
  .tabs {
    display: flex;
    margin-bottom: 20px;
  }
  
  .tabs button {
    flex: 1;
    padding: 10px;
    background-color: var(--cor-cinza-claro);
    border: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    transition: all 0.3s;
  }
  
  .tabs button.active {
    border-bottom-color: var(--cor-azul);
    color: var(--cor-azul);
  }
  
  .tabela-emprestimos {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tabela-emprestimos th {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
    padding: 10px;
    text-align: left;
  }
  
  .tabela-emprestimos td {
    padding: 10px;
    border-bottom: 1px solid var(--cor-cinza);
  }
  
  .livro-linha {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .livro-linha img {
    width: 50px;
    height: 75px;
    object-fit: cover;
  }
  
  .status {
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .em-andamento {
    background-color: #FFF8E1;
    color: #FF8F00;
  }
  
  .atrasado {
    background-color: #FFEBEE;
    color: var(--cor-vermelho);
  }
  
  .concluido {
    background-color: #E8F5E9;
    color: #388E3C;
  }
  
  .btn-renovar, .btn-comunicar {
    padding: 5px 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.8rem;
  }
  
  .btn-renovar {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
  }
  
  .btn-comunicar {
    background-color: var(--cor-vermelho);
    color: var(--cor-branco);
  }
  </style>