import { useState, useMemo, useEffect } from "react";
import type { ExportedComponentType } from "../exporter/exportComponent";

export function useComponent<P, E>(
  ExposedComponent: ExportedComponentType<P, E>
) {
  const [exportedState, setExportedState] = useState<E | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (exportedState !== undefined) {
      setMounted(true);
    }
  }, [exportedState]);

  const Component = useMemo(
    () =>
      function Wrapper(props: any) {
        return (
          <ExposedComponent {...props} setExportedState={setExportedState} />
        );
      },
    []
  );

  return {
    exportedState,
    Component,
    mounted,
  } as const;
}
