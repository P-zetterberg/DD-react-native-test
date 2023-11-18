
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';


type Props = {
    item: {
        type: string;
        name: string;
        price: string;
    }
}

const ListItem = ({item}:Props) => {
  return (
    <View style={styles.listItem}>
        <Text>{item.name}</Text>
        <Text>{item.type}</Text>
        <Text>$ {item.price}.00</Text>
        
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ListItem;