import { Popover, PopoverPanel, PopoverButton, Transition } from '@headlessui/react';

const BalloonTooltip = () => {
  return (
    <div className="absolute">
      <Popover className="relative">
        <PopoverButton className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
          {/* Conteúdo do balão (por exemplo, ícone ou imagem) */}
        </PopoverButton>

        <Transition
          as="div"
          enter="opacity duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="opacity scale duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <PopoverPanel className="absolute z-10 p-3 bg-[#222] text-white text-sm rounded-lg shadow-lg bottom-full left-0 mb-2 w-[300px]">
            Esse é um componente que simula um feed do Instagram. Construí esse projeto para estudar APIs e ferramentas do Meta Graph, além de treinar lógica avançada com TypeScript e JavaScript.
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  );
};

export default BalloonTooltip;
