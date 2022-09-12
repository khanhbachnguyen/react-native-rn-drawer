import React, { useRef } from 'react';
import { StyleSheet, Text, View, Switch, Platform, TouchableOpacity, TextInput, Button } from 'react-native';
import Drawer from 'react-native-rn-drawer';


export default function App() {
  let drawerRef = useRef<Drawer>(null);
  const [drawerState, setDrawer] = React.useState({
    isAnimated: true,
    duration: 250,
    onpenDrawerOffset: 12
  })

  const toggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleDrawer();
    };
  }

  const toggleIsAnimation = (): void => {
    setDrawer(prev => ({ ...prev, isAnimated: !prev.isAnimated }))
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", height: 49, alignItems: "center", backgroundColor: "#ddd" }}>
        <Text style={{ textAlign: "center", flex: 1 }}>Header</Text>
      </View>

      <View style={{ flex: 1, padding: 32 }}>
        <Text style={{ fontWeight: "700", fontSize: 20, marginBottom: 32 }}>react-native-rn-drawer</Text>
        <View>
          <TouchableOpacity onPress={toggleDrawer}>
            <Text>Click Me to Open Drawer</Text>
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Acitons title="Animation" isTrue={drawerState.isAnimated} onPress={toggleIsAnimation} />
          <AcitonsInput title='Duration' value={drawerState.duration + ""} />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Button title='+' onPress={() => setDrawer(prev => ({ ...prev, duration: prev.duration + 50 }))} />
            <Button title='-' onPress={() => setDrawer(prev => ({ ...prev, duration: prev.duration - 50 }))} />
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <AcitonsInput onChangeText={text => setDrawer(prev =>({...prev, onpenDrawerOffset: +text}))} title='openDrawerOffset' value={drawerState.onpenDrawerOffset + ""} />
        </View>

      </View>

      <Drawer
        // backgroundAnimation={["red", "blue"]}
        // backgroundColor= "red"
        // width={200}
        acceptPan={true}
        openDrawerOffset={12}
        useNativeDriver={false}
        duration={drawerState.duration}
        isAnimated={drawerState.isAnimated}
        ref={drawerRef}
      >
        <View style={{ height: 1000, padding: 20 }}>
          <View style={{ height: 150, justifyContent: "center" }}>
            <Text style={{ fontWeight: "700", fontSize: 20 }}>react-native-rn-drawer</Text>
            <Text style={{}}>version: 0.1.0</Text>
          </View>

          <View>
            <Text>close</Text>
            <MySwitch onPress={() => {
              drawerRef.current?.toggleDrawer()
            }} />
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 10 }}>Tokyo</Text>
            <Text style={{ textAlign: "justify" }}>Tokyo is the capital of Japan, the center of the Greater Tokyo Area, and the most populous metropolitan area in the world.</Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 10 }}>London</Text>
            <Text style={{ textAlign: "justify" }}>London is the capital city of England. It is the most populous city in the United Kingdom.</Text>
          </View>

          <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: "500", fontSize: 16, marginBottom: 10 }}>Paris</Text>
            <Text style={{ textAlign: "justify" }}>Paris is the capital of France. The Paris area is one of the largest population centers in Europe.</Text>
          </View>

        </View>
      </Drawer>
    </View>
  )
}

type ActionsProps = {
  title: string,
  isTrue: boolean,
  onPress?: () => any
}

function Acitons({ title = "", isTrue = false, onPress = () => null }: ActionsProps) {
  return (
    <View style={{ borderWidth: 1, borderColor: "#ddd", padding: 3, marginVertical: 15 }}>
      <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} activeOpacity={1} onPress={onPress}>
        <Text>{title}: </Text>
        <Box isTrue={isTrue} />
      </TouchableOpacity>
    </View>
  )
}


type ActionsInputProps = {
  title: string,
  value: string,
  onChangeText?: (text: string) => void
}

function AcitonsInput({ value = "", title = "", onChangeText = () => null }: ActionsInputProps) {
  return (
    <View style={{ borderWidth: 1, borderColor: "#ddd", padding: 10, paddingHorizontal: 12, margin: 15, justifyContent: "center" }}>
      <TouchableOpacity style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }} activeOpacity={1}>
        <Text>{title}: </Text>
        <TextInput value={value} onChangeText={onChangeText} />
      </TouchableOpacity>
    </View>
  )
}

function Box({ isTrue = false }) {
  return (
    <View style={{ backgroundColor: isTrue ? "green" : "tomato", padding: 5, borderRadius: 4, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ color: "#fff", fontWeight: "500" }}>{isTrue ? "True" : "False"}</Text>
    </View>
  )
}



type SwitchProps = {
  active?: boolean,
  onPress: () => void
}
function MySwitch({ active = false, onPress = () => null }: SwitchProps) {
  const [isEnabled, setIsEnabled] = React.useState(active);
  const toggleSwitch = () => {
    setIsEnabled(previousState => !previousState);
    onPress();
  }

  let scale = Platform.OS === "ios" ? .7 : 1

  return (
    <View style={{}}>
      <Switch
        style={{ transform: [{ scaleX: scale }, { scaleY: scale }] }}
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
})