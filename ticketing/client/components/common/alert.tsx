import { useState } from 'react';
// import { MdDoneAll } from '@react-icons/all-files';

interface AlertProps {
  type?: 'success' | 'warning' | 'error';
  showClose?: boolean;
  title: string;
  message: string;
  timeout?: number;
  onClose?: () => void;
}

export default (props: AlertProps) => {
  const {
    type = 'success',
    showClose = true,
    title,
    message,
    onClose,
    timeout = 3000,
  } = props;
  const [visiable, setVisiable] = useState(true);
  // const [timer, setTimer] = useState<NodeJS.Timeout>();

  const handleClose = () => {
    onClose && onClose();
    setVisiable(false);
    // setTimer(undefined);
  };

  // setTimer(
  //   setTimeout(() => {
  //     handleClose();
  //   }, timeout)
  // );
  return (
    <div className='rounded border-l-4 border-red-500 bg-red-50 p-4'>
      <strong className='block font-medium text-red-700'>
        {' '}
        Something went wrong{' '}
      </strong>

      <p className='mt-2 text-sm text-red-700'>{message}</p>
    </div>
  );
};
