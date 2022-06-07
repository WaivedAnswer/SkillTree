import React, { useCallback, useEffect } from 'react';
import { View, FlatList, StyleSheet, Pressable, Text } from 'react-native';
import LessonItem from './LessonItem';
import { useState } from 'react';
import { createTable, getDBConnection, getLessons, saveLessons } from '../services/dbService';

const styles = StyleSheet.create({ 
    separator: {
    height: 10, 
},
container: {
  flexGrow: 1,
  flex: 1,
  display: 'flex',
},
list: {
  flexGrow: 1,
  flex: 1,
},
button: {
  flexGrow: 0,
  flex: 0,
  alignItems: 'center',
  margin: 5,
},
text: {
  fontSize: 16,
}
});

const renderItem = ({ item }) => {
    return (
      <LessonItem
        key= {item.id}
        item={item}
      />
    );
  };


const ItemSeparator = () => <View style={styles.separator} />;

const List = () => { 
  const [lessons, setLessons] = useState([]);
  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [];
      const db = await getDBConnection();
      console.log("connected");
      await createTable(db);
      const storedTodoItems = await getLessons(db);
      console.log(storedTodoItems)
      if (storedTodoItems.length) {
        setLessons(storedTodoItems);
      } else {
        await saveLessons(db, initTodos);
        setLessons(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

const addLesson = async () => { 
  const newLessonTitle = 'Item ' + (lessons.length + 1);
  const newLessons = lessons.concat({id: lessons.length + 1, value: newLessonTitle});
  await saveLessons(db, newLessons);
  setLessons(newLessons);
};
    return (
      <View style={styles.container}>
<View style={styles.list}>
<FlatList 
data={lessons} 
ItemSeparatorComponent={ItemSeparator} 
renderItem={renderItem}
/>
</View>
<View style={styles.button}>
<Pressable style={styles.button} onPress ={addLesson}>
  <Text style = {styles.text}>Add</Text>
</Pressable>
</View>
</View>
); };

export default List;