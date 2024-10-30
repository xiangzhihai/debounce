import { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState<string>('');
  const [debouncedInput, setDebouncedInput] = useState<string>('');
  const timeOutRef = useRef<number | null>(null);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value);
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = setTimeout(() => {
      setDebouncedInput(event.target.value);
    }, 2000);
  }

  useEffect(() => {
    return () => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="card">
        <div>
          <span>Input with instant feedback: </span>
          <input value={input} onChange={handleInputChange} />
        </div>

        <p>Here is a debonced input with 2 seconds: {debouncedInput}</p>
      </div>
    </>
  );
}

export default App;
