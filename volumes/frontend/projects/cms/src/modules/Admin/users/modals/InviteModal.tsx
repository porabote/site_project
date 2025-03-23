import React, {useEffect, useState} from 'react';
import ApiService from "@/services/api-service";

const InviteModal = (props) => {

  const userId = props.data.id;
  const [data, setData] = useState(null);

  useEffect(() => {
    getInvite();
  }, []);

  const getInvite = async () => {
    const res = await ApiService.post('/users/action/getInvite', {
      user_id: userId,
    });

    setData(res.data);
  }

  if (!data) {
    return <p>Созданию ссылку</p>
  }

  return (
    <div>
      <p>Ссылка для пользователя: </p>
      <p style={{padding: '20px 0'}}>
        {`https://cp.passmen.ae/auth/invitation/${data.code}`}
      </p>
    </div>
  );
};

export default InviteModal;