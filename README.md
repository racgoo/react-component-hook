# ⚡️ react-component-hook

**Supercharge your React components:  
Access child state from the parent,  
No prop drilling, no context boilerplate, no pain.**

<div align="center">
<img width="320" alt="Scry" src="https://github.com/user-attachments/assets/e0faa465-c944-4d94-88cf-74f96b902d23" />
</div>

<div align="center">
  <img src="https://img.shields.io/badge/version-0.1.2-blue.svg" alt="Version"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License"/>
  <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs Welcome"/>
</div>

Github: [https://github.com/racgoo/scry](https://github.com/racgoo/react-component-hook)

NPM: [https://www.npmjs.com/package/@racgoo/scry](https://www.npmjs.com/package/react-component-hook)

---

## 🚀 Introduction

`react-component-hook` lets you **access a child component’s state or public API directly from the parent**—  
without prop drilling, without context spaghetti, and without breaking React’s rules.

- **No more prop chains.**
- **No more context hell.**
- **Just pure, direct, component-to-component power.**

> Stop designing components where children depend on their parent’s logic.

> With react-component-hook, children stay independent—parents can access their state or methods without coupling or prop drilling.

---

## ✨ Features

- 🔗 **Parent can access child state or methods directly**
- ⚡ **No prop drilling, no context setup required**
- 🦾 **TypeScript & JavaScript support**
- 🌲 **Works with nested component trees**
- 🛡️ **Keeps children independent—never force a child to depend on parent logic**

---

## 📦 Install

```bash
# With npm
npm install react-component-hook

# With pnpm
pnpm add react-component-hook

# With yarn
yarn add react-component-hook
```

---

## ⚡️ Quick Example

**Parent can access child’s state directly, no props needed!**

```tsx
// App.tsx
import { useComponent } from "react-component-hook";
import Parent from "./Parent";

function App() {
  // App can access Parent's exported state
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
```

```tsx
// Parent.tsx
import Child from "./Child";

// Parent's props interface
interface ParentProps {
  children: React.ReactNode;
}

// Parent's export state interface
interface ParentExporter {
  handleClick: () => void;
  state: string;
}

// HOC with exportComponent
const Parent = exportComponent<ParentProps, ParentExporter>(
  // Original Component code
  ({ children }, exporter) => {
    // Parent can access Child's exported state
    const {
      exportedState: exportedChildState,
      Component: ChildComponent,
      mounted: childMounted,
    } = useComponent(Child);

    const handleClick = () => {
      // If Child component is mounted, you can use child's exported state
      if (childMounted) {
        exportedChildState!.handleClick();
      }
    };

    // Export some state with getter pattern
    //exportedChildState can be undefined, if not mounted
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
```

```tsx
// Child.tsx
import { useState } from "react";
import { exportComponent } from "react-component-hook";

// Child's props interface
interface ChildProps {
  children: React.ReactNode;
}

// Child's export state interface
interface ChildExporter {
  handleClick: () => void;
  state: string;
}

//HOC with exportComponent
const Child = exportComponent<ChildProps, ChildExporter>(
  ({ children }, exporter) => {
    const [state, setState] = useState("Hi, I'm child");

    const handleClick = () => {
      setState((prev) => prev + "!");
    };

    //// Export some state with getter pattern
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
```

---

## 🛠️ Usage

### 1. Wrap your child with `exportComponent`

Wrap your component with `exportComponent`.  
Expose any value, state, or method to the parent by calling the `exporter` function with a **getter** (a function that returns your export object).

```tsx
import { useState } from "react";
// 1. import 'exportComponent'
import { exportComponent } from "react-component-hook";

// 2. declare component's props
interface ChildProps {
  children: React.ReactNode;
}

// 3. delcare export's props
interface ChildExporter {
  handleClick: () => void;
  state: string;
}

// 4. wrap(HOC) original component with exportComponent
// needs Generic for Props, Exports
const Child = exportComponent<ChildProps, ChildExporter>(
  ({ children }, exporter) => {
    const [state, setState] = useState("Hi, I'm child");

    const handleClick = () => {
      setState((prev) => prev + "!");
    };

    // 5. Export some state with getter pattern
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
```

### 2. Access the child’s state or API in the parent with `useComponent`

Use `useComponent` in the parent to get both the child’s exported value and a wrapper component to render the child.

```tsx
import Child from "./Child";
// 1. import 'useComponent'
import { useComponent } from "react-component-hook";

export default function Parent() {
  // 2. get component info with useComponent
  const { exportedState, Component, mounted } = useComponent(Child);
  // 3. render component
  return (
    <div>
      <Component />
      <div>Child state: {childState}</div>
    </div>
  );
}
```

---

## 🤔 FAQ

**Q. Can I access methods, not just state?**  
A. Yes! Just expose any function or object via `exporter`.

**Q. Does this work with deeply nested children?**  
A. Absolutely. You can chain as deep as you want.

**Q. Is this safe for production?**  
A. Yes! No hacks, no monkey-patching, just clean React patterns.

---

## 🧪 Example Project

- Clone this repo
- move to `example directory`
- Run `pnpm install` (or `npm install`)
- Run `pnpm run dev` (or `npm run dev`)
- Open your browser and see the magic

---

## 📝 Third Party Licenses

This project uses the following third-party packages:

- [flatted](https://github.com/WebReflection/flatted#readme) - ISC License

---

## 💬 Contact

Questions, bugs, or want to contribute?  
Open an issue or PR, or email [lhsung98@naver.com](mailto:lhsung98@naver.com)

---

**Stop prop drilling.  
Start component hooking.  
Use `react-component-hook` today!**
