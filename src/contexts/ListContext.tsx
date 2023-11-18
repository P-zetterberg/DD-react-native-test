import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Item {
  [key: string]: string | number;
  type: string;
  name: string;
  price: string;
}
interface ListContextType {
  list: Item[]; 
  addItemToList: (item: Item) => void; 
  updateItemInList: (item:Item, index:number) => void;
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
  const updateItemInList = (updatedItem:Item, index:number) => {
    setList((prevList) => {
      const newList = [...prevList];
      if (newList[index]) {
        newList[index] = updatedItem;
      }
      return newList;
    });
  };
  return (
    <ListContext.Provider value={{ list, addItemToList, updateItemInList }}>
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