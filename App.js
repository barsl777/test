import 'react-native-gesture-handler';
import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { Button } from 'react-native-elements';
import store from './reducer';
import { initialState, addViewColums, deleteViewColums } from './reducer';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from 'react-native-table-component';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const col = (item) => {
  const arr = [item.toUpperCase()];
  initialState.data.map((obj) => arr.push(obj[item]));
  return arr;
};

function Up(item) {
  return item.charAt(0).toUpperCase() + item.slice(1);
}

function Low(item) {
  return item.charAt(0).toLowerCase() + item.slice(1);
}

function EditScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [state, setState] = useState(store.getState());
  useEffect(store.subscribe(() => setState(store.getState())));
  return (
    <View style={styles.edit}>
      <Text style={styles.title}>Edit Columns</Text>
      <View style={styles.line} />
      <View style={{ flexDirection: 'row', paddingBottom: 20 }}>
        <View style={styles.app}>
          <TextInput
            style={{
              backgroundColor: 'white',
              width: 130,
              height: 25,
              borderRadius: 5,
            }}
            placeholder="Search..."
            onChange={(e) => setTitle(e.target.value)}
          />
          <Text>
            {title && state.allColumns.includes(Low(title))
              ? title
              : null}
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 20,
              borderRadius: 5,
            }}>
            {state.allColumns.map((item) => {
              return (
                <View style={styles.rowCol}>
                  <Text style={styles.textEditColumns}>{Up(item)}</Text>
                  <Button
                    containerStyle={{ backgroundColor: 'white' }}
                    titleStyle={{ color: 'black' }}
                    type="clear"
                    onPress={() => store.dispatch(addViewColums(item))}
                    title="+"
                  />
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.vLine} />
        <View style={styles.app}>
          <View
            style={{
              backgroundColor: 'white',
              marginTop: 90,
              borderRadius: 5,
            }}>
            {state.viewColumns.map((item) => {
              return (
                  <View style={styles.rowCol}>
                    <Text style={styles.textEditColumns}>{Up(item)}</Text>
                    <Button
                      containerStyle={{ backgroundColor: 'white' }}
                      titleStyle={{ color: 'black' }}
                      type="clear"
                      onPress={() => store.dispatch(deleteViewColums(item))}
                      title="x"
                    />
                  </View>
              );
            })}
          </View>
        </View>
      </View>
      <View style={styles.line} />
      <View style={{ paddingTop: 20, alignSelf: 'flex-end', paddingRight: 10 }}>
        <Button
          titleStyle={{ color: 'black' }}
          containerStyle={{ width: 100, borderRadius: 5 }}
          onPress={() => navigation.navigate('Main')}
          title="Apply"
        />
      </View>
    </View>
  );
}

function MainScreen({ navigation }) {
  const [state, setState] = useState(store.getState());
  useEffect(() => store.subscribe(() => setState(store.getState())));
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Users data:</Text>
        <Button
          titleStyle={{ color: 'black' }}
          onPress={() => navigation.navigate('Edit')}
          title="Change Columns"
        />
      </View>
      <Table borderStyle={{ borderWidth: 1, borderColor: 'black' }}>
        <TableWrapper style={styles.row}>
          {state.viewColumns.map((item) => (
            <Col data={col(item)} textStyle={styles.text} />
          ))}
        </TableWrapper>
      </Table>
    </View>
  );
}

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Edit" component={EditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    fontSize: 20,
    justifyContent: 'center',
  },
  rowCol: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: 'grey',
    borderBottomWidth: 2,
    margin: 5,
    width: 120,
  },
  header: {
    flexDirection: 'row',
    fontSize: 20,
    justifyContent: 'space-evenly',
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    fontSize: 20,
    paddingLeft: 10,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
  textEditColumns: {
    textAlign: 'center',
    paddingTop: 12,
  },
  line: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  vLine: {
    borderColor: 'black',
    borderWidth: 1,
    flexDirection: 'column',
    marginTop: 20,
  },
});

export default Nav;