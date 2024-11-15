import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

export default function App() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);

  if (!permission) {
    return <View />; // Camera permissions loading
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  // Callback when QR code is scanned
  function handleBarcodeScanned({ type, data }) {
    setScannedData(data); // Save the scanned QR code data
    console.log(`QR code scanned! Type: ${type}, Data: ${data}`);
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"], // Specify that we want to scan QR codes
        }}
        onBarcodeScanned={handleBarcodeScanned} // Handle the scan result
      />
      <View className="absolute top-[20%] rounded-[60px] flex-row  bg-white opacity-40 h-[60%]  w-[80%] justify-center items-center z-10"></View>
      <View className="absolute top-0 left-0 right-0 bg-black opacity-40 h-full justify-center items-center z-10">
      
      </View>
      {scannedData && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Scanned QR Code Data: {scannedData}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  resultContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 10,
    borderRadius: 10,
  },
  resultText: {
    color: "white",
    fontSize: 18,
  },
});
