import { HTMLInputTypeAttribute } from 'react';
import {
  FieldErrors,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';

type CustomRegisterOptions<T extends FieldValues> = RegisterOptions<T, Path<T>>;

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  register: UseFormRegister<T>;
  type: HTMLInputTypeAttribute;
  label: string;
  disabled: boolean;
  errors: FieldErrors;
  required?: boolean | string;
  registerOptions?: CustomRegisterOptions<T>;
}

const Input = <T extends FieldValues>({
  id,
  register,
  type,
  label,
  disabled,
  errors,
  required = false,
  registerOptions,
}: InputProps<T>) => {
  const finalRegisterOptions: CustomRegisterOptions<T> = {
    ...registerOptions,
  };
  if (type === 'email') {
    finalRegisterOptions.pattern = {
      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: 'Please provide a valid email address',
    };
  }
  return (
    <div className='relative w-full'>
      <input
        className={`
          peer 
          w-full 
          rounded-md 
          border-2 
          bg-white 
          p-4 
          pt-6 
          font-light 
          outline-none 
          transition
          ${errors?.[id] ? 'border-rose-500' : 'border-neutral-300'}  
        `}
        {...register(id, { required, ...finalRegisterOptions })}
        placeholder={' '}
        type={type}
        autoComplete='new-password'
      />
      <label
        className={`
          absolute 
          left-4 
          top-5
          origin-[0] 
          -translate-y-4
          scale-75 
          transform 
          text-base 
          ${errors?.[id] ? 'text-rose-500' : 'text-zinc-400'}  
          duration-150
          peer-placeholder-shown:translate-y-0 
          peer-placeholder-shown:scale-100 
          peer-focus:left-4 
          peer-focus:-translate-y-4
          peer-focus:scale-75
        `}
      >
        {label}
      </label>
      {errors?.[id] && (
        <span className='ml-1 text-xs font-semibold text-rose-500'>
          {(errors?.[id]?.message as string) || 'This field is required'}
        </span>
      )}
    </div>
  );
};

export default Input;
