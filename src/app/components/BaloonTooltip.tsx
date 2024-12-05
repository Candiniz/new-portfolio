import Tippy from '@tippyjs/react';
import styles from './BaloonTooltip.module.css';
import 'tippy.js/dist/tippy.css'; // Importa o estilo básico do Tippy.js

const BallonTooltip = () => {
    return (
        <div className="absolute">
            {/* Div principal que será o alvo do balão */}
            <Tippy
                content="Esse é um componente que simula um feed do Instagram. Construí esse projeto para estudar APIs e ferramentas do Meta Graph, além de treinar lógica avançada com TypeScript e JavaScript. Foi uma oportunidade de simular uma experiência real de feed, explorando estados, chamadas à API e animações, enquanto aprimorei integrações e escalabilidade no desenvolvimento de apps sociais."
                placement="top-end"
                animation="fade"
                arrow={true}
                className={styles.tippyCustom} // Aqui, você pode usar sua classe personalizada
            >
                <div className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer">
                    {/* Aqui você pode adicionar a imagem ou conteúdo que desejar */}
                </div>
            </Tippy>
        </div>
    );
};

export default BallonTooltip;
