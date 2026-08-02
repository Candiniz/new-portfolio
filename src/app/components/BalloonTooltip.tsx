import { Popover, PopoverPanel, PopoverButton, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

interface BalloonTooltipProps {
  text: string;
  children: ReactNode;
  position?: 'top' | 'bottom';
}

const BalloonTooltip = ({ text, children, position = 'bottom' }: BalloonTooltipProps) => {

  const positionClasses = position === 'top'
    ? 'bottom-full mb-3 left-0 origin-bottom-left' // Abre para cima
    : 'top-full mt-3 left-0 origin-top-left';       // Abre para baixo

  return (
      <Popover className="relative">
        <PopoverButton className="rounded-full flex items-center justify-center cursor-pointer">
          {children}
        </PopoverButton>

        <Transition
          as={Fragment}
          enter="opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="opacity scale duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverPanel className={`absolute z-10 p-3 bg-black/60 backdrop-blur-md text-white text-xs rounded-lg shadow-lg left-0 mb-2 w-[300px] ${positionClasses}`}>
            {text}
          </PopoverPanel>
        </Transition>
      </Popover>
  );
};

export default BalloonTooltip;
