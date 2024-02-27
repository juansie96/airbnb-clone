'use client';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Heading from '../Heading';
import Input from '../Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

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
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const body = (
    <>
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
    </>
  );

  const footer = (
    <div className='flex flex-col gap-4'>
      <Button
        label='Continue with Google'
        outline
        onClick={() => alert('GGL')}
        icon={FcGoogle}
      />
      <Button
        label='Continue with Github'
        outline
        onClick={() => alert('GH')}
        icon={FaGithub}
      />
      <div className='mt-4 flex justify-center gap-1.5 font-light'>
        <p className='text-neutral-500'>Already have an account?</p>{' '}
        <Link href='/login' className=''>
          Log in
        </Link>
      </div>
    </div>
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
      footer={footer}
    />
  );
};

export default RegisterModal;
