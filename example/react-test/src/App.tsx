import "./App.css";
import { useComponent } from "react-component-hook";
import Parent from "./Parent";

function App() {
  const {
    exportedState: exportedParentState,
    Component: ParentComponent,
    mounted: parentMounted,
  } = useComponent(Parent);

  const handleClick = () => {
    if (parentMounted) {
      exportedParentState!.handleClick();
    }
  };

  return (
    <>
      <button onClick={handleClick}>RootClick</button>
      <ParentComponent />
    </>
  );
}

export default App;
