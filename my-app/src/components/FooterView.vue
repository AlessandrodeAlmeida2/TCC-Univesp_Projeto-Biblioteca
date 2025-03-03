<template>
  <footer class="biblioteca-footer">
    <div class="footer-content">
      <div class="footer-section info">
        <img src="" alt="Logo da Biblioteca" class="footer-logo" />
        <h3>Biblioteca Escolar</h3>
        <p>Facilitando o acesso ao conhecimento desde 2005</p>
      </div>
      
      <div class="footer-section links">
        <h4>Links Rápidos</h4>
        <ul>
          <li><a href="#">Início</a></li>
          <li><a href="#">Catálogo de Livros</a></li>
          <li><a href="#">Empréstimos</a></li>
          <li><a href="#">Área do Aluno</a></li>
          <li><a href="#">Política de Empréstimo</a></li>
        </ul>
      </div>
      
      <div class="footer-section contato">
        <h4>Contato</h4>
        <p><i class="fas fa-map-marker-alt"></i> Av. dos Livros, 123</p>
        <p><i class="fas fa-phone"></i> (11) 5555-1234</p>
        <p><i class="fas fa-envelope"></i> biblioteca@escola.edu.br</p>
        <div class="redes-sociais">
          <a href="#" class="social-icon"><i class="fab fa-facebook"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-instagram"></i></a>
          <a href="#" class="social-icon"><i class="fab fa-twitter"></i></a>
        </div>
      </div>
    </div>
    
    <div class="footer-bottom">
      <p>&copy; 2025 Sistema de Biblioteca Escolar - Todos os direitos reservados</p>
      <p>Horário de funcionamento: Segunda a Sexta, 08:00 às 18:00</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'BibliotecaFooter'
}
</script>

<style scoped>
.biblioteca-footer {
  background-image: linear-gradient(to bottom, #ff3737, #ac0101);
  color: white;
  padding: 0;
  width: 100%;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
  padding: 0 15px;
}

.info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.footer-logo {
  height: 50px;
  margin-bottom: 10px;
}

.info h3 {
  margin: 10px 0;
  font-size: 1.3rem;
  color: white;
}

.info p {
  color: #e6e6e6;
  font-size: 0.9rem;
}

.links h4, .contato h4 {
  color: white;
  margin-bottom: 15px;
  font-size: 1.1rem;
  position: relative;
  padding-bottom: 10px;
}

.links h4:after, .contato h4:after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background-color: #B22222; /* Vermelho */
}

.links ul {
  list-style: none;
  padding: 0;
}

.links ul li {
  margin-bottom: 10px;
}

.links a {
  color: #e6e6e6;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.links a:hover {
  color: white;
  text-decoration: underline;
}

.contato p {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  color: #e6e6e6;
}

.contato i {
  margin-right: 10px;
  color: #B22222; /* Vermelho */
}

.redes-sociais {
  display: flex;
  margin-top: 15px;
}

.social-icon {
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: background-color 0.3s;
}

.social-icon:hover {
  background-color: #B22222; /* Vermelho */
}

.footer-bottom {
  padding: 15px 20px;
  text-align: center;
  font-size: 0.85rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-bottom p {
  margin: 5px 0;
  color: #e6e6e6;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }
  
  .footer-section {
    margin-bottom: 30px;
  }
}
</style>