# react-native-rn-drawer
A React Native component for free-hand drawing on both iOS and Android.
## Feature
+ Draw with your finger and export an image from it.
+ Change the stroke color and thickness of the pen easily.
+ Full-customize UI.
## Installation


```sh
npm install --save react-native-rn-drawer

yarn add react-native-rn-drawer
```

## Usage

```jsx
// ...import
import Drawer from 'react-native-rn-drawer';

export default function DrawerExample(){
    const [isAnimated, setIsAnimated] = React.useState(true);
    let drawerRef = React.useRef();
    //...
    const toggleDrawer = () => {
        if (drawerRef.current) {
          drawerRef.current.toggleDrawer();
        };
    }
    
    
    return (
        <Drawer
            // backgroundAnimation={["red", "blue"]}
            // backgroundColor= "red"
            // width={200}
            acceptPan={true}
            openDrawerOffset={12}
            useNativeDriver={false}
            isAnimated={isAnimated}
            ref={drawerRef}
          >
                // your component
        </Drawer>
    )
}


// ...

```
## :star2: Props
| **Property** | **Type** | **Require** | **Default** | **Description** |
|-------------|------|-------|--------|--------------|
| style | style |  |  | you can change the style of drawer with style property |
| isAnimated | boolean |  | true | If true active animation drawer |
| width | number |  | `window.width - 70` | Width content drawer |
| duration | number |  | 250 |  The duration of the open/close animation |
| backgroundAnimation | [string,string] |  | ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"] | Background ouside animation combined with isAnimation . attribute |
| acceptPan | boolean |  | true  | Allow for drawer pan (on touch drag). Set to false to effectively disable the drawer while still allowing programmatic control. if isAnimated attribute = false, acceptPan auto set = false |
| openDrawerOffset | `number`, `(viewport: {width: number, height: number})=> number`  |  | 20 |Can either be a integer (pixel value) or decimal (ratio of screen width).Defines the right hand margin when the drawer is open.  |
|useNativeDriver | boolean |  | false | Animated values are only compatible with one driver so if you use native driver when starting an animation on a value, make sure every animation on that value also uses the native driver.| 

## :memo: Creators 
* :four_leaf_clover:  [https://github.com/khanhbachnguyen](https://github.com/khanhbachnguyen)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---
