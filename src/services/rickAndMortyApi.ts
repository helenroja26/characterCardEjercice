export async function fetchCharacters(page: number = 1) {
  const response = await fetch(`https://rickandmortyapi.com/api/character?page=${page}`);
  if (!response.ok) throw new Error('Error al cargar personajes');
  return response.json();
}
