import React, { useEffect, useState } from 'react'

function Screen({ Exp, curr ,RExp,History,Eq,setHistory,val,setval}) {
    
    
    function calculateExpression(expression) {
        // console.log(expression[expression.length - 1])
        if (Number.isInteger(parseInt(expression[expression.length - 1]))){
            // console.log('Integer')
        }
        else expression=expression+'0'
        try {
            const result = eval(expression);
            return result;
        } catch (error) {
            return 'Err';
        }
    }
    
    useEffect(()=>{
        let a=document.getElementsByClassName('History')[0]
        if (a.scrollHeight >100){
            a.scrollTop = a.scrollHeight
        }
        
        let ans
        if (RExp[RExp.length - 1] != '÷')
        {
            ans = calculateExpression(Exp);
            setval(ans)
            
        }
        else {
            setval('Infinity')
        }
        
        return()=>{
            clearInterval(ans)
        }
    },[Exp])
    
    const clearHis=()=>{
        setHistory([])
    }
   
    return (
        <div className='Screen'>
            <div className='History'>
                <div className='cross' onClick={clearHis}>
                    <i className="fa-solid fa-trash"></i> 
                </div>
               {
                  History.map((item,id)=>{
                    return(
                        <div className='His' key={id}>
                            <h1>{item}</h1>
                        </div>
                    )
                  })
                // Eq && console.log(History)
               }
            </div>
            <div className='Expression'>
                <h1>{RExp}</h1>
            </div>
            <div className='Current'>
                {
                    <h1>{curr}</h1>

                }
                {
                    (!Eq)?<div className='dull' ><h1>{val}</h1></div>:
                    <div className='Bright'><h1>{val}</h1></div>

                }
            </div>
        </div>
    )
}

export default Screen