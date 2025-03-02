<template>
  <div id="app">
    <header class="header">
      <div class="logo-container">
        <img src="" alt="Logo da Biblioteca" class="logo" />
        <h1 class="titulo-principal">Biblioteca Escolar</h1>
      </div>
      <div class="search-bar">
        <input type="text" placeholder="Buscar livros, autores..." v-model="searchQuery" />
        <button class="search-button">
          <i class="fas fa-search"></i>
        </button>
      </div>
      <nav class="menu">
        <ul>
          <li><a href="#" class="active">Início</a></li>
          <li><a href="#">Livros</a></li>
          <li><a href="#">Empréstimos</a></li>
          <li><a href="#">Alunos</a></li>
          <li><a href="#">Relatórios</a></li>
        </ul>
      </nav>
      <div class="user-info">
        <span>Olá, Bibliotecário</span>
        <button class="btn-logout">Sair</button>
      </div>
    </header>
    <main>
      <div class="content">
        <RouterView/>
      </div>
    </main>
    
    <footer>
      <FooterView/>
    </footer>  
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      notifications: 3,
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown() {
      this.isDropdownOpen = !this.isDropdownOpen;
    },
    openChat() {
      // Implementação da abertura do chat
      console.log('Abrindo chat');
    }
  }
}
</script>

<style>
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background-color: white;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

.logo-container {
  display: flex;
  align-items: center;
}

.titulo-principal {
  color: #0077b5;
  margin: 0;
  font-size: 1.5rem;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #f3f2ef;
  border-radius: 4px;
  padding: 5px 10px;
  margin: 0 15px;
  flex: 1;
  max-width: 300px;
}

.search-bar input {
  border: none;
  background: transparent;
  width: 100%;
  outline: none;
}

.search-button {
  background: none;
  border: none;
  cursor: pointer;
}

/* Menu de navegação horizontal */
.menu {
  flex: 2;
}

.menu ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.menu li {
  margin: 0 10px;
}

.menu a {
  text-decoration: none;
  color: #333;
  padding: 5px 10px;
  transition: color 0.2s;
}

.menu a.active, 
.menu a:hover {
  color: #0077b5;
  border-bottom: 2px solid #0077b5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-logout {
  background-color: #f3f2ef;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.btn-logout:hover {
  background-color: #e0e0e0;
}

main {
  min-height: calc(100vh - 60px - 100px);
  padding: 20px;
}

</style>