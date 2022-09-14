import { fetchDataParams } from './Graph'

const second = 1000
const minute = 60 * second
const hour = 60 * minute
const day = 24 * hour

interface GraphIntervalButtonGroupProps {
  fetchData: (param: fetchDataParams) => void
  activeButton: number
}

const buttonList: [string, number][] = [
  ['1h', hour],
  ['6h', 6 * hour],
  ['12h', 12 * hour],
  ['1d', day],
  ['3d', 3 * day],
  ['7d', 7 * day],
]

export default function GraphIntervalButtonGroup({
  fetchData,
  activeButton,
}: GraphIntervalButtonGroupProps) {
  const renderButton = (index: number, label: string, interval: number) => {
    return (
      <button
        key={index}
        className={`btn ${index === activeButton ? 'btn-active' : ''}`}
        onClick={() => {
          fetchData({ relative: true, interval, index })
        }}>
        {label}
      </button>
    )
  }
  return (
    <div className="btn-group">
      {buttonList.map(([label, interval], index) =>
        renderButton(index, label, interval)
      )}
    </div>
  )
}
