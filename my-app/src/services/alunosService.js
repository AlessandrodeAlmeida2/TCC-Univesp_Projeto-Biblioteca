import { supabase } from '../supabase'

export async function createAluno(aluno) {
  const { data, error } = await supabase.from('alunos').insert([aluno])
  return { data, error }
}

export async function getAlunos() {
  const { data, error } = await supabase.from('alunos').select('*')
  return { data, error }
}

export async function getAlunoById(id) {
  const { data, error } = await supabase.from('alunos').select('*').eq('id', id).single()
  return { data, error }
}

export async function updateAluno(id, updates) {
  const { data, error } = await supabase.from('alunos').update(updates).eq('id', id)
  return { data, error }
}

export async function deleteAluno(id) {
  const { data, error } = await supabase.from('alunos').delete().eq('id', id)
  return { data, error }
}
