import { supabase } from '../supabase'

export async function createReserva(reserva) {
  const { data, error } = await supabase.from('reservas').insert([reserva])
  return { data, error }
}

export async function getReservas() {
  const { data, error } = await supabase.from('reservas').select('*')
  return { data, error }
}

export async function getReservaById(id) {
  const { data, error } = await supabase.from('reservas').select('*').eq('id', id).single()
  return { data, error }
}

export async function updateReserva(id, updates) {
  const { data, error } = await supabase.from('reservas').update(updates).eq('id', id)
  return { data, error }
}

export async function deleteReserva(id) {
  const { data, error } = await supabase.from('reservas').delete().eq('id', id)
  return { data, error }
}
