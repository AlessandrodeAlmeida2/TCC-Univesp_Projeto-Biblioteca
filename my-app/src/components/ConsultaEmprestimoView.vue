<template>
  <section class="ultimos-emprestimos">
      <h2>Últimos Empréstimos</h2>
      
      <!-- Versão Desktop -->
      <div class="tabela-desktop">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Aluno</th>
                <th>Livro</th>
                <th>Data de Retirada</th>
                <th>Data de Devolução</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="emprestimo in emprestimos" :key="emprestimo.id">
                <td>{{ emprestimo.id }}</td>
                <td>{{ emprestimo.aluno }}</td>
                <td>{{ emprestimo.livro }}</td>
                <td>{{ emprestimo.dataRetirada }}</td>
                <td>{{ emprestimo.dataDevolucao }}</td>
                <td>
                  <span 
                    class="status" 
                    :class="{
                      'em-andamento': emprestimo.status === 'Em Andamento',
                      'atrasado': emprestimo.status === 'Atrasado',
                      'devolvido': emprestimo.status === 'Devolvido'
                    }"
                  >
                    {{ emprestimo.status }}
                  </span>
                </td>
                <td>
                  <button class="btn-table" @click="editarEmprestimo(emprestimo)">
                    <i class="fas fa-edit"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      </div>

      <!-- Versão Mobile -->
      <div class="tabela-mobile">
          <div v-for="emprestimo in emprestimos" :key="emprestimo.id" class="card-emprestimo">
              <div class="card-header">
                  <span class="aluno">{{ emprestimo.aluno }}</span>
                  <span 
                    class="status" 
                    :class="{
                      'em-andamento': emprestimo.status === 'Em Andamento',
                      'atrasado': emprestimo.status === 'Atrasado',
                      'devolvido': emprestimo.status === 'Devolvido'
                    }"
                  >
                    {{ emprestimo.status }}
                  </span>
              </div>
              <div class="card-body">
                  <div class="info-linha">
                      <strong>ID:</strong> {{ emprestimo.id }}
                  </div>
                  <div class="info-linha">
                      <strong>Livro:</strong> {{ emprestimo.livro }}
                  </div>
                  <div class="info-linha">
                      <strong>Data de Retirada:</strong> {{ emprestimo.dataRetirada }}
                  </div>
                  <div class="info-linha">
                      <strong>Data de Devolução:</strong> {{ emprestimo.dataDevolucao }}
                  </div>
              </div>
              <div class="card-acoes">
                  <button class="btn-table" @click="editarEmprestimo(emprestimo)">
                      <i class="fas fa-edit"></i> Editar
                  </button>
              </div>
          </div>
      </div>
      <a href="#" class="ver-todos">Ver todos os empréstimos</a>
  </section>
</template>

<script>
import { supabase } from '../supabase'
export default {
  name: 'ConsultaEmprestimoView',
  data() {
    return {
      emprestimos: []
    }
  },
  async mounted() {
    await this.buscarEmprestimos();
  },
  methods: {
    async buscarEmprestimos() {
      // Busca todos os empréstimos, join aluno/livro, ordena atrasados primeiro
      const { data, error } = await supabase
        .from('emprestimos')
        .select('id, data_retirada, data_devolucao_prevista, status, alunos (nome), livros (titulo)')
      if (!error && data) {
        // Ordena: atrasados primeiro, depois por data de retirada decrescente
        this.emprestimos = data.sort((a, b) => {
          if (a.status === 'Atrasado' && b.status !== 'Atrasado') return -1;
          if (a.status !== 'Atrasado' && b.status === 'Atrasado') return 1;
          return new Date(b.data_retirada) - new Date(a.data_retirada);
        }).map(e => ({
          id: e.id,
          aluno: e.alunos?.nome || '',
          livro: e.livros?.titulo || '',
          dataRetirada: e.data_retirada,
          dataDevolucao: e.data_devolucao_prevista,
          status: e.status
        }));
      }
    },
    visualizarEmprestimo(emprestimo) {
      console.log('Visualizando empréstimo:', emprestimo);
    },
    editarEmprestimo(emprestimo) {
      this.$router.push(`/editar-emprestimo/${emprestimo.id}`);
    },
    devolverEmprestimo(emprestimo) {
      console.log('Devolvendo empréstimo:', emprestimo);
    }
  }
}
</script>

<style scoped>
.ultimos-emprestimos {
margin-bottom: 30px;
}

/* Estilos da Tabela Desktop */
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

.em-andamento {
background-color: #FFF8E1;
color: #FF8F00;
}

.atrasado {
background-color: #FFEBEE;
color: var(--cor-vermelho);
}

.devolvido {
background-color: #E8F5E9;
color: #388E3C;
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

.card-emprestimo {
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

.card-header .aluno {
  font-weight: bold;
  font-size: 1rem;
  flex-grow: 1;
  margin-right: 10px;
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

.card-acoes .btn-devolver {
  background-color: #FFF8E1;
  color: #FF8F00;
}
}
</style>
