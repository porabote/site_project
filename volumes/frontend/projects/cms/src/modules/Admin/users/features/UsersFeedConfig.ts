export const greedMap = {
  id: {
    width: '120px',
    label: {ru: 'ID', en: 'ID'},
  },
  email: {
    width: '180px',
    label: {ru: 'Email', en: 'Email'},
  },
  name: {
    width: '180px',
    label: {ru: 'ФИО', en: 'Full name'},
    render: (record) => {
      return `${record.sur_name} ${record.first_name} ${record.middle_name??''}`;
    }
  },
  created_at: {
    width: '140px',
    label: {ru: 'Добавлен', en: 'Created'},
  }
};