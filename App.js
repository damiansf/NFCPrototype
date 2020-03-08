/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {Button, View} from 'react-native';
import NfcManager, {Ndef, NfcEvents} from 'react-native-nfc-manager';

const App: () => React$Node = () => {
  return (
    <View>
      <Button title="Queue message" onPress={() => send()}></Button>
      <Button title="Receive message" onPress={() => receive()}></Button>
    </View>
  );
};

function send() {
  console.warn('sending message');
  let bytes = Ndef.encodeMessage([Ndef.textRecord('hello')]);
  NfcManager.setNdefPushMessage(bytes);
}

receive = async () => {
  NfcManager.start();
  NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
    console.warn('tag', tag);
    console.warn(tag.ndefMessage[0]);
    NfcManager.unregisterTagEvent().catch(() => console.warn('unregister'));
  });
  console.warn('Receving...');
  await NfcManager.registerTagEvent();
};

export default App;
