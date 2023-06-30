import {faPen, faTrash} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export type NoteType = {
  id: string;
  title: string;
  done: boolean;
};

export type NoteProps = {
  note: NoteType;
  handlePressDelete: (id: string) => void;
  handlePressEdit: (note: NoteType) => void;
  handleLongPress: (id: string) => void;
};

export default function Note({
  note,
  handlePressDelete,
  handlePressEdit,
  handleLongPress,
}: NoteProps): JSX.Element {
  const backgroundColor = note.done ? 'green' : '#aaffff';
  return (
    <View>
      <Pressable
        style={{...styles.note, backgroundColor}}
        onLongPress={() => handleLongPress(note.id)}>
        <Text>{note.title}</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
