
import { StyleSheet, Text, View , TouchableOpacity, TextInput} from 'react-native';
import {useState, useEffect } from 'react';
import { RootStackParamList } from '../../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useList } from '../contexts/ListContext';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';
import { t } from '../services/t';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList, "NewProduct"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
  route: {params: {item: {type: string, name: string, price: string}, index: number}}
}

interface validationObj {
  [key: string]: boolean;
}
// Pretty much a copy of NewProductScreen.tsx
export default function NewProductScreen({navigation, route}: Props) {
    const {item:routeItem} = route.params
    const {index} = route.params
  //Context and item
  const { updateItemInList, list, deleteItemFromList } = useList();
  const [item, setItem] = useState({type: routeItem.type, name: routeItem.name, price: routeItem.price});
  //Picker
  const [selectedType, setType] = useState(routeItem.type);
  const [pickerFocused, setPickerFocused] = useState(false)

  //Validation
  const [disabled, setDisabled] = useState(true)
  const [priceError, setPriceError] = useState(false)

  let validationObj:validationObj = {
    name: item.name.length > 0,
    price: item.price.length > 0, 
    type: selectedType.length > 0
  }

  useEffect(() => {
    setPriceError(false)
    priceValue(item.price)
    if(selectedType == 'integrated') {
      if(!validationObj.price) {
        setPriceError(true)
      } else setPriceError(false) 
    }
    setItem(prevState => ({
      ...prevState,
      ['type']: selectedType,
    }))
    checkValidation()
  }, [selectedType, item.price]);
  
  const handleAddItem = () => {
    const isNameUnique = list.every((obj, i) => i === index || obj.name !== item.name);

    if(isNameUnique) {
        updateItemInList(item, index);
        navigation.navigate('Home')
    } else alert('Name must be unique')
  };

  const handleDeleteItem = () => {
    deleteItemFromList(index)
    navigation.navigate('Home')
  }
  const nameValue = (value:string) => {
    validationObj.name = value.length > 0;
    setItem(prevState => ({
      ...prevState,
      ['name']: value,
    }))
  }
  const priceValue = (value:string) => {
    let min = 0
    let max = Number.MAX_SAFE_INTEGER
   if(selectedType == 'integrated') {
    min = 1000
    max = 2600
   }
  
    validationObj.price = Number(value) > min && Number(value) < max;
    setItem(prevState => ({
      ...prevState,
      ['price']: value,
    }))
  }

  const checkValidation = () => {
    if(Object.values(validationObj).every(Boolean)) {
      setDisabled(false)
    } else setDisabled(true)
  };

  return (
    <SafeAreaView style={styles.container}>
     <View style={{padding: 12}}>
     <Text style={styles.title}>
     {t('edit_product')}
      </Text>
      <TextInput
         style={styles.input}
          value={item.name}
          onChangeText={val => nameValue(val)}
          placeholder={t('name')}
        />
              <TextInput
         style={styles.input}
          value={item.price}
          keyboardType='numeric'
          onChangeText={val => priceValue(val)}
          placeholder={t('price')}
        />
       {priceError &&  <Text style={{color: 'red'}}>
          {t("price_error")}
        </Text>}
        <View style={[styles.input ,styles.picker]}>
        <Picker
          onFocus={() => setPickerFocused(true)}
          onBlur={() => setPickerFocused(false)}
          selectedValue={selectedType}
          onValueChange={val => setType(val)}>
          <Picker.Item  value='' label={t('product_type')} enabled={!pickerFocused} />
          <Picker.Item label={t('peripheral')} value="peripheral" />
          <Picker.Item label={t('integrated')} value="integrated" />
        </Picker>
        </View>
        <View style={styles.btn__container}>
          <TouchableOpacity onPress={handleAddItem} style={[styles.btn__primary, disabled ? styles.disabled : null]} disabled={disabled} >
            <Text style={[styles.btn__text, styles.text__save]}>{t('save')}</Text>
            <Icon name="download" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>  navigation.navigate('Home')} style={styles.btn__secondary} >
            <Text style={styles.btn__text}>
            {t('cancel')}
            </Text>
            <Icon name="cancel" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={handleDeleteItem} style={styles.btn__delete}>
            <Text style={[styles.btn__text, styles.text__save]}>{t('delete_item')}</Text>
            <Icon name="delete" size={24} color="white" />
          </TouchableOpacity>
     </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign:  'center'
  },
  input: {
    height: 60,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginVertical: 12,
    backgroundColor:"#ecf0ee"
  },
  picker: {
  padding: 0,
  },
  btn__container: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 12,
  },
  btn__primary: {
    flex: 1,
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn__secondary: {
    flex: 1,
    backgroundColor: 'lightgrey',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center', 
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  btn__delete: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btn__text: {
    fontSize: 20,
  },
  text__save: {
    color: 'white',
  },
  disabled: {
    opacity: 0.5,
  }
});

