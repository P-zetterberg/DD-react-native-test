import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  deleteItemFromList: (index:number) => void;
}
interface ListProviderProps {
  children: ReactNode;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

const ListProvider: React.FC<ListProviderProps> = ({ children }) => {
  const [list, setList] = useState<Item[]>([]);

  const addItemToList = (item: Item) => {
    setList((prevList) => {
      storeData([...prevList, item])
     return [...prevList, item]
    });
    
  };

  const deleteItemFromList = (index:number) => {
    setList((prevList) => {
      const newList = [...prevList];
      newList.splice(index, 1);
      storeData(newList)
      return newList;
    });
  };
  const updateItemInList = (updatedItem:Item, index:number) => {
    setList((prevList) => {
      const newList = [...prevList];
      if (newList[index]) {
        newList[index] = updatedItem;
      }
      storeData(newList)
      return newList;
    });
  };
  const storeData = async (value:Item[]) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('array', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };
  const getData = async () => {
    try {
      const jsonValue  = await AsyncStorage.getItem('array');
      setList(jsonValue != null ? JSON.parse(jsonValue) : [])
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData()
  } , [])
  
  return (
    <ListContext.Provider value={{ list, addItemToList, updateItemInList, deleteItemFromList }}>
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