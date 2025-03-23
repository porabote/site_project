import React from 'react';
import MakeInvitationForm from "@/modules/Auth/features/MakeInvitationForm";

const MakeInvitationPage = () => {
  return (
    <div className="box login_block" style={{width: '320px', margin: '0 auto'}}>
      <div className="box-body">
        <h2 style={{padding: '40px 0 10px 0'}}>Создать приглашение</h2>
        <MakeInvitationForm/>
      </div>
    </div>
  );
};

export default MakeInvitationPage;