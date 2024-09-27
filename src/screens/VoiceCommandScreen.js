import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';  // For navigation actions
import VoiceCommand from '../components/VoiceCommand';  // Import your VoiceCommand component
import { Picker } from '@react-native-picker/picker';

const VoiceCommandScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [logs, setLogs] = useState([]);  // Store logs in state
  const navigation = useNavigation();

  const [timerRunning, setTimerRunning] = useState(false);

  const commands = [
    {
      triggers: {
        en: 'open profile',
        ar: 'افتح الملف الشخصي'  // Arabic for "open profile"
      },
      actions: [
        {
          type: 'NAVIGATION',
          action: () => {
            navigation.navigate('Profile');
          }
        }
      ]
    },
    {
      triggers: {
        en: 'start timer',
        ar: 'ابدأ المؤقت'  // Arabic for "start timer"
      },
      actions: [
        {
          type: 'STATE_UPDATE',
          action: () => {
            setTimerRunning(true);
          }
        },
        {
          type: 'API_CALL',
          action: () => {
            fetch('https://example.com/api/timer/start', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ timerId: 123 })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Timer started:', data);
              updateLog(`API Call Success: Timer started, response: ${JSON.stringify(data)}`);
            })
            .catch(error => {
              console.error('Error starting timer:', error);
              updateLog(`API Call Failed: ${error}`);
            });
          }
        }
      ]
    },
    {
      triggers: {
        en: 'stop timer',
        ar: 'أوقف المؤقت'  // Arabic for "stop timer"
      },
      actions: [
        {
          type: 'STATE_UPDATE',
          action: () => {
            setTimerRunning(false);
          }
        },
        {
          type: 'API_CALL',
          action: () => {
            fetch('https://example.com/api/timer/stop', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ timerId: 123 })
            })
            .then(response => response.json())
            .then(data => {
              console.log('Timer stopped:', data);
              updateLog(`API Call Success: Timer stopped, response: ${JSON.stringify(data)}`);
            })
            .catch(error => {
              console.error('Error stopping timer:', error);
              updateLog(`API Call Failed: ${error}`);
            });
          }
        }
      ]
    }
  ];

  const updateLog = (logMessage) => {
    setLogs((prevLogs) => [...prevLogs, logMessage]);
  };

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedLanguage}
        onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
      >
        <Picker.Item label="English" value="en-US" />
        <Picker.Item label="French" value="fr-FR" />
        <Picker.Item label="Arabic" value="ar-SA" />
        <Picker.Item label="Spanish" value="es-ES" />
      </Picker>

      <VoiceCommand commands={commands} language={selectedLanguage} onLogUpdate={updateLog} />

      <ScrollView style={styles.logContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logContainer: {
    marginTop: 20,
    padding: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
  },
  logText: {
    fontSize: 14,
    color: '#333',
  },
});

export default VoiceCommandScreen;
