import { createRequestHandler } from "rakkasjs";
import { createStoreServer, MyRequestContext, StoreProvider } from "./store";

export default createRequestHandler({
  createPageHooks(requestContext: MyRequestContext) {
    return {
      emitToDocumentHead() {
        const state = requestContext.locals.storeInit;
        return `<script>globalThis.__StoreInit=${JSON.stringify(
          state
        )}</script>`;
      },

      wrapApp(app) {
        const store = createStoreServer(requestContext);
        const _createStore = () => store;
        return <StoreProvider createStore={_createStore}>{app}</StoreProvider>;
      },
    };
  },
});
