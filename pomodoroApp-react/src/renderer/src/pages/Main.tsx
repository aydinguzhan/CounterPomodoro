import Counter from '@renderer/components/Counter'
import Versions from '@renderer/components/Versions'

type Props = {}

export default function Main({}: Props) {
  return (
    <div>
      <Counter />
      <Versions />
    </div>
  )
}
