import {
  useRef,
  useState,
} from "react";

import {
  createRoot,
} from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

const TestApp = () => {
  const countRef =
    useRef<number>(0);

  const [
    count,
    setCount,
  ] = useState<number>(0);

  const handleClick = (): void => {
    countRef.current += 1;

    setCount(
      countRef.current
    );
  };

  return (
    <div
      style={{
        padding: "40px",
      }}
    >
      <h1>
        BrowserRouter Hook Test
      </h1>

      <p>
        Count: {count}
      </p>

      <button
        type="button"
        onClick={handleClick}
      >
        Increment
      </button>
    </div>
  );
};

const rootElement =
  document.getElementById("root");

if (!rootElement) {
  throw new Error(
    "Root element was not found."
  );
}

createRoot(rootElement).render(
  <BrowserRouter>
    <TestApp />
  </BrowserRouter>
);