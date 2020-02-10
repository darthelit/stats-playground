import { fromJS } from 'immutable';
import { ReduceStore } from 'flux/utils';
import Dispatcher from '../Dispatcher';

class ScheduleStore extends ReduceStore {
  constructor() {
    super(Dispatcher)
  }

  getInitialState() {
    const initialState = fromJS({

    });
    return initialState;
  }

  reduce(state, action) {
    switch (action.type) {
      default:
        return state;
    }
  }
}

export default new ScheduleStore();