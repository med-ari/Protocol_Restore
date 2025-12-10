
import { SectorId, ModuleId } from './types';
import { SECTORS_DATA } from './content/sectorData';
import { MINI_TEST_QUESTIONS, FINAL_EXAM_QUESTIONS } from './content/quizBank';

// Re-export content for the app to use
export const SECTORS = SECTORS_DATA;
export { MINI_TEST_QUESTIONS, FINAL_EXAM_QUESTIONS };

export const MODULES: { id: ModuleId; title: string; description: string; icon: string; color: string }[] = [
    { 
        id: 'm1_numbers', 
        title: 'MÓDULO 1: NÚMEROS', 
        description: 'Protocolos de Aritmética y Sistemas Numéricos.',
        icon: 'database',
        color: 'text-cyber-primary'
    },
    { 
        id: 'm2_algebra', 
        title: 'MÓDULO 2: ÁLGEBRA Y FUNCIONES', 
        description: 'Sistemas de Navegación Lineal y Modelado.',
        icon: 'brain',
        color: 'text-indigo-400'
    }
];

// Define which sectors belong to which module and their order
export const SECTOR_ORDER: Record<ModuleId, SectorId[]> = {
    'm1_numbers': ['integers', 'rationals', 'percentages', 'powers', 'roots', 'mini_test_numbers'],
    'm2_algebra': ['algebraic_expressions', 'factorization', 'linear_functions']
};

// CRITICAL: Export a flat list for the Inventory to iterate over without errors
export const ALL_SECTORS: SectorId[] = Object.values(SECTOR_ORDER).flat();

export const SECTOR_DISPLAY_NAMES: Record<SectorId, string> = {
    integers: "NÚMEROS ENTEROS [Z]",
    rationals: "NÚMEROS RACIONALES [Q]",
    percentages: "PORCENTAJES [%]",
    powers: "POTENCIAS [^n]",
    roots: "RAÍCES [√]",
    mini_test_numbers: "MINI ENSAYO M1",
    linear_functions: "FUNCIÓN LINEAL [f(x)]",
    algebraic_expressions: "EXPRESIONES ALGEBRAICAS [XY]",
    factorization: "FACTORIZACIÓN [( )²]"
};

export const SECTOR_THEMES: Record<SectorId, {
    baseColor: string;
    borderColor: string;
    shadowColor: string;
    bgHover: string;
    iconVariant: 'thermometer' | 'fraction' | 'shield' | 'reactor' | 'square' | 'database' | 'arrow-right' | 'file-code' | 'target';
    primaryColor: string; 
}> = {
    integers: {
        baseColor: 'text-cyber-primary', // Cyan
        borderColor: 'border-cyber-primary',
        shadowColor: 'shadow-cyan-500/50',
        bgHover: 'hover:bg-cyan-900/30',
        iconVariant: 'thermometer',
        primaryColor: '#00f2ff'
    },
    rationals: {
        baseColor: 'text-orange-400', 
        borderColor: 'border-orange-400',
        shadowColor: 'shadow-orange-500/50',
        bgHover: 'hover:bg-orange-900/30',
        iconVariant: 'fraction',
        primaryColor: '#fb923c'
    },
    percentages: {
        baseColor: 'text-purple-400',
        borderColor: 'border-purple-400',
        shadowColor: 'shadow-purple-500/50',
        bgHover: 'hover:bg-purple-900/30',
        iconVariant: 'shield',
        primaryColor: '#c084fc'
    },
    powers: {
        baseColor: 'text-yellow-400',
        borderColor: 'border-yellow-400',
        shadowColor: 'shadow-yellow-500/50',
        bgHover: 'hover:bg-yellow-900/30',
        iconVariant: 'reactor',
        primaryColor: '#facc15'
    },
    roots: {
        baseColor: 'text-red-400',
        borderColor: 'border-red-400',
        shadowColor: 'shadow-red-500/50',
        bgHover: 'hover:bg-red-900/30',
        iconVariant: 'square',
        primaryColor: '#f87171'
    },
    mini_test_numbers: {
        baseColor: 'text-pink-500',
        borderColor: 'border-pink-500',
        shadowColor: 'shadow-pink-500/50',
        bgHover: 'hover:bg-pink-900/30',
        iconVariant: 'database',
        primaryColor: '#ec4899'
    },
    linear_functions: {
        baseColor: 'text-indigo-400',
        borderColor: 'border-indigo-400',
        shadowColor: 'shadow-indigo-500/50',
        bgHover: 'hover:bg-indigo-900/30',
        iconVariant: 'arrow-right',
        primaryColor: '#818cf8'
    },
    algebraic_expressions: {
        baseColor: 'text-sky-400',
        borderColor: 'border-sky-400',
        shadowColor: 'shadow-sky-500/50',
        bgHover: 'hover:bg-sky-900/30',
        iconVariant: 'file-code',
        primaryColor: '#38bdf8'
    },
    factorization: {
        baseColor: 'text-fuchsia-400',
        borderColor: 'border-fuchsia-400',
        shadowColor: 'shadow-fuchsia-500/50',
        bgHover: 'hover:bg-fuchsia-900/30',
        iconVariant: 'target',
        primaryColor: '#e879f9'
    }
};
