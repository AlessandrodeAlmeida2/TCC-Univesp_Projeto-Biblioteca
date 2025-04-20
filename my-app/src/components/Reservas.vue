<template>
  <div>
    <h2>Reservas Pendentes</h2>
    <table class="tabela-reservas">
      <thead>
        <tr>
          <th>Livro</th>
          <th>Aluno</th>
          <th>Data da Reserva</th>
          <th>Data de Validade</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="reserva in reservasPendentes" :key="reserva.id">
          <td>{{ reserva.livro.titulo }}</td>
          <td>{{ reserva.aluno.nome }}</td>
          <td>{{ reserva.data_reserva }}</td>
          <td>{{ reserva.data_validade }}</td>
          <td>
            <button class="btn-concluir" @click="concluirReserva(reserva)">Concluir</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { supabase } from '../supabase';
export default {
  data() {
    return {
      reservasPendentes: [],
    };
  },
  async mounted() {
    const { data, error } = await supabase
      .from('reservas')
      .select('id, livro_id, aluno_id, data_reserva, data_validade')
      .eq('status', 'Pendente');

    const { data: livros, error: errorLivros } = await supabase
      .from('livros')
      .select('id, titulo');
    const { data: alunos, error: errorAlunos } = await supabase
      .from('alunos')
      .select('id, nome');

    if (error || errorLivros || errorAlunos) console.error(error, errorLivros, errorAlunos);
    else {
      this.reservasPendentes = data.map((r) => ({
        id: r.id,
        livro_id: r.livro_id,
        aluno_id: r.aluno_id,
        data_reserva: r.data_reserva.substring(0, 10),
        data_validade: r.data_validade,
        livro: livros.find((l) => l.id === r.livro_id),
        aluno: alunos.find((a) => a.id === r.aluno_id),
      }));
    }
  },
  methods: {
    async concluirReserva(reserva) {
      const { error } = await supabase
        .from('reservas')
        .update({ status: 'Concluido' })
        .eq('id', reserva.id);
      if (error) console.error(error);
      else {
        this.reservasPendentes = this.reservasPendentes.filter((r) => r.id !== reserva.id);
        this.$router.push('/cadastro-emprestimo');
      }
    },
  },
};
</script>

<style scoped>

/* Estilos para a seção de reservas pendentes */
div {
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

h2 {
  color: var(--cor-azul, #0047AB);
  margin-top: 0;
  margin-bottom: 20px;
  border-bottom: 2px solid var(--cor-azul-claro, #6495ED);
  padding-bottom: 10px;
}

.tabela-reservas {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.tabela-reservas th, 
.tabela-reservas td {
  border: 1px solid #e0e0e0;
  padding: 12px 15px;
  text-align: left;
}

.tabela-reservas th {
  background-color: var(--cor-azul, #0047AB);
  color: #fff;
  font-weight: 600;
}

.tabela-reservas tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.tabela-reservas tbody tr:hover {
  background-color: #f1f1f1;
}

.btn-concluir {
  padding: 8px 12px;
  background-color: var(--cor-azul, #0047AB);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn-concluir:hover {
  background-color: var(--cor-azul-claro, #6495ED);
}

/* Responsividade para dispositivos móveis */
@media (max-width: 768px) {
  div {
    padding: 15px;
  }
  
  .tabela-reservas {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
}

@media (max-width: 576px) {
  /* Transformar tabela em layout de cartões para telas pequenas */
  .tabela-reservas, 
  .tabela-reservas thead, 
  .tabela-reservas tbody, 
  .tabela-reservas th, 
  .tabela-reservas td, 
  .tabela-reservas tr {
    display: block;
  }
  
  .tabela-reservas thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }
  
  .tabela-reservas tr {
    margin-bottom: 15px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  .tabela-reservas td {
    position: relative;
    padding-left: 50%;
    border: none;
    border-bottom: 1px solid #eee;
    text-align: right;
    min-height: 30px;
  }
  
  .tabela-reservas td:before {
    position: absolute;
    top: 12px;
    left: 15px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    font-weight: bold;
    text-align: left;
    color: var(--cor-azul, #0047AB);
  }
  
  /* Adicionar os cabeçalhos para cada célula */
  .tabela-reservas td:nth-of-type(1):before { content: "Livro"; }
  .tabela-reservas td:nth-of-type(2):before { content: "Aluno"; }
  .tabela-reservas td:nth-of-type(3):before { content: "Data da Reserva"; }
  .tabela-reservas td:nth-of-type(4):before { content: "Data de Validade"; }
  .tabela-reservas td:nth-of-type(5):before { content: "Ações"; }
  
  /* Ajustar botões */
  .tabela-reservas td:last-child {
    display: flex;
    justify-content: flex-end;
    border-bottom: none;
    padding: 15px;
  }
  
  .btn-concluir {
    width: 100%;
    padding: 10px;
    font-size: 0.95rem;
    text-align: center;
  }
}

@media (max-width: 400px) {
  div {
    padding: 10px;
  }
  
  h2 {
    font-size: 1.4rem;
  }
  
  .tabela-reservas td {
    padding-left: 45%;
    padding-top: 12px;
    padding-bottom: 12px;
    font-size: 0.9rem;
  }
  
  /* Permitir quebra de texto em nomes longos */
  .tabela-reservas td:nth-of-type(1),
  .tabela-reservas td:nth-of-type(2) {
    white-space: normal;
  }
}

</style>