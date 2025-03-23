import React from "react";
import {createRoot, Root} from 'react-dom/client';
import App from "./App";

const container: HTMLElement | null = document.getElementById('root');

const root: Root = createRoot(container!);

if (!root) {
  throw new Error('root not found')
}

root.render(<App/>);

//serviceWorker.registerWorker();

if (module.hot) {
//path.resolve(__dirname, "./src/components/app/app.tsx")
  module.hot.accept(
    './App.tsx',
    function () {
      console.log('Accepting the updated printMe module!');
    }
  )
}
