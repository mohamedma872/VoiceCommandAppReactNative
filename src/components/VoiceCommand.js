import React, { useState, useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import Voice from '@wdragon/react-native-voice';

const VoiceCommand = ({ commands, language, onLogUpdate }) => {
  const [recognized, setRecognized] = useState('');
  const [started, setStarted] = useState('');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = () => setStarted('started');
  const onSpeechRecognized = () => setRecognized('recognized');
  const onSpeechResults = (e) => {
    setResults(e.value);
    handleCommand(e.value);
  };
  const onSpeechError = (e) => setError(JSON.stringify(e.error));

  const handleCommand = (speechResults) => {
    const spokenCommand = speechResults[0].toLowerCase();

    const matchedCommand = commands.find((command) =>
      spokenCommand.includes(command.triggers.en.toLowerCase()) ||
      spokenCommand.includes(command.triggers.ar.toLowerCase())
    );

    if (matchedCommand) {
      onLogUpdate(`Command recognized: ${spokenCommand}`);
      executeActions(matchedCommand.actions);
    } else {
      Alert.alert('Unrecognized Command');
    }
  };

  const executeActions = (actions) => {
    actions.forEach((actionObj) => {
      switch (actionObj.type) {
        case 'NAVIGATION':
          onLogUpdate('Action: Navigation to Profile');
          actionObj.action();
          break;
        case 'STATE_UPDATE':
          onLogUpdate('Action: State update');
          actionObj.action();
          break;
        case 'API_CALL':
          onLogUpdate('Action: API call triggered');
          actionObj.action();
          break;
        case 'SHOW_ALERT':
          onLogUpdate('Action: Show alert');
          actionObj.action();
          break;
        default:
          onLogUpdate('Unknown action type');
      }
    });
  };

  const startListening = async () => {
    try {
      await Voice.start(language || 'en-US');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View>
      <Button title="Start Listening" onPress={startListening} />
      <Text>Recognized: {recognized}</Text>
      <Text>Started: {started}</Text>
      <Text>Error: {error}</Text>
      <Text>Results: {results.join(', ')}</Text>
    </View>
  );
};

export default VoiceCommand;
