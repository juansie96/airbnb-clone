'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
}

const RegisterModal = () => {
  const { isOpen, onOpen, onClose } = useRegisterModal();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: { name: '', email: '', password: '' },
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterSubmit: SubmitHandler<RegisterFormValues> = (data) => {
    setIsLoading(true);
    axios
      .post('/api/register', data)
      .then(() => {
        onClose();
      })
      .catch((error: unknown) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <form onSubmit={handleSubmit(handleRegisterSubmit)} autoComplete='off'>
      <input
        type='text'
        defaultValue={'test'}
        {...register('name')}
        autoComplete='off'
      />
      <input type='password' {...register('password')} />
    </form>
  );
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      actionLabel='Register'
      onSubmit={() => {}}
      body={body}
      title='Register'
      disabled={isLoading}
    />
  );
};

export default RegisterModal;
