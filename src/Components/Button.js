import React, { useEffect, useState } from 'react'
import song from '../Chalak.mp3'

let audio = new Audio(song)
function Button({ Exp, setExp, curr, setcurr, RExp, setRExp, setEq, History, setHistory, val, setval }) {
    const array = ['%', 'CE', 'C', 'CLEAR', '1/x', 'x²', '√x', '÷', 7, 8, 9, '×', 4, 5, 6, '-', 1, 2, 3, '+', '+/-', 0, '•', '=']

    function calculateExpression(expression) {
        // console.log(expression[expression.length - 1])
        if (expression[expression.length - 1] !== '/') {
            if (Number.isInteger(parseInt(expression[expression.length - 1]))) {
                // console.log('Integer')
            }
            else expression = expression + '0'
            try {
                const result = eval(expression);
                return result;
            } catch (error) {
                return 'Err';
            }
        }
    }

    const SetCurrentVal = (id) => {

        if (curr.length >= 16) {
            if (array[id] == 'CLEAR') {
                setcurr(curr.slice(0, -1))
            }
        }
        else {
            if (Exp === 'Infinity') {
                if (id == 2) {
                    setExp('')
                    setcurr('')
                    setRExp('')
                    setcurr('')

                }
            }
            else {
                if (id == 23) {
                    // console.log(calculateExpression((Exp + curr)))
                    if (calculateExpression((Exp + curr)) != Infinity) {
                        // console.log('Hello')
                        setExp(Exp + curr)
                        setRExp(RExp + curr)
                        setHistory([...History, RExp + curr])
                        setcurr('')
                        setEq(true)
                    }

                    if (calculateExpression(Exp + curr) === Infinity) {
                        setExp('Infinity')
                    }

                }
                if (id != 23) {
                    setEq(false)
                }
                if (id == 2) {
                    setExp('')
                    setcurr('')
                    setRExp('')
                    setcurr('')

                }
                if (array[id] >= 0 && array[id] <= 9) {

                    setcurr(curr + array[id])

                }

                if (array[id] == '1/x') {
                    if (curr === '' || curr === '0') {
                        curr = '0'
                        setRExp(RExp + `1/${curr}`)
                        setExp(Exp + 1 / curr)
                    }
                    else {
                        setRExp(RExp + `1/${curr}`)
                        setExp(Exp + 1 / curr)

                    }
                    setcurr('')
                }
                if (array[id] == 'x²') {

                    if (curr != '') {
                        setExp(Exp + curr * curr)
                        setRExp(RExp + `${curr}²`)
                    }
                    setcurr('')
                }
                if (array[id] == '√x') {
                    if (curr != '') {
                        setExp(Exp + Math.sqrt(curr))
                        setRExp(RExp + `√` + curr)
                    }
                    setcurr('')
                }
                if (array[id] == '•') {
                    setcurr(curr + '.')
                }

                if (array[id] == 'CE') {
                    setcurr('')

                }

                if (array[id] == 'CLEAR') {
                    setcurr(curr.slice(0, -1))
                }
                if (array[id] == '+/-' && curr !== '') {
                    console.log(typeof (curr))
                    curr = `${curr * -1}`
                    setcurr(curr)

                }
                if (array[id] == '%') {
                    if (curr != '') {
                        setExp(Exp + curr / 100)
                        setRExp(RExp + curr + '%')
                    }
                    setcurr('')
                }
                else if (array[id] == '+' || array[id] == '-' || array[id] == '×' || array[id] == '÷') {
                    setRExp(RExp + curr + array[id])

                    if (array[id] == '×') {
                        setExp(Exp + curr + '*')
                    }
                    else if (array[id] == '÷') {
                        setExp(Exp + curr + '/')
                    }
                    else setExp(Exp + curr + array[id])
                    setcurr('')

                }
            }
        }

    }


    const disablebutton = () => {

        if (Exp == 'Infinity') {
            audio.currentTime = 0
            audio.play();
            let a = document.getElementsByClassName('btn')
            // console.log(a);
            a = Array.from(a)
            a.map((item) => {
                (item.innerText != 'C') && (item.innerHTML = '<h1 class="Emoji">😡</h1>')
            })
        }
        else {
            audio.pause()
            let a = document.getElementsByClassName('btn')
            a = Array.from(a)
            a.map((item, id) => {
                (item.innerHTML = `<h1>${array[id]}</h1>`)
            })
        }
    }
    useEffect(() => {

        const c = disablebutton();
        return () => {
            clearInterval(c);
        }
    }, [Exp])
    return (
        <div className='Button'>
            {
                array.map((item, id) => {
                    return (
                        <div className={`btn btn${id}`}
                            key={id}
                            onClick={() => { SetCurrentVal(id) }}
                        ><h1>{item}</h1></div>
                    )
                })
            }

        </div>
    )
}

export default Button