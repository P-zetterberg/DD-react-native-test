import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Item {
  type: string;
  name: string;
  price: string;
}

interface ListContextType {
  list: Item[]; 
  addItemToList: (item: Item) => void; 
}
interface ListProviderProps {
  children: ReactNode;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [list, setList] = useState<Item[]>([]);

  const addItemToList = (item: Item) => {
    setList((prevList) => [...prevList, item]);
  };

  return (
    <ListContext.Provider value={{ list, addItemToList }}>
      {children}
    </ListContext.Provider>
  );
};

const useList = (): ListContextType => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export { ListProvider, useList };