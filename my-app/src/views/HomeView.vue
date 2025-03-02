<template>
  <div class="biblioteca-container">
    <main>
      <section class="dashboard">
        <h2>Painel de Controle</h2>
        <div class="cards-container">
          <div class="card">
            <div class="card-icon">
              <i class="fas fa-book"></i>
            </div>
            <div class="card-info">
              <h3>Livros</h3>
              <p class="numero">1.250</p>
              <p>Total no acervo</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="card-info">
              <h3>Empréstimos</h3>
              <p class="numero">42</p>
              <p>Em andamento</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">
              <i class="fas fa-user-graduate"></i>
            </div>
            <div class="card-info">
              <h3>Alunos</h3>
              <p class="numero">520</p>
              <p>Cadastrados</p>
            </div>
          </div>
          
          <div class="card">
            <div class="card-icon">
              <i class="fas fa-exclamation-triangle"></i>
            </div>
            <div class="card-info">
              <h3>Atrasos</h3>
              <p class="numero">15</p>
              <p>Livros atrasados</p>
            </div>
          </div>
        </div>
      </section>

      <section class="acoes-rapidas">
        <h2>Ações Rápidas</h2>
        <div class="botoes-container">
          <button class="btn-acao">
            <i class="fas fa-plus-circle"></i>
            Novo Empréstimo
          </button>
          <button class="btn-acao">
            <i class="fas fa-undo"></i>
            Devolver Livro
          </button>
          <button class="btn-acao">
            <i class="fas fa-book"></i>
            Cadastrar Livro
          </button>
          <button class="btn-acao">
            <i class="fas fa-user-plus"></i>
            Cadastrar Aluno
          </button>
        </div>
      </section>

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
    </main>

    <footer>
      <p>&copy; 2025 Sistema de Biblioteca Escolar - Todos os direitos reservados</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BibliotecaHome',
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
/* Estilos gerais */
:root {
  --cor-azul: #0047AB;
  --cor-azul-claro: #6495ED;
  --cor-vermelho: #B22222;
  --cor-vermelho-claro: #DC3545;
  --cor-branco: #FFFFFF;
  --cor-cinza-claro: #F5F5F5;
  --cor-cinza: #CCCCCC;
  --cor-texto: #333333;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Roboto', Arial, sans-serif;
}

body {
  background-color: var(--cor-cinza-claro);
  color: var(--cor-texto);
}

.biblioteca-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Header */
.header {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.logo-container {
  display: flex;
  align-items: center;
}

.logo {
  height: 50px;
  margin-right: 15px;
}

.titulo-principal {
  font-size: 1.8rem;
  font-weight: bold;
}

.menu ul {
  display: flex;
  list-style: none;
  gap: 20px;
}

.menu a {
  color: var(--cor-branco);
  text-decoration: none;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.menu a:hover, .menu a.active {
  background-color: rgba(255, 255, 255, 0.2);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 15px;
}

.btn-logout {
  background-color: var(--cor-vermelho);
  color: var(--cor-branco);
  border: none;
  padding: 5px 15px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-logout:hover {
  background-color: var(--cor-vermelho-claro);
}

/* Main content */
main {
  flex: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

/* Dashboard */
.dashboard {
  margin-bottom: 30px;
}

h2 {
  color: var(--cor-azul);
  margin-bottom: 20px;
  font-size: 1.5rem;
  border-bottom: 2px solid var(--cor-azul);
  padding-bottom: 10px;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.card {
  background-color: var(--cor-branco);
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

.card-icon {
  font-size: 2.5rem;
  color: var(--cor-azul);
  margin-right: 15px;
}

.card-info h3 {
  margin-bottom: 5px;
  color: var(--cor-azul);
}

.numero {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--cor-texto);
}

/* Ações Rápidas */
.acoes-rapidas {
  margin-bottom: 30px;
}

.botoes-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.btn-acao {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  border: none;
  padding: 15px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  transition: background-color 0.3s;
}

.btn-acao i {
  font-size: 1.5rem;
}

.btn-acao:hover {
  background-color: var(--cor-azul-claro);
}

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

/* Footer */
footer {
  background-color: var(--cor-azul);
  color: var(--cor-branco);
  text-align: center;
  padding: 15px;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    padding: 10px;
  }
  
  .logo-container {
    margin-bottom: 10px;
  }
  
  .menu {
    margin: 10px 0;
  }
  
  .menu ul {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .cards-container {
    grid-template-columns: 1fr;
  }
  
  table {
    display: block;
    overflow-x: auto;
  }
}
</style>