import { h } from "preact";
import { useEffect } from "preact/hooks";
import CMessageList from "../components/organisms/c-message-list";
import CPatientCard from "../components/organisms/c-patient-card";
import CUsersList from "../components/organisms/c-users-list";
import { useStateValue } from "../state";

const PAddToChat = () => {

  const { patients, getPatients } = useStateValue();

  useEffect(() => {
    getPatients();
  },[])

  if(!patients?.all.length){
    return <div>loading...</div>
  }

  return (
  <div className="flex">
    <div className="hidden h-screen lg:block" style={{ minWidth: "350px" }}>
      <CPatientCard
        className="mt-7 pb-6 px-5.5 h-min border-b border-secondary-100"
      />
      <CUsersList />
    </div>
    <div className="opacity-10">
      <CMessageList />
    </div>
  </div>
  )
  };

export default PAddToChat;
