import { supabase } from '../supabase'

export async function createLivro(livro) {
  const { data, error } = await supabase.from('livros').insert([livro])
  return { data, error }
}

export async function getLivros() {
  const { data, error } = await supabase.from('livros').select('*')
  return { data, error }
}

export async function getLivroById(id) {
  const { data, error } = await supabase.from('livros').select('*').eq('id', id).single()
  return { data, error }
}

export async function updateLivro(id, updates) {
  const { data, error } = await supabase.from('livros').update(updates).eq('id', id)
  return { data, error }
}

export async function deleteLivro(id) {
  const { data, error } = await supabase.from('livros').delete().eq('id', id)
  return { data, error }
}
