import { supabase } from '../supabase'

export async function createEmprestimo(emprestimo) {
  const { data, error } = await supabase.from('emprestimos').insert([emprestimo])
  return { data, error }
}

export async function getEmprestimos() {
  const { data, error } = await supabase.from('emprestimos').select('*')
  return { data, error }
}

export async function getEmprestimoById(id) {
  const { data, error } = await supabase.from('emprestimos').select('*').eq('id', id).single()
  return { data, error }
}

export async function updateEmprestimo(id, updates) {
  const { data, error } = await supabase.from('emprestimos').update(updates).eq('id', id)
  return { data, error }
}

export async function deleteEmprestimo(id) {
  const { data, error } = await supabase.from('emprestimos').delete().eq('id', id)
  return { data, error }
}
