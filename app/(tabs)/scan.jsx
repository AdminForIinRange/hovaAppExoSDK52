import { CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, View,   Modal, } from "react-native";
import "./handScan.css";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [modalScanedVisible, setModalScanedVisible] = useState(false);

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
    <>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"], // Specify that we want to scan QR codes
          }}
          onBarcodeScanned={handleBarcodeScanned} // Handle the scan result
        />
        <View className="absolute top-[20%] rounded-[60px] flex-row  bg-white opacity-40 h-[60%]  w-[80%] justify-center items-center z-10" />

        <View className="absolute top-0 left-0 right-0 bg-black opacity-40 h-full justify-center items-center z-10" />
        {scannedData && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>
              Scanned QR Code Data: {scannedData}
            </Text>
          </View>
        )}

        {scannedData === 1 && (
          <>
            <View className="flex-row bg-white w-full h-full justify-center items-center z-10">
              <View className="flex-row justify-center items-start w-full px-4 my-4">
                <View className="w-full h-[200px] rounded-xl p-4">
                  <Text className="text-[38px] font-semibold text-black text-center">
                    Great, please scan your hand on the device
                    {/* User's session data will be sent to the Appwrite terminal (e.g., "Terminal 1" or whatever the terminal code scanned was). The terminal will constantly check for session data, and if it receives it, it will send it back to Appwrite, locate the user, and add it like ...users, palm: id or something */}
                  </Text>
                  <Text className="text-[108px] font-semibold text-black text-center">
                    🫳
                  </Text>
                </View>
              </View>
            </View>

            <View className="w-full h-[200px] rounded-xl p-4">
              <Pressable onPress={() => setScannedData(null)}>
                <Text className="text-[38px] font-semibold text-black text-center">
                  Back
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </>
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
