import React, { useState } from 'react'
import Screen from './Screen'
import Button from './Button'
function CalcuUI() {
    const [Exp, setExp] = useState('')
    const [RExp, setRExp] = useState('')
    const [curr, setcurr] = useState('')
    const [History, setHistory] = useState([])
    const [Eq, setEq] = useState(false)
    const [Inf, setInf] = useState(0)
    const [val, setval] = useState('0')
    return (
        <div className='Cal'>
            <div className='CalcuUI'>
                <Screen
                    Exp={Exp}
                    curr={curr}
                    RExp={RExp}
                    History={History}
                    Eq={Eq}
                    setHistory={setHistory}
                    val={val}
                    setval={setval}
                />
                <Button
                    Exp={Exp}
                    setExp={setExp}
                    curr={curr}
                    setcurr={setcurr}
                    RExp={RExp}
                    setRExp={setRExp}
                    setEq={setEq}
                    History={History}
                    setHistory={setHistory}
                    val={val}
                    setval={setval}
                />
            </div>
        </div>
    )
}

export default CalcuUI