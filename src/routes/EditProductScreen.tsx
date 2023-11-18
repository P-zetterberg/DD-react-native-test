
import { StyleSheet, Text, View , TouchableOpacity, TextInput} from 'react-native';
import {useState} from 'react';
import { RootStackParamList } from '../../App';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useList } from '../contexts/ListContext';
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import {Picker} from '@react-native-picker/picker';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
RootStackParamList, "NewProduct"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
}

interface validationObj {
  [key: string]: boolean;
}
export default function NewProductScreen({navigation}: Props) {
  const [item, setItem] = useState({type: "", name: "", price: ""});
  const { addItemToList } = useList();
  const [selectedType, setType] = useState("");
  const [pickerFocused, setPickerFocused] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const handleAddItem = () => {
    addItemToList(item);  
    navigation.navigate('Home')
  };

  const updateValue = (key:string, value:string) => {
    let min = 0;
    let max = Number.MAX_SAFE_INTEGER;
    if(value == 'integrated' || item.type == 'integrated') {
      min = 1000;
      max = 2600;
    }
    if(key === 'type') {
      setType(value)
    };
    
    if(key === 'price') validationObj[key] = Number(value) > min && Number(value) < max;
    if(key !== 'price') validationObj[key] = value.length > 0;
    setDisabled(true)

    if(Object.values(validationObj).every(Boolean)) {
      setDisabled(false)
    } else setDisabled(true)
    setItem(prevState => ({
      ...prevState,
      [key]: value,
    }));
  };
  let validationObj:validationObj = {
    name: item.name.length > 0,
    price: item.price.length > 0, 
    type: selectedType.length > 0
  }

  return (
    <SafeAreaView style={styles.container}>
     <View style={{padding: 12}}>
     <Text style={styles.title}>
        Edit product
      </Text>
      <TextInput
         style={styles.input}
          value={item.name}
          onChangeText={val => updateValue('name', val)}
          placeholder='Name'
        />
              <TextInput
         style={styles.input}
          value={item.price}
          keyboardType='numeric'
          onChangeText={val => updateValue('price', val)}
          placeholder='Price'
        />
        <View style={[styles.input ,styles.picker]}>
        <Picker
          onFocus={() => setPickerFocused(true)}
          onBlur={() => setPickerFocused(false)}
          selectedValue={selectedType}
          onValueChange={val => updateValue('type', val)}>
          <Picker.Item  value='' label='Product Type' enabled={!pickerFocused} />
          <Picker.Item label="Peripheral" value="peripheral" />
          <Picker.Item label="Integrated" value="integrated" />
        </Picker>
        </View>
        <View style={styles.btn__container}>
          <TouchableOpacity onPress={handleAddItem} style={[styles.btn__primary, disabled ? styles.disabled : null]} disabled={disabled} >
            <Text style={[styles.btn__text, styles.text__save]}>SAVE</Text>
            <Icon name="download" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>  navigation.navigate('Home')} style={styles.btn__secondary} >
            <Text style={styles.btn__text}>
              CANCEL
            </Text>
            <Icon name="cancel" size={24} color="white" />
          </TouchableOpacity>
        </View>
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

