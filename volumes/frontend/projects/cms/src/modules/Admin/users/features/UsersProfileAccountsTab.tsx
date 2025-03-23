import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Api} from "@porabote";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {Checkbox} from "@porabote/ui/Form";
import "./UsersProfileAccessTab.less";

const UsersProfileAccountsTab = (props) => {

  let {id} = useParams();

  const [records, setRecords] = useState([]);
  const [permissions, setPermissions] = useState(new Set());
  const {lang} = useContext(SettingsContext);
  const {pushBalloon} = useContext(ModalContext);

  useEffect(() => {
    getList();
  }, []);


  const getList = async () => {

    const reqUser = await Api(`/users/get/${id}`).setData({relations: ['accounts']}).get();

    const permissions = new Set();
    reqUser.response.data.accounts.forEach(item => {
      permissions.add(item.id);
    });
    setPermissions(permissions);

    const req = await Api("/accounts/get").get();
    setRecords(req.response.data);
  }

  const onChangeHandler = async (e, record) => {
    const req = await Api("/accounts/action/changeUserAccess").setData({
      account_id: record.id,
      user_id: id,
      status: e.target.checked ? 1 : 0,
    }).post();

    if (req.getApiError()) {
      pushBalloon(req.getApiError());
    } else {
      pushBalloon("Изменения применены");
    }

  }

  return (
    <div>

      <h3>Права пользователя на разделы</h3>

      <div>
        {records.map(nav => {

          let isChecked = !!permissions.has(nav.id);

          return (
            <div className="admin_user_access_list" key={nav.id}>
              <div className="admin_user_access_list_nav_root">
                <Checkbox
                  checked={isChecked}
                  label={nav[`name_${lang}`]}
                  onChange={(e) => onChangeHandler(e, nav)} label={nav.alias}/>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersProfileAccountsTab;