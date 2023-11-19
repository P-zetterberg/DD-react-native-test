import { StyleSheet, Text, View, SafeAreaView, FlatList,ListRenderItem,TouchableOpacity    } from 'react-native';
import Fab from '../components/fab';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { ListProvider } from '../contexts/ListContext';
import { useList } from '../contexts/ListContext';
import ListItem from '../components/ListItem';
import { t } from '../services/t';

type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList,'Home'>;

type Props = {
  navigation: ProfileScreenNavigationProp;
}
interface Item {
  type: string;
  name: string;
  price: string;
}

export default function StartScreen({navigation}: Props) {
  const { list } = useList();
    const handleFabPress = (): void => {
      navigation.navigate('NewProduct')
  
    };
  
    const renderItem: ListRenderItem<Item> = ({ item, index },) => (
      <TouchableOpacity onPress={() => navigation.navigate('EditProduct', { item, index })}>
      <ListItem item={item}/>
      </TouchableOpacity>
    );
    
  return (
    <ListProvider>
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.topText}>{t('items')}</Text>
      </View>

      <View style={styles.listHeader}>
        <Text>{t('name')}</Text>
        <Text>{t('product_type')}</Text>
        <Text>{t('price')}</Text>
      </View>
     
   {list.length == 0 ?    
   <View style={styles.middleSection}>
        <View>
          <Text style={styles.middleText}>
            {t('no_products_yet')}
          </Text>
        </View>
      </View> :  
      <FlatList
        data={list}
        renderItem={renderItem}
        keyExtractor={(item,index) => index.toString()}
      /> }
      <Fab onPress={handleFabPress}/>
    </SafeAreaView>
    </ListProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topSection: {
    height: 85,
    backgroundColor: 'green',
    justifyContent: 'center',
    paddingLeft: 16,
  },
  topText: {
    color: 'white',
    fontSize: 18,
    marginTop: 20,
  },
  listHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderBottomWidth: 2,
    marginBottom: 8,
    borderColor: 'grey',
  },
  middleSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  middleText: {
    fontSize: 20,
    textAlign: 'center',
    color: 'grey' },
  listItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 2,
      marginHorizontal: 14,
      marginVertical: 8,
      backgroundColor:"lightgrey",
      borderRadius: 5,
      borderColor: 'grey',
    }
});

