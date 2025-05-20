import { supabase } from '../supabase';

export default {
  async listarAlunos() {
    const { data, error } = await supabase.from('alunos').select('*');
    if (error) throw error;
    return data;
  },
  async buscarAlunoPorRa(ra) {
    const { data, error } = await supabase.from('alunos').select('*').eq('ra', ra).single();
    if (error) throw error;
    return data;
  },
  async atualizarAluno(id, dadosAtualizados) {
    const { data, error } = await supabase.from('alunos').update(dadosAtualizados).eq('id', id).select().single();
    if (error) throw error;
    return data;
  }
};
