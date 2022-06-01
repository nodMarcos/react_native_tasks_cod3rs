import { Text, View, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from "react-native"
import Swipeable from 'react-native-gesture-handler/Swipeable'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import commonStyles from '../commonStyles'
import Icon from 'react-native-vector-icons/FontAwesome5'
import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

  const doneOrNotStyle = props.doneAt !== null ? { textDecorationLine: 'line-through' } : {}

  const date = props.date ? props.date : props.estimateAt
  const formattedDate = moment(date).locale('pt-br').format('ddd, D [de] MMMM')

  const getRightContent = () => {
    return (
      <TouchableOpacity style={styles.right} onPress={() => props.onDelete && props.onDelete(props.id)} >
        <Icon name="trash" size={20} color="#fff"/>
      </TouchableOpacity>
    )
  }
  const getLeftContent = () => {
    return (
      <View style={styles.left}>
        <Icon name="trash" size={20} color="#fff" style={{marginLeft: 10}} />
        <Text style={styles.excludeText}>Excluir</Text>
      </View>
    )
  }

  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={getRightContent} renderLeftActions={getLeftContent} onSwipeableLeftOpen={() => props.onDelete && props.onDelete(props.id)}>
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={() => props.toggleTask(props.id)}>
            <View style={styles.checkContainer}>
              {getCheckView(props.doneAt)}
            </View>
          </TouchableWithoutFeedback>
          <View>
            <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
            <Text style={styles.date}>{formattedDate}</Text>
          </View>
        </View>
      </Swipeable>
    </GestureHandlerRootView>
  )
}

function getCheckView(doneAt) {
  if (doneAt !== null) {
    return (
      <View style={styles.done}>
        <Icon style={{ marginLeft: 2 }} name="check" size={20} color="#fff"> </Icon>
      </View>
    )
  }
  else {
    return (
      <View style={styles.pending}>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderColor: "#AAA",
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#FFF',
  },
  checkContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    height: 25,
    width: 25,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: '#555'
  },
  done: {
    backgroundColor: '#4D7031',
    height: 25,
    width: 25,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
  },
  desc: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.mainText,
    fontSize: 15,
  },
  date: {
    fontFamily: commonStyles.fontFamily,
    color: commonStyles.colors.subText,
    fontSize: 12
  },
  right: {
    backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  left: {
    flex: 1,
    backgroundColor: 'red',
    flexDirection: 'row',
    alignItems: 'center',
  },
  excludeText: {
    fontFamily: commonStyles.fontFamily,
    color: 'white',
    fontSize: 20,
    margin: 10
  }
})