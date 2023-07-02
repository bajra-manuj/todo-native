import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {deleteNote, toggleDoneStatus} from '../slices/noteSlice';

export type NoteType = {
  id: string;
  title: string;
  done: boolean;
};

export type NoteProps = {
  note: NoteType;
  handlePressEdit: (note: NoteType) => void;
};

export default function Note({note, handlePressEdit}: NoteProps): JSX.Element {
  const backgroundColor = note.done ? 'mediumspringgreen' : 'white';
  const textDecorationLine = note.done ? 'line-through' : 'none';
  const dispatch = useDispatch();

  const handlePressDelete = (id: string) => {
    dispatch(deleteNote(id));
  };

  const handleLongPress = (id: string) => {
    dispatch(toggleDoneStatus(id));
  };
  return (
    <View>
      <Pressable
        style={{
          ...styles.note,
          backgroundColor,
        }}
        onLongPress={() => handleLongPress(note.id)}>
        <Text style={{...styles.noteTitle, textDecorationLine, color: 'black'}}>
          {note.title}
        </Text>
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => handlePressEdit(note)}>
            <Text>
              <FontAwesomeIcon icon={faPen} />
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePressDelete(note.id)}>
            <Text>
              <FontAwesomeIcon icon={faTrash} />
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    padding: 10,
    margin: 10,
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  noteTitle: {
    textDecorationStyle: 'solid',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
  },
});
