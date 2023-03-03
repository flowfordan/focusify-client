import { Sound } from "entities/Sound"

export const Sounds = () => {
  const items = [22, 44, 55, 66, 77, 88, 99, 12]
  return(
    <div>
      {items.map(i => <Sound key={i}/>)}
    </div>
  )
}