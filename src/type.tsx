import type { Animated, RegisteredStyle, ViewStyle } from "react-native"

export type DrawerProps = {
    /**
     * Style container drawer
     */
    style?: false | Animated.Value | Animated.AnimatedInterpolation | RegisteredStyle<ViewStyle> | Animated.WithAnimatedObject<ViewStyle> | null | undefined,
    /**
     * If true active animation drawer
     * `default: true`
     */
    isAnimated?: boolean,

    /**
     * Width content drawer
     * `default: window - 70`
     */
    width?: number,

    /**
     * The duration of the open/close animation.
     * `default: 250`
     */
    duration?: number,

    /**
     * Background ouside animation combined with isAnimation . attribute
     */
    backgroundAnimation?: [string, string]

    /**
     * Background ouside without isAnimation . attribute
     */
    backgroundColor?: string

    /**
     * Allow for drawer pan (on touch drag). Set to false to effectively disable the drawer while still allowing programmatic control.
     * if isAnimated attribute = false, acceptPan auto set = false
     * `default: true`
     */
     acceptPan?: boolean

    /**
     * Can either be a integer (pixel value) or decimal (ratio of screen width). 
     * Defines the right hand margin when the drawer is open.
     * `default: 100`
     */
    openDrawerOffset?: number | ((viewport: { width: number, height: number }) => number)

    /**
     * Animated values are only compatible with one driver so if you use native driver when starting an animation on a value, 
     * make sure every animation on that value also uses the native driver.
     */
    useNativeDriver?: boolean,

}

export type DrawerState = {
    isOpen: boolean,
    isPressed: boolean,
    translateX: Animated.Value,
    bgOutside: Animated.Value,
    openDrawerOffset: number
}