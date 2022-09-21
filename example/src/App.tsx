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
      <View style={{}}>
        <Text>Hahahhha</Text>
        <TouchableOpacity>
          <Text>Open drawer</Text>
        </TouchableOpacity>
        <Drawer acceptPan={true}>
          <View>
            <Text>xini chào</Text>
          </View>
        </Drawer>
      </View>
    </>

  )
}
