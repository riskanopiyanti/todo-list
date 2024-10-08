import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';

const TodoList = () => {
  const [title, setTitle] = useState<string>('');
  const [todo, setTodo] = useState<any[]>([
    {
      id: 1,
      title: 'Learn React Native',
      completed: false,
    },
  ]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleAddTodo = () => {
    if (!title) {
      Alert.alert('Error', 'Please enter your todo');
      return;
    }

    if (editingId) {
      // Edit existing todo
      const updatedTodos = todo.map((item) =>
        item.id === editingId ? { ...item, title } : item
      );
      setTodo(updatedTodos);
      setEditingId(null);
    } else {
      // Add new todo
      const newTodo = {
        id: todo.length + 1,
        title: title,
        completed: false,
      };
      setTodo([...todo, newTodo]);
    }
    setTitle('');
  };

  const handleEditTodo = (id: number) => {
    const todoToEdit = todo.find((item) => item.id === id);
    if (todoToEdit) {
      setTitle(todoToEdit.title);
      setEditingId(id);
    }
  };

  const handleDeleteTodo = (id: number) => {
    Alert.alert('Confirm Delete', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'OK', onPress: () => setTodo(todo.filter((item) => item.id !== id)) },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter your todo"
          style={styles.input}
          value={title}
          onChangeText={setTitle}
        />
        <Pressable style={styles.button} onPress={handleAddTodo}>
          <Text style={styles.buttonText}>{editingId ? 'Update Todo' : 'Add Todo'}</Text>
        </Pressable>
      </View>
      {todo.map((item) => (
        <View key={item.id} style={styles.todoItemContainer}>
          <Text style={styles.todoItem}>{item.title}</Text>
          <View style={styles.todoButtons}>
            <Pressable onPress={() => handleEditTodo(item.id)} style={styles.editButton}>
              <Text style={styles.buttonText}>Edit</Text>
            </Pressable>
            <Pressable onPress={() => handleDeleteTodo(item.id)} style={styles.deleteButton}>
              <Text style={styles.buttonText}>Delete</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
  },
  input: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    height: 40,
  },
  buttonText: {
    color: 'white',
  },
  todoItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  todoItem: {
    fontSize: 18,
    color: 'black',
    flexGrow: 1,
    marginRight: 10,
  },
  todoButtons: {
    flexDirection: 'row',
    gap: 5,
  },
  editButton: {
    backgroundColor: 'orange',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TodoList;
