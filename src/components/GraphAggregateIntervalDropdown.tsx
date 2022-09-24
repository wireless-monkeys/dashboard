import React, { RefObject, useRef, useState } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

import { fetchDataParams } from './Graph'

interface GraphAggregateIntervalDropdownProps {
  latestParams: fetchDataParams
  fetchData: (param: fetchDataParams) => void
}

export function GraphAggregateIntervalDropdown({
  latestParams,
  fetchData,
}: GraphAggregateIntervalDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const options = [1, 3, 5, 10, 15, 30, 60]
  const handleUnfocus = () => {
    dropdownRef.current?.classList.toggle('dropdown-open')
    ;(document!.activeElement! as HTMLElement).blur()
  }
  return (
    <div className="dropdown" ref={dropdownRef}>
      <label tabIndex={0} className="btn" onClick={() => handleUnfocus()}>
        {`${latestParams.aggregateInterval} minutes`} <MdArrowDropDown />
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {options.map((option) => (
          <li
            key={option}
            onClick={() => {
              handleUnfocus()
              fetchData({
                ...latestParams,
                aggregateInterval: option,
              })
            }}>
            <a>{option} minutes</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
