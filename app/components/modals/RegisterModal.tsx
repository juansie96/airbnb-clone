'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Heading from '../Heading';
import Input from '../Input';

interface RegisterFormValues {
  email: string;
  name: string;
  password: string;
}

const FORM_ID = 'register-form';

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
    <form
      onSubmit={handleSubmit(handleRegisterSubmit)}
      className='flex flex-col gap-4'
      id={FORM_ID}
      autoComplete='off'
    >
      <Heading title='Welcome to Airbnb' subtitle='Create an account!' />
      <Input
        id='email'
        type='email'
        register={register}
        label='Email'
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id='name'
        type='name'
        register={register}
        label='Name'
        errors={errors}
        disabled={isLoading}
        required
      />
      <Input
        id='password'
        type='password'
        register={register}
        label='Password'
        errors={errors}
        disabled={isLoading}
        required
      />
    </form>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      actionLabel='Register'
      body={body}
      title='Register'
      disabled={isLoading}
      formId={FORM_ID}
    />
  );
};

export default RegisterModal;
