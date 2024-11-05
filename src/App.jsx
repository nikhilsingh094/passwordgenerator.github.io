import { useEffect, useRef, useState } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [isnumber, setIsNumber] = useState("");
  const [ischaracter, setIsCharacter] = useState("");

  const [password, setPassword] = useState("");

  const passRef = useRef(null);

  const generate = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (isnumber) str += "012346789";
    if (ischaracter) str += "!@#$%^&*";

    for (let i = 1; i <= length; i++) {
      let rand = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(rand);
    }

    setPassword(pass);
  }, [length, isnumber, ischaracter, setPassword]);

  const copyPassword = () => {
    passRef.current?.select();
    // passRef.current?.setSelectionRange(0,3)
    window.navigator.clipboard.writeText(password)
  }

  useEffect(() => {
    generate();
  }, [length, isnumber, ischaracter]);

  return (
    <div className="p-6 w-[500px] mx-auto bg-gray-400 my-10">
      <div className="flex items-center">
        <input
        onChange={(e)=>setPassword(e.target.value)}
          className="w-full py-2 pl-2 border border-blue-400"
          type="text"
          placeholder="password"
          value={password}
          readOnly
          ref={passRef}
        />
      <button onClick={copyPassword} className="cursor-pointer bg-green-800 text-white py-2 px-4 hover:bg-green-400">Copy</button>
      </div>

      <div className="w-full mx-auto flex items-center gap-2">
        <div>
          <input onChange={(e)=>setLength(e.target.value)} className="mt-5" type="range" min={8} max={100} />
          <label className="text-lg font-semibold px-2">{length}</label>
        </div>
        <div>
          <input onChange={()=>setIsNumber((prev)=>!prev)} className="mt-5 mr-2" type="checkbox" defaultChecked={isnumber} />
          <label className="text-lg font-semibold">Number</label>
        </div>
        <div>
          <input onChange={()=>setIsCharacter((prev)=>!prev)} className="mt-5 mr-2" type="checkbox" defaultChecked={ischaracter}/>
          <label className="text-lg font-semibold">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
