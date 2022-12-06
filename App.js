import { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ActivityIndicator, TouchableOpacity, StyleSheet, Text, View, TextInput, Button, ScrollView, StatusBar, Image, Alert } from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import * as SQLite from 'expo-sqlite';
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useNetInfo } from "@react-native-community/netinfo";

let db = SQLite.openDatabase('Clinicians.db');



const inputStyle = {
  marginTop: 20,
  height: 40,
  borderWidth: 1,
  borderRadius: 15,
  padding: 10,
  borderColor: '#4fc1ff',
};

const textareaStyle = {
  marginTop: 20,
  height: 80,
  borderWidth: 1,
  borderRadius: 15,
  padding: 10,
  borderColor: '#4fc1ff',
};


const FormScreen = ({ navigation }) => {
  const clinicNameRef = useRef();
  const emailRef = useRef();
  const numberOfClinicRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipRef = useRef();
  const messageRef = useRef();


  return (
    <SafeAreaView style={{ padding: 10 }}>
      <Formik
        initialValues={{
          clinicName: '',
          email: '',
          numberOfClinic: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zip: '',
          message: ''
        }}

        onSubmit={values => {
          db.transaction(tx => {
            tx.executeSql('INSERT INTO Data_Table (clinicName, email, numberOfClinic, phone, address, city, state, zip, message, success) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [values.clinicName, values.email, values.numberOfClinic, values.phone, values.address, values.city, values.state, values.zip, values.message, 0],
              (txObj, resultSet) => {
                if (resultSet.rowsAffected > 0) {
                  console.log('data successfully added');
                  Alert.alert('Data added successfully');
                  navigation.navigate('HomeScreen')
                } else {
                  console.log('data could not added')
                  Alert.alert('data could not added, please try again');
                }
              },
              (txObj, error) => console.log(error)
            );
          });
        }}

        validationSchema={yup.object().shape({
          clinicName: yup
            .string()
            .required('Name is required'),
          email: yup
            .string()
            .email()
            .required(),
          phone: yup
            .string()
            .required('Phone Number is required'),
          address: yup
            .string()
            .required('Address is required'),
          city: yup
            .string()
            .required('City is required'),
          state: yup
            .string()
            .required('State is required'),
          zip: yup
            .string()
            .required('Zip is required')
        })}
      >
        {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
          <ScrollView style={styles.formContainer}>
            <Image style={styles.logo} source={require("./assets/logo.png")} />
            <View style={{ margin: 5 }}></View>
            <Text style={{ color: '#4fc1ff', fontSize: 20, textAlign: 'center', fontWeight: 'bold', marginBottom: 10 }}>CLINICIANS DEMO KIT ORDER FORM</Text>
            <TextInput
              value={values.clinicName}
              style={inputStyle}
              onChangeText={handleChange('clinicName')}
              onBlur={() => setFieldTouched('clinicName')}
              placeholder="Please Enter Your Clinic or Provider Name*"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.clinicName && errors.clinicName &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.clinicName}</Text>
            }
            <TextInput
              value={values.email}
              style={inputStyle}
              onChangeText={handleChange('email')}
              onBlur={() => setFieldTouched('email')}
              placeholder="Your email*"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                numberOfClinicRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.email && errors.email &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.email}</Text>
            }
            <TextInput
              value={values.numberOfClinic}
              style={inputStyle}
              onChangeText={handleChange('numberOfClinic')}
              placeholder="Number of Clinics/Offices"
              onBlur={() => setFieldTouched('numberOfClinic')}
              ref={numberOfClinicRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                phoneRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            <TextInput
              value={values.phone}
              style={inputStyle}
              onChangeText={handleChange('phone')}
              placeholder="Your Phone Number*"
              onBlur={() => setFieldTouched('phone')}
              ref={phoneRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                addressRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.phone && errors.phone &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.phone}</Text>
            }
            <TextInput
              value={values.address}
              style={inputStyle}
              onChangeText={handleChange('address')}
              placeholder="Your Address*"
              onBlur={() => setFieldTouched('address')}
              ref={addressRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                cityRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.address && errors.address &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.address}</Text>
            }
            <TextInput
              value={values.city}
              style={inputStyle}
              onChangeText={handleChange('city')}
              placeholder="City*"
              onBlur={() => setFieldTouched('city')}
              ref={cityRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                stateRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.city && errors.city &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.city}</Text>
            }
            <TextInput
              value={values.state}
              style={inputStyle}
              onChangeText={handleChange('state')}
              placeholder="State*"
              onBlur={() => setFieldTouched('state')}
              ref={stateRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                zipRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.state && errors.state &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.state}</Text>
            }
            <TextInput
              value={values.zip}
              style={inputStyle}
              onChangeText={handleChange('zip')}
              placeholder="Zip*"
              onBlur={() => setFieldTouched('zip')}
              ref={zipRef}
              returnKeyType="next"
              onSubmitEditing={() => {
                messageRef.current.focus();
              }}
              blurOnSubmit={false}
            />
            {touched.zip && errors.zip &&
              <Text style={{ fontSize: 12, color: '#FF0D10' }}>{errors.zip}</Text>
            }
            <TextInput
              value={values.message}
              multiline={true}
              numberOfLines={4}
              style={textareaStyle}
              onChangeText={handleChange('message')}
              placeholder="Any Special Notes or Comments"
              onBlur={() => setFieldTouched('message')}
              ref={messageRef}
            />
            <View style={{ marginTop: 20 }}>
              <Button
                marginTop="10"
                color="#4fc1ff"
                title='Submit'
                disabled={!isValid}
                onPress={handleSubmit}
              />
            </View>
          </ScrollView>
        )}
      </Formik>
    </SafeAreaView >
  );
};

const SingleScreen = ({ route, navigation }) => {
  const id = route.params.id;
  const clinicName = route.params.clinicName;
  const email = route.params.email;
  const numberOfClinic = route.params.numberOfClinic;
  const phone = route.params.phone;
  const address = route.params.address;
  const city = route.params.city;
  const state = route.params.state;
  const zip = route.params.zip;
  const message = route.params.message;
  const success = route.params.success;

  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();


  // useEffect(() => {
  //     db.transaction(tx => {
  //         tx.executeSql('SELECT * FROM Data_Table WHERE id = ?', [id],
  //             (txObj, resultSet) => setData(resultSet.rows._array),
  //             (txObj, error) => console.log(error)
  //         );
  //     });
  // }, []);


  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql('DELETE FROM Data_Table WHERE id = ?', [id],
        (txObj, resultSet) => {
          console.log('Item deleted successfully');
          navigation.navigate('HomeScreen');
        },
        (txObj, error) => console.log(error)
      );
    });
  };

  const deleteItemAlert = (id) =>
    Alert.alert(
      "Are you sure?",
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes, delete", onPress: () => deleteItem(id) }
      ]
    );

  const pushDataToApi = (clinicName, email, numberOfClinic, phone, address, city, state, zip, message) => {
    //console.log(clinicName);
    const wooOrderData = {
      payment_method: "bacs",
      payment_method_title: "Direct Bank Transfer",
      set_paid: true,
      billing: {
        first_name: clinicName,
        last_name: "",
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: zip,
        country: "US",
        email: email,
        phone: phone
      },
      shipping: {
        first_name: clinicName,
        last_name: "",
        address_1: address,
        address_2: "",
        city: city,
        state: state,
        postcode: zip,
        country: "US",
        email: email,
        phone: phone
      },
      line_items: [
        {
          product_id: 12245,
          quantity: 1
        }
      ]
    };


    const wooUrl = 'https://kidsole.com/wp-json/wc/v3/orders?consumer_key=ck_1b1fd58c9976f2291a7f99f84ce6860a6f43a223&consumer_secret=cs_226ef2e5a6481de8934ec480d66b49519f6fab43';

    axios.post(
      wooUrl,
      wooOrderData,
      {
        headers: {
          'Content-Type': 'application/json',
          //other header fields
        }
      }
    )
      .then(function (response) {
        //console.log(response.data);
        db.transaction(tx => {
          tx.executeSql('UPDATE Data_Table SET success = ? WHERE id = ?', [1, id],
            (txObj, resultSet) => {
              console.log('WooCommerce order has been created');
              setLoading(false);
              navigation.navigate('HomeScreen');
            },
            (txObj, error) => console.log(error)
          );
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

    // Post data to Pipedrive
    const pipeDriveApiToken = '0468e3570b95b0f2d2aa33fb2c2b50b327cc7a07';
    const pipeDriveUrl = `https://kidsole.pipedrive.com/v1/persons?api_token=${pipeDriveApiToken}`;

    const pipeDrivePersonData = {
      '6c82053acbe9d12fee1774d87572f3a12050913f': address,
      '140c4c45ee01839eb7b3b6ef65f01aeb8a56c5be': city,
      '7450899fec45672ad0cb35fa3faf84f3eb2af6f7': clinicName,
      'a3580af09844d8825092ef5981f1235aea60a82f': message,
      '393b6fcac82571baf7564372818f88de570d549f': numberOfClinic,
      'c223c7b1c489526083d1fa2f9d2dabaa28ee66ec': state,
      'a92a88fbbbcb99ce349b28b3dba2b1cb1b7fd60a': zip,
      email: email,
      phone: phone,
      name: clinicName
    };

    axios.post(
      pipeDriveUrl,
      pipeDrivePersonData,
    )
      .then(function (response) {
        //console.log(response.data);
        db.transaction(tx => {
          tx.executeSql('UPDATE Data_Table SET success = ? WHERE id = ?', [1, id],
            (txObj, resultSet) => {
              console.log('Data has been sent to the PipeDrive server');
            },
            (txObj, error) => console.log(error)
          );
        });
      })
      .catch(function (error) {
        console.log(error.response.data);
      });

  }


  const checkButtonStatus = () => {
    if (success === 1) {
      return (
        <Button
          disabled={true}
          style={{ padding: 20 }}
          title="This form data has been sent already"
          color='purple'
        />
      )
    } else {
      return (
        <View>
          <Button
            style={{ padding: 20 }}
            title="Send data to server"
            color='purple'
            onPress={() => {
              pushDataToApi(clinicName, email, numberOfClinic, phone, address, city, state, zip, message);
              setLoading(true);
            }}
          />
        </View>
      )
    }
  }

  return (
    <SafeAreaView style={styles.singleContainer}>
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={styles.dataText}>Clinic Name: {clinicName}</Text>
          <Text style={styles.dataText}>Email: {email}</Text>
          <Text style={styles.dataText}>Number of Clinic: {numberOfClinic}</Text>
          <Text style={styles.dataText}>Phone: {phone}</Text>
          <Text style={styles.dataText}>Address: {address}</Text>
          <Text style={styles.dataText}>City: {city}</Text>
          <Text style={styles.dataText}>State: {state}</Text>
          <Text style={styles.dataText}>Zip: {zip}</Text>
          <Text style={styles.dataText}>Message: {message}</Text>
          <View style={{ margin: 10 }}></View>
          <Button style={{ padding: 20 }} title="Delete" color='red' onPress={() => deleteItemAlert(id)} />
          <View style={{ margin: 10 }}></View>
          {netInfo.isConnected ? checkButtonStatus() : <Text style={{ fontSize: 20, fontWeight: 'bold' }}>No internet connection found</Text>}
          <View style={{ margin: 20 }}></View>
          <ActivityIndicator animating={loading} size="large" color="#00ff00" />
        </View>
      </ScrollView>
    </SafeAreaView >
  )
};

const HomeScreen = ({ navigation }) => {
  const [formData, setFormData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isFocused = useIsFocused();

  useEffect(() => {
    // Drop table if exist
    // db.transaction(tx => {
    //   tx.executeSql('DROP TABLE IF EXISTS Data_Table')
    // });

    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS Data_Table (id INTEGER PRIMARY KEY AUTOINCREMENT, clinicName TEXT, email TEXT, numberOfClinic TEXT, phone TEXT, address TEXT, city TEXT, state TEXT, zip TEXT, message TEXT, success INTEGER)')
    });

    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Data_Table', [],
        (txObj, resultSet) => setFormData(resultSet.rows._array),
        (txObj, error) => console.log(error)
      );
    });

    setIsLoading(false);

  }, [isFocused]);

  //console.log(formData);
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text>Loading...</Text>
      </View>
    );
  }


  const showFormData = () => {
    return formData.map((data, index) => {
      return (
        <View key={index} style={styles.items}>
          <TouchableOpacity
            style={{ borderRadius: 5, paddingVertical: 10, paddingHorizontal: 10, flexDirection: 'row', backgroundColor: data.success === 1 ? '#58bf6d' : '#52b7e8' }}
            activeOpacity={0.7}
            onPress={() => {
              navigation.navigate('SingleScreen', {
                id: data.id,
                clinicName: data.clinicName,
                email: data.email,
                numberOfClinic: data.numberOfClinic,
                phone: data.phone,
                address: data.address,
                city: data.city,
                state: data.state,
                zip: data.zip,
                message: data.message,
                success: data.success,
              });
            }}>
            <Text style={{ marginLeft: 10, color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
              {data.clinicName}
            </Text>
          </TouchableOpacity>
        </View>
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Image style={styles.logoHome} source={require("./assets/logo.png")} />
        <View style={{ margin: 15 }}></View>
        <Text style={{ fontSize: 24, textAlign: 'center', marginBottom: 15, fontWeight: 'bold' }}>Clinicians Request List</Text>
        {showFormData()}
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate('FormScreen')}
          style={styles.touchableOpacityStyle}>
          <Image source={require('./assets/plus_icon.png')} style={styles.floatingButtonStyle} />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView >
  );
};


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="FormScreen" component={FormScreen} options={{ title: 'Add New' }} />
        <Stack.Screen name="SingleScreen" component={SingleScreen} options={{ title: 'Form Details' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    padding: 10
  },
  loading: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    padding: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  dataText: {
    paddingTop: 10,
    fontSize: 18,
  },
  logoHome: {
    resizeMode: 'contain',
    marginLeft: 10
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center'
  },
  touchableOpacityStyle: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 10,
    top: 0,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    //backgroundColor:'black'
  },

});