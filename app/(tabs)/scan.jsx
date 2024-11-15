import { CameraView, useCameraPermissions } from "expo-camera";
import { useEffect, useState } from "react";
import { Button, Pressable, StyleSheet, Text, View, Modal } from "react-native";
import "./handScan.css";
import { CustomButton, Loader } from "../../components";

export default function Scan() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scannedData, setScannedData] = useState(null);
  const [modalScanedVisible, setModalScanedVisible] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (isSending) {
      setTimeout(() => setIsSending(false), 5000);
    }
  }, [modalScanedVisible]);

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

    if (scannedData === "TestingForTerminal1") {
      setModalScanedVisible(true);
      setIsSending(true);
    }
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



        <Modal
          animationType="slide"
          transparent={true}
          visible={modalScanedVisible}
          onRequestClose={() => setModalScanedVisible(false)}
        >

          <View className="flex-1">
            <View className="mt-auto h-[90%] rounded-t-[40px] bg-white">
              <View className="flex-col mt-[45px] items-center justify-center p-[10px] ">
                <Text className="text-[36px]   font-psemibold text-[#414141] text-center">
                 {isSending ? "Sending" : "Scan your hand on the device"}
                </Text>
                <Text className="mt-2 text-[20px] font-pregular text-[#6F6F6F] text-center"></Text>
             

                <CustomButton
                  title="Back"
                  handlePress={() => {
                    setScannedData(null);
                    setModalScanedVisible(false);
                  }}
                  containerStyles="w-full mt-4"
                  textColor={"white"}
                  buttonBackgroundColor={"#0162F1"}
                />
              </View>
            </View>
          </View>
        </Modal>
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
