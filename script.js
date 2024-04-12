import {get_Data_User} from "./user-file/API/getDataUser.js";
import {update_NewUser} from "./user-file/API/updateNewUser.js"

export const options = {
    scenarios:{
        getUser_then_UpdateUser: {
          executor: 'constant-arrival-rate', // https://grafana.com/docs/k6/latest/using-k6/scenarios/executors/
          duration: 10000,
          rate: 1,
          preAllocatedVUs: 1,
          timeUnit: "1s",
        }
  }
}

export default function () {
    get_Data_User();
    update_NewUser();
}