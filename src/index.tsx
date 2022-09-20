import React from 'react';
import { Animated, Dimensions, GestureResponderEvent, PanResponder, PanResponderGestureState, TouchableOpacity } from 'react-native';
import { drawerStyle as styles } from './style';
import type { DrawerProps, DrawerState } from './type';

const { width } = Dimensions.get("window");

const VIEWPORT = Dimensions.get("window");
const DURATION: number = 250; // default duration animated
const WIDTH_DEFAULT_DRAWER: number = width - 70; // default content width drawer
const DEFAULT_DRAWER_OFFSET: number = 20; // Defines the right hand margin when the drawer is open
const ANIMATED_BACKGROUND_OUSIDE: [string, string] = ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.2)"]; // background animation


class Drawer extends React.Component<DrawerProps, DrawerState> {

  static defaultProps: DrawerProps = {
    style: {},
    width: WIDTH_DEFAULT_DRAWER,
    isAnimated: true,
    duration: DURATION,
    useNativeDriver: false,
    openDrawerOffset: DEFAULT_DRAWER_OFFSET,
    backgroundAnimation: ANIMATED_BACKGROUND_OUSIDE,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    acceptPan: true
  };

  private _openDrawerOffset: number = 0;
  private _panResponder = React.createRef<any>().current;
  private _pan: Animated.ValueXY | any = new Animated.ValueXY();

  constructor(props: DrawerProps) {
    super(props);
    this.state = {
      isOpen: false,
      isPressed: false,
      translateX: new Animated.Value(this.props.width!),
      bgOutside: new Animated.Value(0),
      openDrawerOffset: 0
    };

    if (this.props.acceptPan) {
      if (this.props.openDrawerOffset) {
        if (typeof this.props.openDrawerOffset === "function") {
          this._openDrawerOffset = this.props.openDrawerOffset({ "width": VIEWPORT.width, "height": VIEWPORT.height })
        } else {
          this._openDrawerOffset = this.props.openDrawerOffset;
        }
      };
    };

    this._pan.setValue({ x: (this.props.width!), y: 0 });

  };

  componentDidMount(): void {
    if (this.state.isOpen) {
      this._animationOpen();
    } else {
      this._animationClose();
    }
  };

  private _handleMoveShouldSetPanResponder = (): boolean => {
    if (!this.props.isAnimated || !this.props.acceptPan) return false;
    return true;
  };

  private _handlePanResponderGrant = (): void => {
    let x = this._pan.x._value as any;
    this.setState({ isPressed: true });
    this._pan.setOffset({ "x": this._pan.x._value, "y": 0 });
  };

  private _handlePanResponderRelease = (_: GestureResponderEvent, gesture: PanResponderGestureState): void => {
    this._pan.flattenOffset();

    if (this.state.isOpen) {
      this._shouldDrag(gesture) < 200 ? this._animationOpen() : this._animationClose();
    } else {
      this._shouldDrag(gesture) < -100 ? this._animationOpen() : this._animationClose();
    }
  };

  private _setIsOpen = (value: boolean, callback?: () => any): void => {
    this.setState({ isOpen: value }, callback);
  };

  private _shouldDrag = (gesture: PanResponderGestureState): number => {
    return gesture.dx;
  };

  private _animationOpen = (): void => {
    this.setState({ isOpen: true }, () => {
      Animated.parallel([
        Animated.timing(this._pan.x, {
          toValue: 0,
          duration: this.props.duration,
          useNativeDriver: !!this.props.useNativeDriver
        }),
        Animated.timing(this.state.bgOutside, {
          toValue: 1,
          duration: this.props.duration,
          useNativeDriver: !!this.props.useNativeDriver
        }),
      ]).start();
    });
  };

  private _animationClose = (): void => {
    Animated.parallel([
      Animated.timing(this._pan.x, {
        toValue: this.props.width!,
        duration: this.props.duration,
        useNativeDriver: !!this.props.useNativeDriver
      }),
      Animated.timing(this.state.bgOutside, {
        toValue: 0,
        duration: this.props.duration,
        useNativeDriver: !!this.props.useNativeDriver
      }),
    ]).start(() => {
      this._setIsOpen(false);
    });
  };

  public toggleDrawer = (): void => {
    this.state.isOpen ? this.onClose() : this.onOpen();
  };

  public onClose = (): void => {
    this.props.isAnimated ? this._animationClose() : this._setIsOpen(false);
  };

  public onOpen = (): void => {
    this.props.isAnimated ? this._animationOpen() : this._setIsOpen(true);
  };

  render(): React.ReactNode | JSX.Element | null {

    let drawer: any = { ...styles.drawer };

    let contentDrawer: any = {
      ...styles.contentDrawer,
      ...this.props.style as object,
      "width": this.props.width,
      "transform": [{ translateX: this._pan.x }]
    };

    this._panResponder = PanResponder.create({
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: Animated.event([null, { "dx": this._pan.x }], { "useNativeDriver": !!this.props.useNativeDriver }),
      onPanResponderRelease: this._handlePanResponderRelease
    });

    if (this.state.isOpen) {
      drawer["backgroundColor"] = this.props.backgroundColor;
      contentDrawer["transform"] = [{ translateX: 0 }];

      if (this.props.isAnimated) {
        drawer["backgroundColor"] = this.state.bgOutside.interpolate({
          "inputRange": [0, 1],
          "outputRange": this.props.backgroundAnimation!,
        });
        contentDrawer["transform"] = [{ translateX: this._pan.x }];
      }
    };

    return (
      <>
        {
          this.state.isOpen && (
            <Animated.View style={drawer}>
              <TouchableOpacity onPress={this.onClose} style={styles.overlay} />
            </Animated.View>
          )
        }

        <Animated.View style={{ ...contentDrawer, "width": (this.props.width!) + this._openDrawerOffset }}{...this._panResponder.panHandlers}>
          <Animated.View style={{
            height: "100%",
            width: this.props.width,
            backgroundColor: "#FFFF",
          }}>
            {this.props.children}
          </Animated.View>
        </Animated.View>
      </>
    );
  };
}

export default Drawer;

