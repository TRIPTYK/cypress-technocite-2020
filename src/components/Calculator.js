import React, { useEffect, useReducer } from 'react'
import Button from './Button'

function calcReducer(currentState, newState) {
  return { ...currentState, ...newState }
}

const operations = {
  '/': (prevValue, nextValue) => prevValue / nextValue,
  '*': (prevValue, nextValue) => prevValue * nextValue,
  '+': (prevValue, nextValue) => prevValue + nextValue,
  '-': (prevValue, nextValue) => prevValue - nextValue,
  '=': (prevValue, nextValue) => nextValue,
}
const Calculator = () => {
  const [state, setState] = useReducer(calcReducer, {
    value: null,
    displayValue: '0',
    operator: null,
    waitingForOperand: false,
  })
  const { value, displayValue, operator, waitingForOperand } = state
  function inputDigit(digit) {
    if (waitingForOperand) {
      setState({
        displayValue: String(digit),
        waitingForOperand: false,
      })
    } else {
      setState({
        displayValue:
          displayValue === '0' ? String(digit) : displayValue + digit,
      })
    }
  }
  function inputDot(){
      if(!/\./.test(displayValue)){
          setState({
              displayValue:`${displayValue}.`,
              waitingForOperand:false
          })
      }
  }
  function inputPercent(){
      const currentValue = parseFloat(displayValue)
      if(currentValue === 0) return
      const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
      const newValue = parseFloat(displayValue)/100
      setState({
          displayValue : String(newValue.toFixed(fixedDigits.length+2))
      })
  }
  function performOperation(nextOperator) {
    console.log(nextOperator)
    const inputValue = parseFloat(displayValue)
    if (value === null) {
      setState({
        value: inputValue,
      })
    } else if (operator) {
      const currentValue = value || 0
      const newValue = operations[operator](currentValue, inputValue)
      setState({
        value: newValue,
        displayValue: String(newValue),
      })
    }
    setState({
      waitingForOperand: true,
      operator: nextOperator,
    })
  }
  function clearAll(){
      setState({
        value:null,
        displayValue:'0',
        operator:null,
        waitingForOperand:false
      })
  }
  function clearLastChar(){
      setState({
          displayValue: displayValue.substring(0,displayValue.length-1) || '0'
      })
  }
  function handleKeyDown(e){1
      let {key} = e;
      console.log(key)
    if(key === 'Enter') key= '=';
      if((!isNaN(key))){
          e.preventDefault();
          inputDigit(parseInt(key,10))
      } else if(key in operations){
        e.preventDefault();
        performOperation(key)
      } else if(key === 'Delete'){
        e.preventDefault();
        clearAll();
      } else if(key === '.' || key ===','){
          e.preventDefault()
          inputDot();
      
      } else if(key === 'Backspace'){
          e.preventDefault()
          clearLastChar();
      }
  }
  useEffect(()=>{
      document.addEventListener('keydown',handleKeyDown)
      return ()=>document.removeEventListener('keydown',handleKeyDown)
  })
  return (
    <div className="w-64">
      <p className="w-full border  border-2-white  bg-black text-green-400 text-right text-4xl px-2">
        {displayValue}
      </p>
      <p className="flex">
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(1)}
        >
          1
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(2)}
        >
          2
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(3)}
        >
          3
        </Button>
        <Button
          className="calculator-secondary-btn"
          onClick={() => performOperation('+')}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </Button>
      </p>
      <p className="flex">
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(4)}
        >
          4
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(5)}
        >
          5
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(6)}
        >
          6
        </Button>
        <Button
          className="calculator-secondary-btn"
          onClick={() => performOperation('-')}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </Button>
      </p>
      <p className="flex">
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(7)}
        >
          7
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(8)}
        >
          8
        </Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(9)}
        >
          9
        </Button>
        <Button
          className="calculator-secondary-btn"
          onClick={() => performOperation('/')}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"
            />
          </svg>
        </Button>
      </p>
      <p className="flex">
        <Button className="calculator-primary-btn" onClick={() => clearAll()}>C</Button>
        <Button
          className="calculator-primary-btn"
          onClick={() => inputDigit(0)}
        >
          0
        </Button>
        <Button className="calculator-primary-btn" onClick={()=>inputDot()}>,</Button>
        <Button
          className="calculator-secondary-btn"
          onClick={() => performOperation('*')}
        >
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Button>
      </p>
      <p className="flex">
        <span className="calculator-primary-btn"></span>
        <span className="calculator-primary-btn"></span>
        <Button className="calculator-primary-btn" onClick={()=>inputPercent()}>%</Button>
        <Button
          className="calculator-secondary-btn"
          onClick={() => performOperation('=')}
        >
          =
        </Button>
      </p>
    </div>
  )
}
export default Calculator
