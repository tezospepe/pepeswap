import { Toast } from 'react-hot-toast';

export const toastConfig:
  | Partial<
      Pick<
        Toast,
        | 'id'
        | 'icon'
        | 'duration'
        | 'ariaProps'
        | 'className'
        | 'style'
        | 'position'
        | 'iconTheme'
      >
    >
  | undefined = {
  duration: 4000,
  position: 'bottom-center',

  style: {
    borderRadius: '15px',
    background: `rgba(30,31,40,1)`,
    color: 'rgba(252,253,252,1)',
  },

  iconTheme: {
    primary: '#000',
    secondary: '#fff',
  },

  ariaProps: {
    role: 'status',
    'aria-live': 'polite',
  },
};
