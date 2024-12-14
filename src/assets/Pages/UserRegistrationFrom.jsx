import DefaultStepper from '../components/DefaultStepper';
import { useEffect } from 'react';

const UserRegistrationForm = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <DefaultStepper />
    </>
  );
};

export default UserRegistrationForm;
