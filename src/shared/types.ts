export interface GenresNames { [id: string]: string; }

export interface SelectedGenres { [id: string]: boolean; }

export interface StorageOptions {
  selected: SelectedGenres;
}
