import { ToyPreview } from './ToyPreview'

export function ToyList({ toys, onRemoveToy }) {
  return (
    <section className="toy-list ">
      <ul className="clean-list list-layout">
        {toys.map(toy => (
          <li key={toy._id}>
            <ToyPreview toy={toy} onRemoveToy={onRemoveToy} />
          </li>
        ))}
      </ul>
    </section>
  )
}
