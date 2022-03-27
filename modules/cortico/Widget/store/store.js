import { createStore, combineReducers, applyMiddleware } from "redux";
import {
  eligCheckReducer,
  eligCheckFailsReducer,
} from "../features/EligCheck/EligCheck";
import {
  setupPharmacyReducer,
  setupPharmacyFailuresReducer,
} from "../features/Pharmacy/SetupPreferredPharmacies";

import { automationReducer } from "../features/Automation/Automation";
import { authReducer } from "../features/Auth/auth";
import { messengerReducer } from "../features/Messenger";

const rootReducer = combineReducers({
  eligCheck: eligCheckReducer,
  eligCheckFails: eligCheckFailsReducer,
  setupPharmacies: setupPharmacyReducer,
  setupPharmaciesFailures: setupPharmacyFailuresReducer,
  automation: automationReducer,
  auth: authReducer,
  messenger: messengerReducer,
});

function logger({ getState }) {
  return (next) => (action) => {
    console.info("will dispatch", action);
    const returnValue = next(action);
    console.info("state after dispatch", getState());
    return returnValue;
  };
}

const store = createStore(rootReducer, applyMiddleware(logger));
export default store;
