import React from 'react';

import { cn, withVariants } from '@udecode/cn';
import { type VariantProps, cva } from 'class-variance-authority';

export const inputVariants = cva(
  'flex w-full rounded-md bg-transparent text-sm file:border-0 file:bg-white file:text-sm file:font-medium file:text-gray-950 placeholder:text-gray-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:file:bg-gray-950 dark:file:text-gray-50 dark:placeholder:text-gray-400',
  {
    defaultVariants: {
      h: 'md',
      variant: 'default',
    },
    variants: {
      h: {
        md: 'h-10 px-3 py-2',
        sm: 'h-[28px] px-1.5 py-1',
      },
      variant: {
        default:
          'border border-gray-200 ring-offset-white focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 dark:border-gray-800 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
        ghost: 'border-none focus-visible:ring-transparent',
      },
    },
  }
);

export type InputProps = React.ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputVariants>;

export const Input = withVariants('input', inputVariants, ['variant', 'h']);

export type FloatingInputProps = InputProps & {
  label: string;
};

export function FloatingInput({
  id,
  className,
  label,
  ...props
}: FloatingInputProps) {
  return (
    <>
      <label
        className='absolute top-1/2 block -translate-y-1/2 cursor-text px-1 text-sm text-gray-500/70 transition-all group-focus-within:pointer-events-none group-focus-within:top-0 group-focus-within:cursor-default group-focus-within:text-xs group-focus-within:font-medium group-focus-within:text-gray-950 has-[+input:not(:placeholder-shown)]:pointer-events-none has-[+input:not(:placeholder-shown)]:top-0 has-[+input:not(:placeholder-shown)]:cursor-default has-[+input:not(:placeholder-shown)]:text-xs has-[+input:not(:placeholder-shown)]:font-medium has-[+input:not(:placeholder-shown)]:text-gray-950 dark:text-gray-400/70 dark:group-focus-within:text-gray-50 dark:has-[+input:not(:placeholder-shown)]:text-gray-50'
        htmlFor={id}
      >
        <span className='inline-flex bg-white px-2 dark:bg-gray-950'>{label}</span>
      </label>
      <Input id={id} className={cn(className)} placeholder='' {...props} />
    </>
  );
}
