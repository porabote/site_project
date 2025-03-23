import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Api} from "@porabote";
import {SettingsContext} from "@porabote/middlewares/Settings";
import {ModalContext} from "@porabote/widgets/ModalWidget";
import {Checkbox} from "@porabote/ui/Form";
import "./UsersProfileAccessTab.less";

const UsersProfileAccessTab = (props) => {

  let {id} = useParams();

  const [navs, setNavs] = useState([]);
  const {lang} = useContext(SettingsContext);
  const {pushBalloon} = useContext(ModalContext);

  const acosSet = new Set();
  props.data.aro.permissions.forEach(perm => {
    if (!perm.aco_id) return;
    acosSet.add(perm.aco_id);
  });

  useEffect(() => {
    getNavs();
  }, []);


  const getNavs = async () => {
    const req = await Api("/navs/action/getTreeAdmin").get();
    setNavs(req.response.data);
  }

  const onChangeHandler = async (e, nav) => {
    const req = await Api("/users/action/setPermission").setData({
      aco_id: nav.aco_id,
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
        {navs.map(nav => {

          let isChecked = acosSet.has(nav.aco_id) ? true : false;

          return (
            <div className="admin_user_access_list" key={nav.id}>
              <div className="admin_user_access_list_nav_root">
                <Checkbox
                  checked={isChecked}
                  label={nav[`name_${lang}`]}
                  onChange={(e) => onChangeHandler(e, nav)} label={nav[`name_${lang}`]}/>

                {nav.children.map((child_nav) => {

                  let isChecked = acosSet.has(child_nav.aco_id) ? true : false;

                  return (
                    <div className="admin_user_access_list_nav_child" key={child_nav.id}>
                      <Checkbox
                        checked={isChecked}
                        onChange={(e) => onChangeHandler(e, child_nav)}
                        label={child_nav[`name_${lang}`]}/>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UsersProfileAccessTab;