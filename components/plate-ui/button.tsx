import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cn, withRef } from '@udecode/cn';
import { type VariantProps, cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300',
  {
    defaultVariants: {
      size: 'sm',
      variant: 'default',
    },
    variants: {
      isMenu: {
        true: 'w-full cursor-pointer justify-start',
      },
      size: {
        icon: 'size-[28px] rounded-md px-1.5',
        lg: 'h-10 rounded-md px-4',
        md: 'h-8 px-3 text-sm',
        none: '',
        sm: 'h-[28px] rounded-md px-2.5',
        xs: 'h-8 rounded-md px-3 text-xs',
      },
      variant: {
        default: 'bg-gray-900 text-gray-50 hover:bg-gray-900/90 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90',
        destructive:
          'bg-red-500 text-gray-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-gray-50 dark:hover:bg-red-900/90',
        ghost: 'hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50',
        inlineLink: 'text-base text-gray-900 underline underline-offset-4 dark:text-gray-50',
        link: 'text-gray-900 underline-offset-4 hover:underline dark:text-gray-50',
        outline:
          'border border-gray-200 bg-white hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-100/80 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-800/80',
      },
    },
  }
);

export const Button = withRef<
  'button',
  {
    asChild?: boolean;
  } & VariantProps<typeof buttonVariants>
>(({ asChild = false, className, isMenu, size, variant, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ className, isMenu, size, variant }))}
      {...props}
    />
  );
});
