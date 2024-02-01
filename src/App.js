/* eslint-disable react-hooks/exhaustive-deps */

import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
function App() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const Symbol = ["+", "-", "/", "*"];
  const [currentValue, setcurrentValue] = useState("") 
  const [currenValue, setcurrenValue] = useState("") 
	
  useEffect(() => {
    function evaluate(expression)
	{
    // alert(expression);
		let tokens = expression.split('');
		let values = [];
		let ops = [];

		for (let i = 0; i < tokens.length; i++)
		{
			if (tokens[i] === ' ')
			{
				continue;
			}
			if (tokens[i] >= '0' && tokens[i] <= '9')
			{
				let sbuf = "";
				while (i < tokens.length &&
						tokens[i] >= '0' &&
							tokens[i] <= '9')
				{
					sbuf = sbuf + tokens[i++];
				}
				values.push(parseInt(sbuf, 10));
				i--;
      }
			else if (tokens[i] === '(')
			{
				ops.push(tokens[i]);
			}
			else if (tokens[i] === ')')
			{
				while (ops[ops.length - 1] != '(')
				{
				values.push(applyOp(ops.pop(),
								values.pop(),
								values.pop()));
				}
				ops.pop();
			}
			else if (tokens[i] === '+' ||
					tokens[i] === '-' ||
					tokens[i] === '*' ||
					tokens[i] === '/')
			{
				while (ops.length > 0 &&
						hasPrecedence(tokens[i],
									ops[ops.length - 1]))
				{
				values.push(applyOp(ops.pop(),
								values.pop(),
								values.pop()));
				}
				ops.push(tokens[i]);
			}
		}
		while (ops.length > 0)
		{
			values.push(applyOp(ops.pop(),
							values.pop(),
							values.pop()));
		}
    // if(isNaN(values.pop())) return "";
		return values.pop();
	}

	function hasPrecedence(op1, op2)
	{
		if (op2 === '(' || op2 === ')')
		{
			return false;
		}
		if ((op1 === '*' || op1 === '/') &&
			(op2 === '+' || op2 === '-'))
		{
			return false;
		}
		else
		{
			return true;
		}
	}

	function applyOp(op, b, a)
	{
		switch (op)
		{
		case '+':
			return a + b;
		case '-':
			return a - b;
		case '*':
			return a * b;
		case '/':
			if (b === 0)
			{
				document.write("Cannot divide by zero");
			}
			return parseInt(a / b, 10);
    default:
      return 0;
		}
	}
    const d = evaluate(currentValue);
    if(d)
      setcurrenValue(evaluate(currentValue));
  }, [currentValue])
  

  
  return (
    <div className="App flex flex-col items-center justify-center h-screen">
      <h1 className="text-green-600 font-bold mb-4">
        Calculator
      </h1>
      <div className="display text-blue-600 m-3 p-1">{currentValue}</div>
      <div className="display text-gray-300 font-bold m-3 p-1">{currenValue}</div>
      <div className="border-t grid grid-cols-4 ">
        {numbers.map(Element => {
          return <button onClick={() => {setcurrentValue(currentValue + Element);}} key={Element} className='rounded-full hover:bg-sky-700 hover:text-white border m-4 text-blue-400 font-extrabold p-2 border-cyan-700 border-solid'>{Element}</button>
        })}
        {Symbol.map((Element) => {
          return <button onClick={() => setcurrentValue(currentValue + Element)} key={Element} className='rounded-full hover:bg-sky-700 hover:text-white border m-4 text-blue-400 font-extrabold p-2 border-cyan-700 border-solid'>{Element}</button>
        })}
        <button onClick={() => { setcurrentValue(""); setcurrenValue("");}} className='rounded-full hover:bg-sky-700 hover:text-white border m-4 text-blue-400 font-extrabold p-2 border-cyan-700 border-solid'>C</button>
        <button onClick={() => setcurrentValue(currentValue.substring(0,currentValue.length-1))} className='rounded-full hover:bg-sky-700 hover:text-white border m-4 text-blue-400 font-extrabold p-2 border-cyan-700 border-solid'>_</button>
      </div>

    </div>
  );
}

export default App;
