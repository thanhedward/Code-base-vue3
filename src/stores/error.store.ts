import { defineStore } from 'pinia';

export const useErrorStore = defineStore('error', () => {
  const errorMessages = new Set<string>([]);

  const closeMessage = (message: string) => {
    if (errorMessages.has(message)) {
      errorMessages.delete(message)
    }
  }

  const isMessageShowed = (message : string) : boolean=> {
    return errorMessages.has(message);
  }

  const addMessageToShowList = (message : string) => {
    errorMessages.add(message);
  }

  return {
    errorMessages,
    closeMessage,
    isMessageShowed,
    addMessageToShowList
  };
});
