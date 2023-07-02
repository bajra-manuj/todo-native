import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {HeaderBackButton} from '@react-navigation/elements';
import {useDispatch} from 'react-redux';
import {updateNote} from '../slices/noteSlice';

function Note({navigation, route}) {
  const {note} = route.params;
  const [newTitle, setNewTitle] = useState(note.title);
  const dispatch = useDispatch();
  const checkAndUpdateNote = useCallback(() => {
    if (newTitle.length !== 0) {
      dispatch(updateNote({...note, title: newTitle, done: false}));
    }
  }, [dispatch, newTitle, note]);
  useEffect(() => {
    navigation.setOptions({
      // eslint-disable-next-line react/no-unstable-nested-components
      headerLeft: () => (
        <HeaderBackButton
          onPress={() => {
            checkAndUpdateNote();
            navigation.navigate('Home');
          }}
        />
      ),
    });
  }, [navigation, newTitle, checkAndUpdateNote]);
  return (
    <View style={styles.note}>
      <TextInput
        style={styles.input}
        value={newTitle}
        placeholder="Enter note"
        onChangeText={text => setNewTitle(text)}
        autoFocus={true}
        onBlur={() => {
          checkAndUpdateNote();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    flex: 1,
    padding: 10,
  },
  input: {
    backgroundColor: 'white',
    color: 'black',
  },
});
export default Note;
