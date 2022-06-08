import { Component } from 'react';
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity, Alert } from 'react-native'
import axios from 'axios'
import { CommonActions } from '@react-navigation/native';
import backgroundImage from '../../assets/imgs/login.jpeg'

import commonStyles from '../commonStyles'
import AuthInput from '../components/AuthInput';
import { server, showError, showSuccess } from '../common'
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  name: '',
  email: 'marcos@gmail.com',
  password: '123456',
  confirmPassword: '',
  stageNew: false
}

export default class Auth extends Component {
  state = {
    ...initialState,
  }

  signInOrSignUp = () => {
    if (this.state.stageNew) {
      this.signUp()
    }
    else {
      this.signIn()
    }
  }

  signUp = async () => {
    try {
      await axios.post(`${server}/signup`, {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        confirmPassword: this.state.confirmPassword
      })
      showSuccess('Conta criada com sucesso!')
      this.setState({ ...initialState })
    }
    catch (e) {
      showError(e)
    }
  }

  signIn = async () => {
    try {
      const res = await axios.post(`${server}/signin`, {
        email: this.state.email,
        password: this.state.password
      })

      AsyncStorage.setItem('userData', JSON.stringify(res.data))
      axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
      // this.props.navigation.navigate('Home', res.data)
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Home',
              params: res.data,
            },
          ],
        })
      )
    }
    catch (e) {
      showError(e)
    }
  }

  render() {
    const validations = []
    validations.push(this.state.email && this.state.email.includes('@'))
    validations.push(this.state.password && this.state.password.length >= 6)

    if (this.state.stageNew) {
      validations.push(this.state.name && this.state.name.trim().length >= 3)
      validations.push(this.state.password === this.state.confirmPassword)
    }

    const validForm = validations.reduce((t, a) => t && a)

    return (
      <ImageBackground source={backgroundImage} style={styles.background}>
        <Text style={styles.title}>Tasks</Text>
        <View style={styles.formContainer}>
          <Text style={styles.subtitle}>{this.state.stageNew ? "Crie a sua conta" : "Informe seus dados"}</Text>
          {this.state.stageNew && (
            <AuthInput icon="user" placeholder="Nome" value={this.state.name} style={styles.input} onChangeText={name => this.setState({ name })} />
          )}
          <AuthInput icon="at" placeholder="E-mail" value={this.state.email} style={styles.input} onChangeText={email => this.setState({ email })} />
          <AuthInput icon="lock" placeholder="Password" value={this.state.password} style={styles.input} onChangeText={password => this.setState({ password })} secureTextEntry={true} />
          {this.state.stageNew && (
            <AuthInput icon="asterisk" placeholder="Confirmaçāo de senha" value={this.state.confirmPassword} style={styles.input} onChangeText={confirmPassword => this.setState({ confirmPassword })} secureTextEntry={true} />
          )}
          <TouchableOpacity onPress={() => this.signInOrSignUp()} disabled={!validForm} >
            <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA' }]}>
              <Text style={styles.buttonText}>{this.state.stageNew ? "Registrar" : "Entrar"}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
          this.setState({ stageNew: !this.state.stageNew })
        }}>
          <Text style={styles.buttonText}>{this.state.stageNew ? "Já tem conta?" : "Ainda não tem conta?"}</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 70,
    marginBottom: 10
  },
  subtitle: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.secondary,
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  formContainer: {
    backgroundColor: 'RGBA(0,0,0,0.8)',
    padding: 20,
    width: "90%"
  },
  input: {
    fontFamily: commonStyles.fontFamily,
    marginTop: 10,
    backgroundColor: '#FFF',
  },
  button: {
    backgroundColor: '#080',
    marginTop: 10,
    padding: 10,
    alignItems: 'center',
    borderRadius: 12
  },
  buttonText: {
    fontFamily: commonStyles.fontFamily,
    color: '#FFF',
    fontSize: 15,
  }

})