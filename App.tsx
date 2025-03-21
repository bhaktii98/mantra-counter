import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Vibration, Alert, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sound from 'react-native-sound';
import * as Progress from 'react-native-progress';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Feather';

// Initialize the sound file
const sound = new Sound('notification.mp3', Sound.MAIN_BUNDLE, (error) => {
  if (error) {
    console.log('Failed to load the sound', error);
    return;
  }
});

const { width } = Dimensions.get('window');

const App: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [target, setTarget] = useState<number>(108);
  const [targetInput, setTargetInput] = useState<string>('');
  const [isTargetReached, setIsTargetReached] = useState<boolean>(false);

  // Load data from AsyncStorage on app start
  useEffect(() => {
    const loadData = async () => {
      try {
        const savedCount = await AsyncStorage.getItem('count');
        const savedTarget = await AsyncStorage.getItem('target');
        if (savedCount !== null) setCount(Number(savedCount));
        if (savedTarget !== null) setTarget(Number(savedTarget));
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };
    loadData();
  }, []);

  // Save data to AsyncStorage
  const saveData = async (key: string, value: number) => {
    try {
      await AsyncStorage.setItem(key, String(value));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const incrementCount = () => {
    setCount((prevCount: number) => {
      const newCount = prevCount + 1;
      saveData('count', newCount);
      if (newCount >= Number(target)) {
        Vibration.vibrate();
        sound.play((success) => {
          if (!success) {
            console.log('Sound playback failed');
          }
        });
        setIsTargetReached(true);
      }
      return newCount;
    });
  };

  const resetCount = () => {
    setCount(0);
    saveData('count', 0);
  };

  const handleSetTarget = () => {
    const numTarget = Number(targetInput);
    if (!isNaN(numTarget) && numTarget > 0) {
      setTarget(numTarget);
      saveData('target', numTarget);
      setTargetInput('');
    } else {
      Alert.alert('Invalid Input', 'Please enter a valid number greater than 0.');
    }
  };

  const closeModal = () => {
    setIsTargetReached(false);
    setCount(0); // Reset counter when modal is closed
    saveData('count', 0);
  };

  const progress = target > 0 ? Math.min(count / target, 1) : 0;

  return (
    <LinearGradient colors={['#F8F1E9', '#EDE4E0']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, width: '100%' }}
      >
        <Animatable.Text animation="fadeInDown" style={styles.title}>
          Mantra Counter
        </Animatable.Text>

        <View style={styles.actionContainer}>
          <Animatable.View animation="fadeInUp" style={styles.targetInputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Set Target"
              placeholderTextColor="#718096"
              keyboardType="numeric"
              value={targetInput}
              onChangeText={setTargetInput}
            />
            <TouchableOpacity style={styles.setTargetButton} onPress={handleSetTarget}>
              <LinearGradient colors={['#D4A5A5', '#C68B8B']} style={styles.setTargetButtonGradient}>
                <Text style={styles.buttonText}>Set</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        <Animatable.View animation="zoomIn" style={styles.countContainer}>
          <TouchableOpacity
            style={styles.counterTouchable}
            onPress={incrementCount}
            activeOpacity={0.8}
          >
            <Animatable.View animation="pulse" iterationCount="infinite">
              <Progress.Circle
                size={300} // Increased size for prominence
                progress={progress}
                thickness={12}
                color="#D4A5A5"
                unfilledColor="#E5E7EB"
                borderWidth={0}
                showsText={false}
              >
                <View style={styles.chantButtonOverlay}>
                  <LinearGradient
                    colors={['#D4A5A5', '#C68B8B']}
                    style={styles.chantButton}
                  >
                    <Text style={styles.chantButtonText}>{count}</Text>
                  </LinearGradient>
                </View>
              </Progress.Circle>
            </Animatable.View>
          </TouchableOpacity>
          <View style={styles.tapHintContainer}>
            <Text style={styles.tapHintText}>Tap to Chant</Text>
          </View>
          <Text style={styles.targetText}>Target: {target}</Text>
        </Animatable.View>

        <View style={styles.actionContainer}>
          <Animatable.View animation="fadeInUp" delay={200}>
            <TouchableOpacity style={styles.resetButton} onPress={resetCount}>
              <LinearGradient colors={['#E57373', '#D32F2F']} style={styles.resetButtonGradient}>
                <Text style={styles.buttonText}>Reset</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        </View>

        {/* Modal for Target Reached */}
        <Modal
          isVisible={isTargetReached}
          backdropOpacity={0.4}
          onBackdropPress={closeModal}
          style={styles.modal}
        >
          <View style={styles.modalContainer}>
            <Animatable.Text animation="pulse" iterationCount="infinite" style={styles.modalTitle}>
              Target Reached!
            </Animatable.Text>
            <Text style={styles.modalSubtitle}>You've completed {target} mantras!</Text>
            <Text style={styles.religiousQuote}>
              "Whatever you do, offer it to Me, and you will find peace." – Bhagavad Gita 9:27
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <LinearGradient colors={['#D4A5A5', '#C68B8B']} style={styles.closeButtonGradient}>
                <Text style={styles.closeButtonText}>Close</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#EDE4E0',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionContainer: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 10,
  },
  targetInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 20,
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: '#E5E7EB',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#2D3748',
    backgroundColor: '#F9FAFB',
  },
  setTargetButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  setTargetButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  countContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: '#FFFFFF',
    borderRadius: 150, // Adjusted for larger size
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  counterTouchable: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chantButtonOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chantButton: {
    width: 180, // Increased size for better visibility
    height: 180,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  chantButtonText: {
    color: '#FFFFFF',
    fontSize: 48, // Larger text for readability
    fontWeight: '700',
    textAlign: 'center',
  },
  tapHintContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  tapHintIcon: {
    marginRight: 5,
  },
  tapHintText: {
    fontSize: 16,
    color: '#718096',
    fontWeight: '500',
  },
  targetText: {
    fontSize: 18,
    color: '#718096',
    marginTop: 15,
    fontWeight: '500',
  },
  resetButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: width * 0.5,
    marginBottom: 20,
  },
  resetButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#D4A5A5',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#718096',
    marginBottom: 15,
    textAlign: 'center',
  },
  religiousQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#718096',
    marginBottom: 25,
    textAlign: 'center',
  },
  closeButton: {
    borderRadius: 12,
    overflow: 'hidden',
    width: '60%',
  },
  closeButtonGradient: {
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default App;