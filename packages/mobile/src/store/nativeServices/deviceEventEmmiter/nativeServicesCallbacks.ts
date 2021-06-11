import { DeviceEventEmitter } from 'react-native';
import { eventChannel } from 'redux-saga';
import { call, put, take } from 'typed-redux-saga';
import { initActions } from '../../init/init.slice';
import { InitCheckKeys } from '../../init/initCheck.keys';
import { DeviceEventKeys } from './deviceEvent.keys';

export function* deviceEventsMasterSaga(): Generator {
  const channel = yield* call(deviceEvents);
  while (true) {
    const action = yield* take(channel);
    yield put(action);
  }
}

export const deviceEvents = () => {
  return eventChannel<ReturnType<typeof initActions.updateInitCheck>>(emit => {
    const subscriptions = [
      DeviceEventEmitter.addListener(DeviceEventKeys.TorInit, () =>
        emit(
          initActions.updateInitCheck({
            event: InitCheckKeys.Tor,
            passed: true,
          }),
        ),
      ),
      DeviceEventEmitter.addListener(DeviceEventKeys.OnionAdded, () =>
        emit(
          initActions.updateInitCheck({
            event: InitCheckKeys.Onion,
            passed: true,
          }),
        ),
      ),
      DeviceEventEmitter.addListener(DeviceEventKeys.WaggleStarted, () =>
        emit(
          initActions.updateInitCheck({
            event: InitCheckKeys.Waggle,
            passed: true,
          }),
        ),
      ),
    ];
    return () => {
      subscriptions.forEach(subscription => subscription.remove());
    };
  });
};