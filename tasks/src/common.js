import {Alert, Platform} from 'react-native';

const server = Platform.OS === 'ios' ? 'http://localhost:3000' : 'http://192.168.15.13:3000';

function showError(err) {
  Alert.alert('Ops! Ocorreu um erro inesperado', 'Mensagem: ' + err.message);
}

function showSuccess(message) {
  Alert.alert('Sucesso!', message);
}

export {server, showError, showSuccess}