import React from 'react';
import { threadService } from '../services';

interface ThreadContextType {
  threads: any;
  getThreads: () => void;
}

let ThreadContext = React.createContext<ThreadContextType>(null!);

function ThreadProvider({ children }: { children: React.ReactNode }) {
  let [threads, setThreads] = React.useState<any>([]);

  let getThreads = () => {
    return threadService.get('/threads').then((response: any) => {
      setThreads(response.data);
    }).catch(err => {
        console.error(err);
        setThreads([]);
    });
  };

  let value = { threads, getThreads };

  return <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>;
}

function useThread() {
  return React.useContext(ThreadContext);
}

export { ThreadProvider, useThread }
