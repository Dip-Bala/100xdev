import React, { useState, memo, useEffect } from 'react'

export default function MemoCounter() {
    return (
        <div>
            <Counter />
        </div>
    )
}
function Counter() {
    const [state, setState] = useState(0);
    // useEffect(() => {
    //     setInterval(() => {
    //         setState(c => c + 1)
    //     }, 3000)
    // })
    return (
        <div>
            <MemoTag />
            <Value count={state} />
            <Increase setCount={setState} />
            <Decrease setCount={setState} />
        </div>
    )
}

const MemoTag = memo(() => {
    return <div>This is a memo div</div>
})
const Value = memo(( { count }) => {
    return <div>{count}</div>
})
function Increase({ setCount }) {
    return <button onClick={() => setCount(c => c + 1)}>Increase</button>
}
const Decrease = memo(() =>{
    return <button onClick={() => {}}>Decrease</button>
})
