import create, { StoreApi } from "zustand";
import { immer } from "zustand/middleware/immer";
import createContext from "zustand/context";
import { RequestContext } from "rakkasjs";

export type MyRequestContext = RequestContext & {
  locals: {
    storeInit: Partial<StoreState>;
  };
};
export type Configuration = {
  someApiUrl: string;
  language: string;
};
export type StoreState = {
  configuration: Configuration;
};

const zustandContext = createContext<StoreApi<StoreState>>();
export const StoreProvider = zustandContext.Provider;
export const useStore = zustandContext.useStore;

export const createStoreServer = (requestContext: MyRequestContext) => {
  const language = "en";
  requestContext.locals.storeInit = {
    configuration: {
      someApiUrl: process.env.SOME_PUBLIC_API_URL || "",
      language,
    },
  } as Partial<StoreState>;
  return createStore({
    defaultState: requestContext.locals.storeInit,
  });
};

export interface CreateStoreOptions {
  defaultState?: Partial<StoreState>;
}

export const createStore = (options: CreateStoreOptions = {}) =>
  create<StoreState>()(
    immer((set, get) => ({
      configuration: {
        someApiUrl: "",
        language: "",
      },
      ...options.defaultState,
    }))
  );
