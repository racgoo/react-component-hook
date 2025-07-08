import { useEffect, useRef, memo, type ReactNode } from "react";
import { stringify } from "flatted";

export type ExportedComponentType<P, E> = (
  props: {
    setExportedState: (v: E) => void;
  } & P
) => ReactNode;

export function exportComponent<P, E>(
  Component: (props: P, exporter: (value: () => E) => void) => React.ReactNode
): ExportedComponentType<P, E> {
  function Exposed({ ...props }: { setExportedState: (v: any) => void } & P) {
    const valueRef = useRef<E | undefined>(undefined);

    const exporter = (callback: () => E) => {
      const newValue = callback();
      if (stringify(newValue) !== stringify(valueRef.current)) {
        valueRef.current = newValue;
      }
    };

    useEffect(() => {
      props.setExportedState(valueRef.current);
    }, [valueRef.current]);

    return Component({ ...props }, exporter);
  }

  return memo(Exposed) as ExportedComponentType<P, E>;
}
