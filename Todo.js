import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';

export default function APP() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState('');

  const renkUret = () => {
    
    let renk = Math.floor(Math.random() * (16777216 + 1))
      .toString(16)
      .toUpperCase();
    
    while (renk.length < 6) renk = '0' + renk;
 
    renk = '#' + renk;
 
    return renk;
  };

  function addTodo() {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now().toString(), text: input.trim() }]);

      setInput('');

      styles.todo.backgroundColor = renkUret();
    }
  }

  
function deleteTodo(id) {

    Alert.alert('Delete Todo', 
                'Bu işi silmek istediğinize emin misin?', 
                [
                  {text: 'İptal'}, 
                  {text:'OK', onPress: () => setTodos(todos.filter((todo) => todo.id !== id)) }
                  
                  ])


  }

  function Sil(){

    Alert.alert('Reset List', 
                'Listeyi tamamen temizlemek istediğinize emin misiniz?', 
                [
                  {text: 'Hayır'}, 
                  {text:'OK', onPress: () => setTodos([]) }
                  
                  ])




  }



  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Yapılacak işleri ekle"
        value={input}
        onChangeText={setInput}
      />
<View style={styles.liste}>
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.eklebutton}>Listeye Ekle</Text>
      </TouchableOpacity>

 <TouchableOpacity onPress={Sil}>
        <Text style={styles.eklebutton}>Listeyi Temizle</Text>
      </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.todo}>
            <Text style={styles.todoText}>{item.text}</Text>
            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteButton}> X </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgrounColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    paddingTop: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  eklebutton: {
    fontSize: 18,
    color: 'pink',
    borderRadius: 3,
    marginBottom: 20,
  },

  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: 'gray',
    paddingBottom: 10,
    marginBottom: 10,
    backgrounColor: 'white',
    paddingLeft: 10,
    borderRadius:3,
  },

  todoText: {
    fontSize: 18,
  },

  deleteButton: {
    fontSize: 18,
  },
  liste:{
     flexDirection: 'row',
      justifyContent: 'space-between',
  }
});
