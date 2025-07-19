import { useState } from 'react'
// import 
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import { counterAtom, even } from './store/atom/counter';
export default function Counter() {
  return (
    <div>
      <RecoilRoot>
        <Value />
        <IsEven />
        <Button />
      </RecoilRoot>
    </div>
  )
}
function IsEven() {
  const isEven = useRecoilValue(even);
  return <div>
    {isEven ? "Even" : "Odd"}
  </div>
}
function Button(){
  const setCount = useSetRecoilState(counterAtom)
  return <div>
    <button onClick={() => setCount(c => c + 2)}>Increase</button>
    <button onClick={() => setCount(c => c - 1)}>Decrease</button>
  </div>
}
function Value(){
    const count = useRecoilValue(counterAtom)
    return <div>{count}</div>
}
// function Increase(){
//     const setCount = useSetRecoilState(counterAtom)
//     return <button onClick={() => setCount(c => c + 1)}>Increase</button>
// }
// function Decrease(){
//     const setCount = useSetRecoilState(counterAtom)
//     return <button onClick={() => setCount(c => c - 1)}>Decrease</button>
// }
