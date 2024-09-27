### Voice Command App Overview

**VoiceCommandApp** is a new React Native project designed to introduce voice command functionality into mobile applications. Built using [**React Native**](https://reactnative.dev), this app allows users to interact with the app via voice commands in multiple languages, including English and Arabic. The project has been bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli), ensuring a clean and modern React Native setup.

### Key Features of the VoiceCommandApp

1. **Multi-Language Voice Commands**:
   - The app supports commands in different languages such as English, Arabic, French, and Spanish.
   - Users can select their preferred language from a dropdown menu (implemented using `@react-native-picker/picker`), and the app will recognize commands in that language.

2. **Navigation via Voice**:
   - Users can navigate through the app by issuing voice commands. For example, saying "Open profile" or its Arabic counterpart "افتح الملف الشخصي" will navigate the user to the Profile screen.
   
   Example:
   ```javascript
   {
     triggers: {
       en: 'open profile',
       ar: 'افتح الملف الشخصي'
     },
     actions: [
       {
         type: 'NAVIGATION',
         action: () => {
           navigation.navigate('Profile');
         }
       }
     ]
   }
   ```

3. **Start and Stop Timer via Voice**:
   - Voice commands like "Start timer" and "Stop timer" can control a timer within the app.
   - These actions update the app’s state and trigger an API call to update a remote timer system.
   
   Example command:
   ```javascript
   {
     triggers: {
       en: 'start timer',
       ar: 'ابدأ المؤقت'
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
             updateLog(`API Call Success: Timer started, response: ${JSON.stringify(data)}`);
           })
           .catch(error => {
             updateLog(`API Call Failed: ${error}`);
           });
         }
       }
     ]
   }
   ```

4. **Real-Time Logging of Voice Commands**:
   - Every voice command is logged in real-time, allowing users to see the results of their commands.
   - Logs are displayed in a scrollable view and updated dynamically as the user interacts with the app.

   Example of logs in the UI:
   ```javascript
   <ScrollView style={styles.logContainer}>
     {logs.map((log, index) => (
       <Text key={index} style={styles.logText}>{log}</Text>
     ))}
   </ScrollView>
   ```

### Screenshots (Placeholders for now):
You can include screenshots from your app here, demonstrating the language picker, voice commands in action, and the real-time log viewer.
<img width="342" alt="Screenshot 2024-09-27 at 9 52 08 PM" src="https://github.com/user-attachments/assets/eba9bb3c-fc12-4332-bf81-9eef010c7e82">

<img width="259" alt="Screenshot 2024-09-27 at 9 52 30 PM" src="https://github.com/user-attachments/assets/16cf944a-144f-4e5e-a3f7-863e858a5f49">

---

### How to Run the VoiceCommandApp

#### Step 1: Start the Metro Server
To run the app, first, start the Metro JavaScript bundler by running:
```bash
npm start
```

#### Step 2: Run the App on Android or iOS

- For Android:
  ```bash
  npm run android
  ```

- For iOS:
  ```bash
  npm run ios
  ```

#### Step 3: Modify the App
To customize the app further, open `App.tsx` and start editing. Reload the app using:
- **Android**: Press `R` twice or select "Reload" from the Developer Menu.
- **iOS**: Press `Cmd + R` in the iOS simulator.

### Conclusion

VoiceCommandApp demonstrates the power of integrating voice commands into mobile applications. With multi-language support, navigation, API integration, and real-time logging, it provides a rich user interaction experience. Explore and modify the app to extend its capabilities even further.

