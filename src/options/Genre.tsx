import { h } from 'preact'

type GenreProps = {
  key: string,
  id: string,
  text: string,
  checked: boolean,
  onChange: (e: Event) => void
}

const Genre = ({ id, text, checked = false, onChange }: GenreProps) => (
  <div >
    <input type="checkbox" value={id} checked={checked} onChange={onChange} />
    {text}
  </div >
)
export default Genre
