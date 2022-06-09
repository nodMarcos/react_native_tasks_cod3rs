import {Alert, Platform} from 'react-native';

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.15.15:3000';

function showError(err) {
  if (err.response && err.response.data) {
    Alert.alert('Ops! Ocorreu um erro inesperado', 'Mensagem: ' + err.response.data);
  }
  else {
    Alert.alert('Ops! Ocorreu um erro inesperado', 'Mensagem: ' + err );
  }
}

function showSuccess(message) {
  Alert.alert('Sucesso!', message);
}

export {server, showError, showSuccess}