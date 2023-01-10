import { startClient } from "rakkasjs";
import { createStore, StoreProvider } from "./store";

const storeInit = (globalThis as any).__StoreInit;
const store = createStore(storeInit);
const _createStore = () => store;

startClient({
  hooks: {
    wrapApp(app) {
      return <StoreProvider createStore={_createStore}>{app}</StoreProvider>;
    },
  },
});
