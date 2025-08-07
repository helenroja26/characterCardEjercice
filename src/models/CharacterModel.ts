export interface CharacterModel {
  id: number;
  name: string;
  image: string;
  status: string;
  species: string;
  gender: string;
  location: { name: string, url: string };
  type: string;
  origin: { name: string, url: string };
  created: string;
  episode: string[];
}
