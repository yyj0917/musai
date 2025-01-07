'use client';

import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/utils/style';
import { usePathname } from 'next/navigation';

const buttonVariants = cva('transition inline-flex items-center justify-center whitespace-nowrap', {
  variants: {
    variant: {
      primary: '!text-body2 text-grey450 w-auto h-[31px] px-3 py-[5px] rounded',
      secondary: '!text-body1 text-grey150 w-auto h-[44px] rounded-[4px] bg-red',
      filter: '!text-grey150 px-3 py-1 w-auto h-[30px] rounded-[20px] border-[1.5px] border-grey750  text-body1',
      chip: 'bg-grey850 !text-grey450 text-caption1 px-2 py-1 rounded',
      ghost: 'text-grey650',
      link: '!text-grey750 text-head1 px-1 py-[3px]',
      custom: '!text-grey250 text-label2 rounded py-[18px] w-auto h-[50px]',
    },
    size: {
      sm: 'h-9 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-[13px]',
      lg: 'h-11 px-8 text-[13px]',
      icon: 'h-9 w-9',
      custom: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  href?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, href, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    const pathname = usePathname(); // 현재 경로 가져오기

    // active function
    const isActive = href && pathname === href && variant === 'link';

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), isActive ? 'border-b-[2px] !text-grey250' : '')}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
