/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import React, {useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Button,
  ScrollView,
} from 'react-native';
import Note from '../Components/Note';
import {NoteType} from '../Components/Note';
import {useDispatch, useSelector} from 'react-redux';
import {addNewNote, updateNote} from '../slices/noteSlice';

type Mode = 'edit' | 'add';

function createNote(text: string): NoteType {
  return {
    id: uuidv4(),
    title: text,
    done: false,
  };
}

function Home(): JSX.Element {
  const notes: NoteType[] = useSelector<any, any>(state => state?.note?.notes);
  const [currentNote, setCurrentNote] = useState('');
  const [currentMode, setCurrentMode] = useState<Mode>('add');
  const [currentlyEditingNote, setCurrentlyEditingNote] =
    useState<NoteType | null>(null);
  const inputRef = useRef<TextInput>(null);

  const dispatch = useDispatch();
  const handlePress = () => {
    if (currentNote.length === 0) {
      return;
    }
    if (currentMode === 'add') {
      const newNote = createNote(currentNote);
      dispatch(addNewNote(newNote));
      setCurrentNote('');
      return;
    }
    if (!currentlyEditingNote) {
      return;
    }
    dispatch(
      updateNote({...currentlyEditingNote, title: currentNote, done: false}),
    );
    setCurrentNote('');
    setCurrentlyEditingNote(null);
    setCurrentMode('add');
  };

  const handlePressEdit = (note: NoteType) => {
    setCurrentMode('edit');
    setCurrentlyEditingNote(note);
    setCurrentNote(note.title);
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.notesContainer}>
        {!!notes.length &&
          notes.map(note => (
            <Note key={note.id} note={note} handlePressEdit={handlePressEdit} />
          ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={currentNote}
          placeholder="Enter note"
          onChangeText={text => setCurrentNote(text)}
          onBlur={() => {
            setCurrentMode('add');
            setCurrentlyEditingNote(null);
            setCurrentNote('');
          }}
          blurOnSubmit={false}
          onSubmitEditing={() => handlePress()}
          ref={inputRef}
        />
        <Button
          title={currentMode === 'add' ? 'Add Note' : 'Edit Note'}
          onPress={handlePress}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    justifyContent: 'flex-end',
    bottom: 10,
    padding: 10,
  },
  notesContainer: {
    padding: 10,
  },
  note: {
    padding: 10,
    margin: 10,
  },
});

export default Home;
