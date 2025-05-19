<template>
  <section class="consulta-alunos">
      <h2>Consulta de Alunos</h2>
      
      <!-- Versão Desktop -->
      <div class="tabela-desktop">
          <table>
              <thead>
                  <tr>
                      <th>RA</th>
                      <th>Nome</th>
                      <th>Turma</th>
                      <th>Email</th>
                      <th>Situação</th>
                      <th>Ações</th>
                  </tr>
              </thead>
              <tbody>
  <tr v-for="aluno in alunos" :key="aluno.ra">
    <td>{{ aluno.ra }}</td>
    <td>{{ aluno.nome }}</td>
    <td>{{ aluno.turma }}</td>
    <td>{{ aluno.email }}</td>
    <td>
      <span 
        class="status" 
        :class="{
          'ativo': aluno.situacao === 'Ativo',
          'inativo': aluno.situacao === 'Inativo',
          'pendente': aluno.situacao === 'Pendente'
        }"
      >
        {{ aluno.situacao }}
      </span>
      <div v-if="emprestimosDoAluno(aluno.ra).length">
        <ul>
          <li v-for="emp in emprestimosDoAluno(aluno.ra)" :key="emp.id">
            <span :class="{'atrasado': isAtrasado(emp)}">
              <template v-if="getLivroById(emp.livro_id)">
                Livro: {{ getLivroById(emp.livro_id).titulo }}<br>
              </template>
              <template v-else>
                Livro: Livro não encontrado<br>
              </template>
              Retirada: {{ emp.data_retirada || emp.dataRetirada }}<br>
              Devolução: {{ emp.data_devolucao || emp.dataDevolucao }}<br>
              Status: <span :class="{'status atrasado': isAtrasado(emp)}">{{ statusEmprestimo(emp) }}</span>
            </span>
          </li>
        </ul>
      </div>
      <div v-else>
        Nenhum empréstimo
      </div>
    </td>
    <td>
      <div class="acoes-desktop">
        <button class="btn-table" @click="visualizarAluno(aluno)">
          <i class="fas fa-eye"></i>
        </button>
      </div>
    </td>
  </tr>
</tbody>
          </table>
      </div>

      <!-- Versão Mobile -->
      <div class="tabela-mobile">
          <div v-for="aluno in alunos" :key="aluno.ra" class="card-aluno">
              <div class="card-header">
                  <span class="nome">{{ aluno.nome }}</span>
                  <span 
                      class="status" 
                      :class="{
                          'ativo': aluno.situacao === 'Ativo',
                          'inativo': aluno.situacao === 'Inativo',
                          'pendente': aluno.situacao === 'Pendente'
                      }"
                  >
                      {{ aluno.situacao }}
                  </span>
              </div>
              <div class="card-body">
  <div class="info-linha">
    <strong>RA:</strong> {{ aluno.ra }}
  </div>
  <div class="info-linha">
    <strong>Turma:</strong> {{ aluno.turma }}
  </div>
  <div class="info-linha">
    <strong>Email:</strong> {{ aluno.email }}
  </div>
  <div class="info-linha">
    <strong>Empréstimos:</strong>
    <div v-if="emprestimosDoAluno(aluno.ra).length">
      <ul>
        <li v-for="emp in emprestimosDoAluno(aluno.ra)" :key="emp.id">
          <span :class="{'atrasado': isAtrasado(emp)}">
            Livro: {{ getLivroById(emp.livro_id).titulo }}<br>
            Retirada: {{ emp.data_retirada || emp.dataRetirada }}<br>
            Devolução: {{ emp.data_devolucao || emp.dataDevolucao }}<br>
            Status: <span :class="{'status atrasado': isAtrasado(emp)}">{{ statusEmprestimo(emp) }}</span>
          </span>
        </li>
      </ul>
    </div>
    <div v-else>
      Nenhum empréstimo
    </div>
  </div>
</div>
              <div class="card-acoes">
                  <button class="btn-table" @click="visualizarAluno(aluno)">
                      <i class="fas fa-eye"></i> Visualizar
                  </button>
              </div>
          </div>
      </div>

      <a href="#" class="ver-todos">Ver todos os alunos</a>
  </section>
</template>

<script>
import { getEmprestimos } from '../services/emprestimosService.js';
import alunoService from '../services/alunoService.js';
import { getLivros } from '../services/livrosService.js';

export default {
  name: 'ConsultaAluno',
  data() {
    return {
      alunos: [],
      emprestimos: [],
      carregando: false,
      livros: [],
      erro: null
    };
  },
  async mounted() {
    this.carregando = true;
    try {
      this.alunos = await alunoService.listarAlunos();
      const { data, error } = await getEmprestimos();
      if (error) throw error;
      this.emprestimos = data;
      const { data: livrosData, error: livrosError } = await getLivros();
      if (livrosError) throw livrosError;
      this.livros = livrosData;
    } catch (e) {
      this.erro = 'Erro ao carregar dados dos alunos ou empréstimos.';
    } finally {
      this.carregando = false;
    }
  },
  methods: {
    visualizarAluno(aluno) {
      this.$router.push(`/visualiza-aluno/${aluno.ra}`);
    },
    
    emprestimosDoAluno(ra) {
      const aluno = this.alunos.find(a => a.ra === ra);
      if (!aluno) return [];
      const filtrados = this.emprestimos.filter(e => e.aluno_id === aluno.id);
      return filtrados;
    },
    getLivroById(id) {
      console.log('Buscando livro com ID:', id);

      if (!this.livros || !Array.isArray(this.livros)) {
        console.warn('Array de livros não está definido ou não é um array');
        return null;
      }

      const livro = this.livros.find(l => String(l.id) === String(id));

      if (!livro) {
        console.warn('Livro não encontrado com ID:', id);
        return null;
      }

      console.log('Livro encontrado:', livro);
      return livro;
    },
    statusEmprestimo(emprestimo) {
      if (!emprestimo) return 'Nenhum';
      if (emprestimo.status === 'Atrasado') return 'Atrasado';
      if (emprestimo.status === 'Em Andamento') return 'Em Andamento';
      if (emprestimo.status === 'Devolvido') return 'Devolvido';
      return 'Desconhecido';
    },
    isAtrasado(emprestimo) {
      if (!emprestimo) return false;
      if (emprestimo.status === 'Atrasado') return true;
      if (emprestimo.status === 'Em Andamento') {
        const hoje = new Date();
        const dataDevolucao = new Date(emprestimo.data_devolucao || emprestimo.dataDevolucao);
        return dataDevolucao < hoje;
      }
      return false;
    }
  }
}
</script>

<style scoped>
.consulta-alunos {
  margin-bottom: 30px;
}

/* Desktop Table Styles */
.tabela-desktop {
  display: block;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: var(--cor-branco);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 12px 15px;
  text-align: left;
}

th {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  font-weight: 500;
}

tr:nth-child(even) {
  background-color: var(--cor-cinza-claro);
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.85rem;
  display: inline-block;
}

.status.ativo {
  background-color: #E8F5E9;
  color: #388E3C;
}

.status.inativo {
  background-color: #FFEBEE;
  color: var(--cor-vermelho);
}

.status.pendente {
  background-color: #FFF8E1;
  color: #FF8F00;
}

.btn-table {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--cor-azul);
  margin-right: 5px;
  font-size: 1rem;
}

.btn-table:hover {
  color: var(--cor-azul-claro);
}

.ver-todos {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: var(--cor-azul);
  text-decoration: none;
}

.ver-todos:hover {
  text-decoration: underline;
}

/* Mobile Card Styles */
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

  .card-aluno {
      background-color: var(--cor-branco);
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      margin-bottom: 15px;
      padding: 15px;
  }

  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      border-bottom: 1px solid var(--cor-cinza-claro);
      padding-bottom: 10px;
  }

  .card-header .nome {
      font-weight: bold;
      font-size: 1rem;
  }

  .card-body {
      margin-bottom: 15px;
  }

  .info-linha {
      margin-bottom: 8px;
      color: #555;
  }

  .card-acoes {
      display: flex;
      justify-content: space-between;
      gap: 10px;
  }

  .card-acoes .btn-table {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 8px;
      background-color: var(--cor-cinza-claro);
      color: var(--cor-azul);
      border-radius: 4px;
      font-size: 0.9rem;
  }

  .card-acoes .btn-table i {
      margin-right: 5px;
  }

  .card-acoes .btn-excluir {
      background-color: #FFEBEE;
      color: var(--cor-vermelho);
  }
}
</style>
