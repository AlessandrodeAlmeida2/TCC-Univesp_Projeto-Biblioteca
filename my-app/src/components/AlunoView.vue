<template>
    <div class="aluno-dashboard">
      <header class="page-header">
        <h1>Minha Biblioteca</h1>
        <div class="user-info">
          <img src="" alt="Foto do Aluno" class="profile-image" />
          <div class="user-details">
            <h2>{{ alunoInfo.nome }}</h2>
            <p>RA: {{ alunoInfo.ra }}</p>
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
              <option value="Literatura Brasileira">Literatura Brasileira</option>
              <option value="Literatura Infantil">Literatura Infantil</option>
              <option value="Fantasia">Fantasia</option>
              <option value="Romance">Romance</option>
              <option value="Ficção Científica">Ficção Científica</option>
              <option value="História">História</option>
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
  
        <section class="meus-reservas">
          <h2>Minhas Reservas</h2>
          <table class="tabela-reservas">
            <thead>
              <tr>
                <th>Livro</th>
                <th>Data da Reserva</th>
                <th>Validade</th>
                <th>Status</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="reserva in reservas" :key="reserva.id">
                <td>
                  <div class="livro-linha">
                    
                    <span>{{ reserva.livro.titulo }}</span>
                  </div>
                </td>
                <td>{{ reserva.dataReserva ? reserva.dataReserva.substring(0,10) : '' }}</td>
                <td>{{ reserva.dataValidade }}</td>
                <td>
                  <span :class="['status', reserva.status.toLowerCase()]">
                    {{ reserva.status }}
                  </span>
                </td>
                <td>{{ reserva.codigo }}</td>
              </tr>
            </tbody>
          </table>
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
  import { supabase } from '../supabase';

  export default {
    name: 'AlunoDashboard',
    data() {
      return {
        searchQuery: '',
        categoriaFiltro: '',
        filtroStatus: 'Todos',
        statusEmprestimo: ['Todos', 'Em Andamento', 'Atrasado', 'Concluído'],
        livros: [],
        emprestimos: [],
        reservas: [],
        alunoInfo: { id: null, nome: '', ra: '' },
      };
    },
    async mounted() {
      // Buscar RA do aluno do localStorage, route params ou contexto
      let ra = null;
      if (this.$route && this.$route.params && this.$route.params.ra) {
        ra = this.$route.params.ra;
      } else if (localStorage.getItem('aluno_ra')) {
        ra = localStorage.getItem('aluno_ra');
      }
      if (!ra) {
        alert('RA do aluno não encontrado.');
        return;
      }
      await this.buscarAlunoInfo(ra);
      if (this.alunoInfo.id) {
        // Atualiza o localStorage para refletir o aluno correto
        localStorage.setItem('aluno', JSON.stringify(this.alunoInfo));
        localStorage.setItem('aluno_ra', this.alunoInfo.ra);
        await this.buscarLivros();
        await this.buscarEmprestimos();
        await this.buscarReservas();
      }
    },
    computed: {
      livrosFiltrados() {
        return this.livros.filter(livro => {
          const matchSearch = livro.titulo.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            livro.autor.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            livro.categoria.toLowerCase().includes(this.searchQuery.toLowerCase());
          const matchCategoria = !this.categoriaFiltro || livro.categoria.toLowerCase() === this.categoriaFiltro.toLowerCase();
          return matchSearch && matchCategoria;
        });
      },
      emprestimosFiltrados() {
        return this.emprestimos.filter(e =>
          this.filtroStatus === 'Todos' || e.status === this.filtroStatus
        );
      }
    },
    methods: {
      async buscarAlunoInfo(ra) {
        // Busca todas as informações do aluno pela tabela 'alunos' usando o RA
        const { data, error } = await supabase
          .from('alunos')
          .select('id, nome, ra')
          .eq('ra', ra)
          .single();
        if (!error && data) {
          this.alunoInfo = { id: data.id, nome: data.nome, ra: data.ra };
        } else {
          alert('Aluno não encontrado para o RA informado.');
        }
      },
      async buscarLivros() {
        // Busca todos os livros disponíveis
        const { data, error } = await supabase
          .from('livros')
          .select('*');
        if (!error && data) {
          this.livros = data.map(livro => ({
            id: livro.id,
            titulo: livro.titulo,
            autor: livro.autor,
            categoria: livro.categoria,
            status: livro.status,
            disponivel: livro.status === 'Disponivel',
            imagem: '/api/placeholder/200/300'
          }));
        }
      },
      async buscarEmprestimos() {
        // Busca os empréstimos do aluno logado usando o id da tabela 'alunos'
        if (!this.alunoInfo.id) return;
        const { data, error } = await supabase
          .from('emprestimos')
          .select('id, livro_id, data_retirada, data_devolucao_prevista, status')
          .eq('aluno_id', this.alunoInfo.id);
        if (!error && data) {
          this.emprestimos = data.map(e => {
            const livroObj = this.livros.find(l => l.id === e.livro_id);
            return {
              id: e.id,
              livro: {
                titulo: livroObj ? livroObj.titulo : e.livro_id,
              },
              dataRetirada: e.data_retirada,
              dataDevolucao: e.data_devolucao_prevista,
              status: e.status
            };
          });
        }
      },
      async buscarReservas() {
        // Busca as reservas do aluno logado usando o id da tabela 'alunos'
        if (!this.alunoInfo.id) return;
        const { data, error } = await supabase
          .from('reservas')
          .select('id, livro_id, data_reserva, data_validade, status, codigo_verificacao')
          .eq('aluno_id', this.alunoInfo.id);
        if (!error && data) {
          this.reservas = data.map(r => {
            const livroObj = this.livros.find(l => l.id === r.livro_id);
            return {
              id: r.id,
            livro: {
              titulo: livroObj ? livroObj.titulo : r.livro_id,
            },
            dataReserva: r.data_reserva,
            dataValidade: r.data_validade,
            status: r.status,
            codigo: r.codigo_verificacao
            }
          });
        }
      },
      async reservarLivro(livro) {
        if (!this.alunoInfo.id) {
          alert('Aluno não identificado.');
          return;
        }
        // Cria uma nova reserva
        const validade = new Date();
        validade.setDate(validade.getDate() + 3); // 3 dias de validade
        const codigoVerificacao = Math.random().toString(36).substring(2, 10).toUpperCase();
        const { error } = await supabase
          .from('reservas')
          .insert({
            aluno_id: this.alunoInfo.id,
            livro_id: livro.id,
            data_validade: validade.toISOString().split('T')[0],
            status: 'Pendente',
            codigo_verificacao: codigoVerificacao
          });
        const { error: errorLivro} = await supabase
          .from('livros')
          .update({ status: 'Reservado'})
          .eq('id', livro.id)
          ;
        if (!error && !errorLivro) {
          alert(`Reserva do livro "${livro.titulo}" realizada com sucesso! Código: ${codigoVerificacao}`);
          await this.buscarLivros();
          await this.buscarReservas();
        } else {
          alert('Erro ao reservar livro.');
        }
      }
    }
  };
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

  /* Seção de Reservas */
  .meus-reservas {
    background-color: var(--cor-branco);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 30px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .tabela-reservas {
    width: 100%;
    border-collapse: collapse;
  }
  
  .tabela-reservas th, .tabela-reservas td {
    border: 1px solid var(--cor-cinza);
    padding: 10px;
    text-align: left;
  }

  .tabela-reservas th {
    background-color: var(--cor-azul);
    color: var(--cor-branco);
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

  /* Media queries para responsividade */
@media (max-width: 768px) {
  .aluno-dashboard {
    padding: 10px;
  }

  .page-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 15px;
  }

  .filtros {
    flex-direction: column;
  }

  .lista-livros {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .livro-imagem img {
    height: 200px;
  }

  .livro-detalhes h3 {
    font-size: 1rem;
  }

  .tabs {
    flex-wrap: wrap;
  }

  .tabs button {
    padding: 8px;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .page-header h1 {
    font-size: 1.5rem;
  }

  .user-details h2 {
    font-size: 1rem;
  }

  .lista-livros {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 10px;
  }

  .livro-imagem img {
    height: 180px;
  }

  /* Ajustes para tabelas em telas pequenas */
  .tabela-reservas, .tabela-emprestimos {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .btn-reservar, .btn-renovar, .btn-comunicar {
    padding: 8px;
    font-size: 0.8rem;
  }

  /* Transformando as tabelas para visualização em card em telas muito pequenas */
  @media (max-width: 480px) {
    .tabela-reservas thead, .tabela-emprestimos thead {
      display: none;
    }

    .tabela-reservas tbody, .tabela-emprestimos tbody {
      display: block;
    }

    .tabela-reservas tr, .tabela-emprestimos tr {
      display: block;
      margin-bottom: 15px;
      border: 1px solid var(--cor-cinza);
      border-radius: 8px;
      overflow: hidden;
    }

    .tabela-reservas td, .tabela-emprestimos td {
      display: flex;
      justify-content: space-between;
      padding: 8px 10px;
      border: none;
      border-bottom: 1px solid var(--cor-cinza);
      text-align: right;
      white-space: normal;
    }

    .tabela-reservas td:before, .tabela-emprestimos td:before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }

    .status {
      margin: 0 0 0 auto;
    }
  }
}
  </style>
