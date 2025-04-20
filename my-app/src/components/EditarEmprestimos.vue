<template>
  <section class="lista-emprestimos">
    <h2>Lista de Empréstimos</h2>
    <table class="tabela-emprestimos">
      <thead>
        <tr>
          <th>ID</th>
          <th>Aluno</th>
          <th>Livro</th>
          <th>Retirada</th>
          <th>Devolução Prevista</th>
          <th>Status</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emprestimo in emprestimos" :key="emprestimo.id">
          <td>{{ emprestimo.id }}</td>
          <td>{{ emprestimo.aluno_nome }}</td>
          <td>{{ emprestimo.livro_titulo }}</td>
          <td>{{ emprestimo.data_retirada }}</td>
          <td>{{ emprestimo.data_devolucao_prevista }}</td>
          <td>{{ emprestimo.status }}</td>
          <td>
            <div class="card-acoes">
              <button class="btn-editar" @click="editarEmprestimo(emprestimo.id)">
                <i class="fas fa-edit"></i>
              </button>
              <button class="btn-excluir" @click="deletarEmprestimo(emprestimo.id)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

export default {
  name: 'EditarEmprestimos',
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
      // Busca empréstimos e faz join para mostrar nome do aluno e título do livro
      const { data, error } = await supabase
        .from('emprestimos')
        .select('id, data_retirada, data_devolucao_prevista, status, alunos (nome), livros (titulo)');
      if (error) {
        console.error(error);
      } else {
        // Ajusta para exibir nome e título diretamente
        this.emprestimos = data.map(e => ({
          ...e,
          aluno_nome: e.alunos?.nome || '',
          livro_titulo: e.livros?.titulo || ''
        }));
      }
    },
    editarEmprestimo(id) {
      this.$router.push(`/editar-emprestimo/${id}`);
    },
    async deletarEmprestimo(id) {
      if (confirm('Tem certeza que deseja deletar este empréstimo?')) {
        const { error } = await supabase
          .from('emprestimos')
          .delete()
          .eq('id', id);
        if (error) {
          alert('Erro ao deletar!');
        } else {
          this.emprestimos = this.emprestimos.filter(e => e.id !== id);
        }
      }
    }
  }
}
</script>

<style scoped>
.lista-emprestimos {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}
.tabela-emprestimos {
  width: 100%;
  border-collapse: collapse;
}
.tabela-emprestimos th, .tabela-emprestimos td {
  border: 1px solid #e0e0e0;
  padding: 8px 12px;
  text-align: left;
}
.tabela-emprestimos th {
  background: #f7f7f7;
}

.card-acoes {
  text-align: center !important;
  display: flex;
  flex-direction: row;
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

/* Responsividade para dispositivos móveis */
@media (max-width: 768px) {
  .lista-emprestimos {
    padding: 15px;
  }
  
  .tabela-emprestimos {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }

  .card-acoes {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .card-acoes .btn-editar,
  .card-acoes .btn-excluir {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.9rem;
  }
  
  .card-acoes .btn-editar {
    background-color: #e6f2ff;
    color: #0077b5;
  }
  
  .card-acoes .btn-excluir {
    background-color: #ffebee;
    color: #e74c3c;
  }
  
  .card-acoes .btn-editar i,
  .card-acoes .btn-excluir i {
    margin-right: 5px;
  }
}

@media (max-width: 576px) {
  /* Transformar tabela em layout de cartões para telas pequenas */
  .tabela-emprestimos, 
  .tabela-emprestimos thead, 
  .tabela-emprestimos tbody, 
  .tabela-emprestimos th, 
  .tabela-emprestimos td, 
  .tabela-emprestimos tr {
    display: block;
  }
  
  .tabela-emprestimos thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  .tabela-emprestimos tr {
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
  }
  
  .tabela-emprestimos td {
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid #eee;
    text-align: right;
    min-height: 30px;
  }
  
  .tabela-emprestimos td:before {
    position: absolute;
    top: 8px;
    left: 8px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
  }
  
  /* Adicionar os cabeçalhos para cada célula */
  .tabela-emprestimos td:nth-of-type(1):before { content: "ID"; }
  .tabela-emprestimos td:nth-of-type(2):before { content: "Aluno"; }
  .tabela-emprestimos td:nth-of-type(3):before { content: "Livro"; }
  .tabela-emprestimos td:nth-of-type(4):before { content: "Retirada"; }
  .tabela-emprestimos td:nth-of-type(5):before { content: "Devolução Prevista"; }
  .tabela-emprestimos td:nth-of-type(6):before { content: "Status"; }
  
  /* Ajustar botões */
  .tabela-emprestimos td:last-child {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    padding: 10px;
  }
  
  button {
    padding: 8px;
    margin: 0;
    flex: 1;
    max-width: 80px;
    font-size: 0.9rem;
  }
}

@media (max-width: 400px) {
  .lista-emprestimos {
    padding: 10px;
  }
  
  .tabela-emprestimos td {
    padding-left: 45%;
    font-size: 0.9rem;
  }
  
  /* Texto pode ser longo nos celulares pequenos */
  .tabela-emprestimos td:nth-of-type(3),
  .tabela-emprestimos td:nth-of-type(5) {
    white-space: normal;
  }
  
  /* Para telas muito pequenas, alinhar botões verticalmente */
  .tabela-emprestimos td:last-child {
    flex-direction: column;
    padding: 8px;
  }
  
  button {
    max-width: none;
    width: 100%;
    margin-bottom: 5px;
    padding: 10px 8px;
  }
}
</style>
