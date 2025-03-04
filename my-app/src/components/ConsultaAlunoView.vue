<template>
    <section class="consulta-alunos">
        <h2>Consulta de Alunos</h2>
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
              </td>
              <td>
                <button class="btn-table" @click="visualizarAluno(aluno)">
                  <i class="fas fa-eye"></i>
                </button>
                <button class="btn-table" @click="editarAluno(aluno)">
                  <i class="fas fa-edit"></i>
                </button>
                <button class="btn-table" @click="excluirAluno(aluno)">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="ver-todos">Ver todos os alunos</a>
    </section>
</template>

<script>
export default {
  name: 'ConsultaAluno',
  data() {
    return {
      alunos: [
        {
          ra: '076245/8570',
          nome: 'Luiza Souza Ferreira',
          turma: '2º A',
          email: 'luiza.ferreira@escola.com',
          situacao: 'Ativo'
        },
        {
          ra: '746697480/1',
          nome: 'Erick Dias Lima',
          turma: '3º B',
          email: 'erick.lima@escola.com',
          situacao: 'Inativo'
        },
        {
          ra: '455538/6233',
          nome: 'Luis Rodrigues Cunha',
          turma: '1º C',
          email: 'luis.cunha@escola.com',
          situacao: 'Pendente'
        },
        {
          ra: '407688/7244',
          nome: 'Maria Oliveira Gomes',
          turma: '2º B',
          email: 'maria.gomes@escola.com',
          situacao: 'Ativo'
        }
      ]
    }
  },
  methods: {
    visualizarAluno(aluno) {
      // Lógica para visualizar detalhes do aluno
      console.log('Visualizando aluno:', aluno);
    },
    editarAluno(aluno) {
      // Lógica para editar aluno
      console.log('Editando aluno:', aluno);
    },
    excluirAluno(aluno) {
      // Lógica para excluir aluno
      console.log('Excluindo aluno:', aluno);
    }
  }
}
</script>

<style scoped>
.consulta-alunos {
  margin-bottom: 30px;
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
</style>