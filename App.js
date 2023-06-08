import { Camera, CameraType, requestCameraPermissionsAsync } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function App() {
  //initialize camera type to use rear camera on user phone
  const [type, setType] = useState(CameraType.back);
  //permission state
  const [permission, setPermission] = useState(null);

  const checkPermission = async () => {
    //object containing permissions -> status:'granted' and granted: true
    const { status, granted } = await requestCameraPermissionsAsync();
    console.log(status);
    console.log(granted);
    setPermission(granted);
  };

  useEffect(() => {
    checkPermission();
  }, []);

  if (permission === null) {
    // Camera permissions are not set
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>LOADING!</Text>
      </View>
    );
  } else if (permission === false)  {
     // Camera permissions are not granted
     return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={checkPermission} title="Grant Permission" />
      </View>
    );
  }

  //toggles camera
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 100,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
