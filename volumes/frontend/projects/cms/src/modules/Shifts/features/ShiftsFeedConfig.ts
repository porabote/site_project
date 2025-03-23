export const greedMap = {
  name: {
    width: '180px',
    label: {ru: 'Название', en: 'Name'}
  },
  head_user_id: {
    width: '420px',
    label: {ru: 'Руководитель', en: 'Head manager'},
    render: (record: {[key: number | string]: any}) => {
      return record.head_user ? `${record.head_user.sur_name} ${record.head_user.first_name} (${record.head_user.post_name})` : '';
    }
  },
};