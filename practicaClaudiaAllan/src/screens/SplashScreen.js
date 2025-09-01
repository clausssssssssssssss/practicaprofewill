import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Mantener la pantalla de splash visible mientras se carga la app
SplashScreen.preventAutoHideAsync();

const SplashScreenComponent = ({ onFinish }) => {
  useEffect(() => {
    const prepare = async () => {
      try {
        // Simular tiempo de carga
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Ocultar la pantalla de splash
        await SplashScreen.hideAsync();
        onFinish();
      }
    };

    prepare();
  }, [onFinish]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi App</Text>
      <Text style={styles.subtitle}>Practica Evaluada</Text>
      <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: 'white',
    marginBottom: 40,
    opacity: 0.8,
  },
  loader: {
    marginTop: 20,
  },
});

export default SplashScreenComponent;
