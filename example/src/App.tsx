import React from 'react';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-rn-drawer';

export default function App() {
  const [isAnimated, setIsAnimated] = React.useState(true);
  let drawerRef = React.useRef<Drawer>(null);

  const toggleDrawer = () => {
    if (drawerRef.current) {
      drawerRef.current.toggleDrawer();
    };
  }

  return (
    <>
      <TouchableOpacity onPress={toggleDrawer} style={{ paddingTop: 120 }}>
        <Text>Click Me!!!</Text>
      </TouchableOpacity>
      <Drawer
        acceptPan={true}
        openDrawerOffset={20}
        isAnimated={isAnimated}
        ref={drawerRef}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity onPress={toggleDrawer} style={{ marginTop: 120 }}>
            <Text>Click Me!!!</Text>
          </TouchableOpacity>
          <Text>xin chào</Text>
        </View>
      </Drawer>
    </>

  )
}
