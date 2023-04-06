

import { take, call, put, fork, cancel, takeLatest } from "redux-saga/effects";

import api from "../apis/api"
import { selectAlarmLen } from "../store/slice/alarmSlice";

function* alarmRun() {
    yield call(api.alarm.readAlarmSendAll());
    const res = yield call(api.alarm.getAlarmSend);
    yield put({type:"alarm/selectAlarmList",payload:res})
    yield put({type: "alarm/increaseAlarmCount"});
    yield put({type: "alarm/setAlarm",payload:selectAlarmLen})
  }


function* alarmSaga() {
    yield takeLatest("ON_ALARM_CHANGE", alarmRun);
  }



  export default alarmSaga;