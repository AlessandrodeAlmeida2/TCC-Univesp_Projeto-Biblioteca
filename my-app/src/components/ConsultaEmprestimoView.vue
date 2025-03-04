<template>
    <section class="ultimos-emprestimos">
        <h2>Últimos Empréstimos</h2>
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
            <tr>
              <td>1001</td>
              <td>Maria Silva</td>
              <td>Dom Casmurro</td>
              <td>01/03/2025</td>
              <td>15/03/2025</td>
              <td><span class="status em-andamento">Em Andamento</span></td>
              <td>
                <button class="btn-table"><i class="fas fa-eye"></i></button>
                <button class="btn-table"><i class="fas fa-edit"></i></button>
                <button class="btn-table"><i class="fas fa-undo"></i></button>
              </td>
            </tr>
            <tr>
              <td>1000</td>
              <td>João Santos</td>
              <td>O Pequeno Príncipe</td>
              <td>28/02/2025</td>
              <td>14/03/2025</td>
              <td><span class="status em-andamento">Em Andamento</span></td>
              <td>
                <button class="btn-table"><i class="fas fa-eye"></i></button>
                <button class="btn-table"><i class="fas fa-edit"></i></button>
                <button class="btn-table"><i class="fas fa-undo"></i></button>
              </td>
            </tr>
            <tr>
              <td>999</td>
              <td>Pedro Oliveira</td>
              <td>Harry Potter</td>
              <td>25/02/2025</td>
              <td>01/03/2025</td>
              <td><span class="status atrasado">Atrasado</span></td>
              <td>
                <button class="btn-table"><i class="fas fa-eye"></i></button>
                <button class="btn-table"><i class="fas fa-edit"></i></button>
                <button class="btn-table"><i class="fas fa-undo"></i></button>
              </td>
            </tr>
            <tr>
              <td>998</td>
              <td>Ana Souza</td>
              <td>A Culpa é das Estrelas</td>
              <td>23/02/2025</td>
              <td>01/03/2025</td>
              <td><span class="status devolvido">Devolvido</span></td>
              <td>
                <button class="btn-table"><i class="fas fa-eye"></i></button>
                <button class="btn-table"><i class="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <a href="#" class="ver-todos">Ver todos os empréstimos</a>
      </section>
</template>

<script>
export default {
  name: 'ConsultaEmprestimo',
  data() {
    return {
      // Aqui você pode adicionar os dados dinâmicos que seriam carregados do backend
    }
  },
  methods: {
    // Métodos para interações com a interface
  }
}
</script>

<style scoped>
/* Últimos Empréstimos */
.ultimos-emprestimos {
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

</style>