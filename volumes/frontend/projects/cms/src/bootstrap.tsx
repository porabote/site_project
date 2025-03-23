import React from "react";
import {createRoot, Root} from 'react-dom/client';
import App from "./App";
// import { Worker } from 'worker_threads';
// import * as serviceWorker from './service-worker';



// const worker = new Worker(new URL('./miner_report.sw.js', import.meta.url), {
//     execArgv: process.env.VITEST ? ['--loader', 'tsx'] : undefined,
// })
// const worker = new Worker(new URL('./miner_report.sw.js', import.meta.url));
// worker.postMessage({
//     question:
//         'The Answer to the Ultimate Question of Life, The Universe, and Everything.',
// });
// worker.onmessage = ({ data: { answer } }) => {
//     console.log(answer);
// };



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
    './App/App.tsx',
    function () {
      console.log('Accepting the updated printMe module!');
    }
  )
}
