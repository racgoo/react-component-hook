import { exportComponent, useComponent } from "react-component-hook";
import Child from "./Child";

interface ParentProps {
  children: React.ReactNode;
}

interface ParentExporter {
  handleClick: () => void;
  state: string;
}

const Parent = exportComponent<ParentProps, ParentExporter>(
  ({ children }, exporter) => {
    const {
      exportedState: exportedChildState,
      Component: ChildComponent,
      mounted: childMounted,
    } = useComponent(Child);

    const handleClick = () => {
      if (childMounted) {
        exportedChildState!.handleClick();
      }
    };

    if (exportedChildState) {
      exporter(() => {
        return {
          handleClick: exportedChildState.handleClick,
          state: exportedChildState.state,
        };
      });
    }

    return (
      <div>
        <button onClick={handleClick}>{"Parent Click"}</button>
        <ChildComponent />
      </div>
    );
  }
);
export default Parent;
