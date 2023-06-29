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
  Text,
  TextInput,
  View,
  Button,
  ScrollView,
} from 'react-native';

type Note = {
  id: string;
  title: string;
  done: boolean;
};

// type NoteProps = {
//   note: Note;
//   handlePress: Function;
// };

function Note({note, handlePress}): JSX.Element {
  const backgroundColor = note.done ? 'green' : 'red';
  return (
    <View style={{...styles.note, backgroundColor}} onTouchEnd={handlePress}>
      <Text>{note.title}</Text>
    </View>
  );
}

type Mode = 'edit' | 'add';

function App(): JSX.Element {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note>({
    id: '',
    title: '',
    done: false,
  });
  const [currentMode, setCurrentMode] = useState<Mode>('add');
  const inputRef = useRef<TextInput>(null);

  const handlePress = () => {
    if (currentMode === 'add') {
      const newNote = {...currentNote, id: uuidv4()};
      setNotes(oldNotes => [...oldNotes, newNote]);
    } else {
      setNotes(oldNotes =>
        oldNotes.map(oldNote => {
          if (oldNote.id === currentNote.id) {
            return {
              id: currentNote.id,
              title: currentNote.title,
              done: false,
            };
          }
          return oldNote;
        }),
      );
    }
    setCurrentNote({title: '', done: false, id: ''});
    setCurrentMode('add');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.notesContainer}>
        {!!notes.length &&
          notes.map(note => (
            <Note
              key={note.id}
              note={note}
              handlePress={() => {
                setCurrentMode('edit');
                setCurrentNote({
                  id: note.id,
                  title: note.title,
                  done: note.done,
                });
                inputRef.current?.focus();
              }}
            />
          ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={currentNote.title}
          placeholder="Enter note"
          onChangeText={text => setCurrentNote({...currentNote, title: text})}
          onSubmitEditing={handlePress}
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

export default App;
