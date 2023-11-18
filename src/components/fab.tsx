
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
interface Props {
  onPress(): void
}
const Fab = ({onPress}:Props) => {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.fab} onPress={onPress}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'green', 
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8, 
  },
  fabText: {
    fontSize: 24,
    color: 'white',
  },
});

export default Fab;