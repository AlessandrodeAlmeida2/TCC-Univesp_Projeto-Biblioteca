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
            <button @click="editarEmprestimo(emprestimo.id)">Editar</button>
            <button @click="deletarEmprestimo(emprestimo.id)">Deletar</button>
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
button {
  margin-right: 8px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: #fff;
  cursor: pointer;
}
button:last-child {
  background: #d32f2f;
}
</style>
