import { useState } from "react";
import { exportComponent } from "react-component-hook";

interface ChildProps {
  children: React.ReactNode;
}

interface ChildExporter {
  handleClick: () => void;
  state: string;
}

const Child = exportComponent<ChildProps, ChildExporter>(
  ({ children }, exporter) => {
    const [state, setState] = useState("Hi, I'm child");
    const handleClick = () => {
      setState((prev) => prev + "!");
    };

    exporter(() => ({
      handleClick,
      state,
    }));

    return (
      <div>
        <button onClick={handleClick}>{"Child Click"}</button>
        <p>{state}</p>
      </div>
    );
  }
);
export default Child;
