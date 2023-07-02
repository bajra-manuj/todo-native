import {
  faCircleXmark,
  faSquareCheck,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {deleteNote, toggleDoneStatus} from '../slices/noteSlice';

export type NoteType = {
  id: string;
  title: string;
  done: boolean;
};

export type NoteProps = {
  note: NoteType;
};

export default function Note({note}: NoteProps): JSX.Element {
  const textDecorationLine = note.done ? 'line-through' : 'none';
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
        }}
        onPress={() => navigation.navigate('Note', {note})}
        onLongPress={() => handleLongPress(note.id)}>
        <Text style={{...styles.noteTitle, textDecorationLine, color: 'black'}}>
          {note.title}
        </Text>
        <View style={styles.buttons}>
          <Pressable
            style={styles.button}
            onPress={() => handleLongPress(note.id)}>
            <Text>
              {note.done ? (
                <FontAwesomeIcon
                  icon={faSquareCheck}
                  style={styles.iconLight}
                />
              ) : (
                <FontAwesomeIcon icon={faCircleXmark} style={styles.iconDark} />
              )}
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => handlePressDelete(note.id)}>
            <Text>
              <FontAwesomeIcon icon={faTrash} style={styles.iconDark} />
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
    textDecorationColor: 'dodgerblue',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    paddingHorizontal: 10,
  },
  noteTextContainer: {
    flex: 1,
  },
  iconLight: {
    backgroundColor: 'white',
    color: 'dodgerblue',
  },
  iconDark: {
    backgroundColor: 'white',
    color: 'darkslategrey',
  },
});
