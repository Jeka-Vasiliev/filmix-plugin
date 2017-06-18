import { h } from 'preact'

const Genre = ({ id, text, checked = false, onChange }) => (
  <div >
    <input type="checkbox" value={id} checked={checked} onChange={onChange} />
    {text}
  </div >
)
export default Genre
