import React, {useState} from "react";
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from "react-native";
import Icons from 'react-native-vector-icons/FontAwesome6'


export default function App() {
  const [gasCost, setGasCost] = React.useState("");
  const [gasMileage, setGasMileage] = React.useState("NaN");
  const [electricityCost, setElectricityCost] = React.useState("");
  const [electricMileage, setElectricMileage] = React.useState("");
  const [kmDriven, setKmDriven] = React.useState("15000");
  const [results, setResults] = React.useState("NaN");

  const calculate = () => {
    const gasCarCost = (kmDriven / gasMileage) * gasCost;
    const electricCarCost = (kmDriven / electricMileage) * electricityCost;
    const savings = gasCarCost - electricCarCost;

    const roundedSaving = Math.round(savings)

    setResults(roundedSaving.toString());
  };

  const handleOptionPress = (value) => {
    setKmDriven(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EV Savings Calculator</Text>
      

      {/* Gas Vechile Form */}
      <Text style={styles.subTitle}>Gas Vehicle Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Price per litre ($/L)"
          keyboardType="numeric"
          onChangeText={(text) => setGasCost(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Gas Mileage (km/L)"
          keyboardType="numeric"
          onChangeText={(text) => setGasMileage(text)}
          style={[styles.input]}
        />
      </View>
      

      {/* Electric Form */}
      <Text style={styles.subTitle}>Electric Vehicle Information</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Utilities cost ($/kwH)"
          keyboardType="numeric"
          onChangeText={(text) => setElectricityCost(text)}
          style={styles.input}
        />
        <TextInput
          placeholder="EV milage (km/kwH)"
          keyboardType="numeric"
          onChangeText={(text) => setElectricMileage(text)}
          style={[styles.input]}
        />
      </View>


      {/* Kilometers Information */}
      <Text style={styles.subTitle}>How many km do you drive each year?</Text>

      <View style={styles.optionsContainer}>
        <OptionButton
          label="15,000 km"
          value="15000"
          isSelected={kmDriven === '15000'}
          onPress={handleOptionPress}
        />
        <OptionButton
          label="25,000 km"
          value="25000"
          isSelected={kmDriven === '25000'}
          onPress={handleOptionPress}
        />
        <OptionButton
          label="40,000 km"
          value="40000"
          isSelected={kmDriven === '40000'}
          onPress={handleOptionPress}
        />
      </View>

      {/* Calculation Button */}
      <TouchableOpacity style={styles.button} onPress={calculate}>
        <Text style={styles.buttonText}>Estimate Savings</Text>
      </TouchableOpacity>

      <Text style={styles.resultInfo}>For the price of 1 litre of gas, you can travel:</Text>

      {/* Three container */}
      <View style={styles.bigContainer}>
        <View style={styles.smallContainer1}>
          <Icons name="gas-pump" size={22}/>
          <Text style={styles.middleContent}>{gasMileage}</Text>
          <Text style={styles.bottomContent}>km</Text>
        </View>
        <View style={styles.smallContainer2}>
          <Icons name="plug" size={22}/>
          <Text style={styles.middleContent}>
            {(electricMileage * (gasCost / electricityCost)).toFixed(2)}
          </Text>
          <Text style={styles.bottomContent}>km</Text>
        </View>
        <View style={styles.smallContainer3}>
          <Icons name="circle-arrow-right" size={22}/>
          <Text style={styles.middleContent}>
            {((electricMileage * (gasCost / electricityCost)).toFixed(2)-gasMileage).toFixed(2)}
          </Text>
          <Text style={styles.bottomContent}>km more</Text>
        </View>
      </View>

      <Text style={styles.resultInfo}>By switching to electric, you obtain:</Text>

      {/* Final Result Container */}
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>$ {results}</Text>
        <Text style={styles.resultTextButtom}>in savings per year</Text>
      </View>


    </View>
  );
}

const OptionButton = ({ label, value, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.optionButton, isSelected && styles.selectedOptionButton]}
      onPress={() => onPress(value)}
    >
      <Text style={styles.optionButtonText}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    marginTop: 60,
    padding: 20,

  },
  title: {
    fontSize: 33,
    color: 'indigo',
    fontWeight: 'bold',
    marginBottom: 10
  },
  subTitle: {
    fontSize: 15,
    alignSelf: "flex-start",
    marginTop: 5,
    marginBottom: 5
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#dadada',
    marginRight: 10,
    height: 45
  },
  button:{
    padding: 15,
    color: "black",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10
  },
  buttonText:{
    fontSize: 15,
    fontWeight: "bold"
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 20,
    marginRight: 10,
    backgroundColor: '#dadada'
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    
  },
  selectedOptionButton: {
    backgroundColor: 'white',
    margin: 2
  },
  optionButtonText: {
    fontSize: 14,
    color: '#000',
  },
  resultInfo: {
    fontSize: 17,
    marginTop: 30,
    marginBottom: 10,
    alignItems: 'center'
  },
  resultContainer: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'black',
    
  },
  resultText: {
    fontSize:35,
    color: 'white',
  },
  resultTextButtom: {
    fontSize: 18,
    color: 'white'
  },

  bigContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  smallContainer1: {
    flex:1,
    height: 100,
    backgroundColor: "pink",
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  smallContainer2: {
    flex:1,
    backgroundColor: "skyblue",
    marginRight: 10,
    borderRadius: 10,
    padding:10,
    alignItems: 'center'
  },
  smallContainer3: {
    flex:1,
    backgroundColor: 'orange',
    marginRight: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center'
  },
  middleContent:{
    fontSize: 30,
    marginTop: 5
  }
});
