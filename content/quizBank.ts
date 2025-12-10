
import { Question } from '../types';

/* 
  ======================================
  BANCO DE PREGUNTAS (QUIZ BANK)
  ======================================
*/

export const MINI_TEST_QUESTIONS: Question[] = [
  {
    id: 'mt1', 
    difficulty: 'EASY', 
    hint: 'Dibuja el movimiento vertical en una recta numérica.',
    text: 'Un dron submarino realiza una exploración. Inicialmente, se encuentra a 30 metros bajo el nivel del mar. Asciende 12 metros para inspeccionar una estructura y luego, afectado por una corriente, desciende 8 metros adicionales. ¿Cuál es la profundidad final del dron respecto al nivel del mar?',
    options: [
      { id: 'a', text: '-10 metros', isCorrect: false, feedback: 'Error. Recuerda que bajo el nivel del mar es negativo (-30).' },
      { id: 'b', text: '-26 metros', isCorrect: true, feedback: 'Correcto. -30 (inicio) + 12 (sube) - 8 (baja) = -18 - 8 = -26.' },
      { id: 'c', text: '-34 metros', isCorrect: false, feedback: 'Error de cálculo. Al subir 12 metros desde -30, llegas a -18, no a -42.' },
      { id: 'd', text: '-50 metros', isCorrect: false, feedback: 'Sumaste todo como negativo. Ascender es positivo (+12).' }
    ]
  },
  {
    id: 'mt2', 
    difficulty: 'MEDIUM', 
    hint: 'Calcula primero el resto después de la primera operación.',
    text: 'Para un proyecto de carpintería, Juan necesita gastar 1/3 de un listón de madera para la base de un mueble y 2/5 del *resto* del listón para los soportes laterales. ¿Qué fracción del listón original le queda para la tapa del mueble?',
    options: [
      { id: 'a', text: '2/5', isCorrect: true, feedback: 'Excelente. Resto inicial: 2/3. Gasto 2: 2/5 * 2/3 = 4/15. Total gastado: 1/3 + 4/15 = 9/15. Queda 6/15 = 2/5.' },
      { id: 'b', text: '4/15', isCorrect: false, feedback: 'Ese es el gasto de los soportes, no lo que sobra.' },
      { id: 'c', text: '1/3', isCorrect: false, feedback: 'Revisa la suma de fracciones.' },
      { id: 'd', text: '2/3', isCorrect: false, feedback: 'Ese es el primer resto, antes de cortar los soportes.' }
    ]
  }
];

export const FINAL_EXAM_QUESTIONS: Question[] = [
  {
    id: 'f1', 
    difficulty: 'EASY', 
    hint: 'Piensa en la recta numérica.',
    text: 'La temperatura actual de un reactor es -5°C. Debido a un fallo, desciende 3°C más. ¿Cuál es la temperatura final?',
    options: [
      { id: 'a', text: '-2°C', isCorrect: false, feedback: 'Error de concepto: Si estás en -5 y baja la temperatura, te alejas más del cero. No restes las magnitudes.' },
      { id: 'b', text: '-8°C', isCorrect: true, feedback: 'Correcto. -5 + (-3) = -8.' },
      { id: 'c', text: '2°C', isCorrect: false, feedback: 'Error de signo: El resultado debe ser negativo.' }
    ]
  },
  {
    id: 'f2', 
    difficulty: 'MEDIUM', 
    hint: 'Recuerda que (a^n)^m = a^(n*m)',
    text: 'Simplifica la expresión: (2^3)^2 * 2^-4',
    options: [
        { id: 'a', text: '2^2', isCorrect: true, feedback: 'Correcto. 2^(3*2) = 2^6. Luego 2^6 * 2^-4 = 2^(6-4) = 2^2.' },
        { id: 'b', text: '2^10', isCorrect: false, feedback: 'Error. Sumaste los exponentes en el paréntesis en lugar de multiplicar.' },
        { id: 'c', text: '2', isCorrect: false, feedback: 'Error en la resta final.' }
    ]
  }
];

export const INTEGERS_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'CONTROL TÉRMICO: La temperatura interna es de 4°C. Si el sistema de enfriamiento reduce la temperatura en 10°C, ¿cuál es el estado final?',
    options: [
      { id: 'a', text: '-6°C', isCorrect: true, feedback: 'CORRECTO. 4 - 10 = -6.' },
      { id: 'b', text: '6°C', isCorrect: false, feedback: 'ERROR. 10 - 4 es 6, pero estamos restando 10 a 4.' },
      { id: 'c', text: '-14°C', isCorrect: false, feedback: 'ERROR. Parece que sumaste magnitudes negativas (-4 - 10).' }
    ],
    hint: 'Estás en el piso 4 y bajas 10 pisos.'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'AUDITORÍA: En una inspección de 3 rondas, ganas 1 punto por acierto (⚪) y pierdes 1 punto por fallo (⚫). Si tu registro es: ⚪⚪⚫⚫⚫, ¿cuál es tu puntaje neto?',
    options: [
      { id: 'a', text: '-1', isCorrect: true, feedback: 'CORRECTO. 2 aciertos (+2) y 3 fallos (-3) = -1.' },
      { id: 'b', text: '1', isCorrect: false, feedback: 'ERROR. Hay más fichas negras que blancas.' },
      { id: 'c', text: '5', isCorrect: false, feedback: 'ERROR. Eso es el total de fichas, no el puntaje.' }
    ],
    hint: 'Suma los positivos y resta los negativos. +2 - 3.'
  },
  {
    id: 'q3',
    difficulty: 'HARD',
    text: 'CÁLCULO AVANZADO: Evalúa la siguiente expresión de la computadora central: |-8| + (-3) - 2',
    options: [
      { id: 'a', text: '3', isCorrect: true, feedback: 'CORRECTO. |-8|=8. Entonces 8 + (-3) = 5. Luego 5 - 2 = 3.' },
      { id: 'b', text: '7', isCorrect: false, feedback: 'ERROR. |-8| es 8 positivo. Si usas -8, da -13.' },
      { id: 'c', text: '-13', isCorrect: false, feedback: 'ERROR. Recuerda que el valor absoluto vuelve positivo al -8.' }
    ],
    hint: 'Resuelve primero el valor absoluto.'
  }
];

export const RATIONALS_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'RACIONAMIENTO: Si usas 1/3 del tanque de agua para beber y luego 1/4 DEL RESTO para limpiar, ¿qué operación representa el agua usada para limpiar?',
    options: [
      { id: 'a', text: '1/4 * 1/3', isCorrect: false, feedback: 'ERROR. Eso sería 1/4 del total original, no del resto.' },
      { id: 'b', text: '1/4 * 2/3', isCorrect: true, feedback: 'CORRECTO. Si usaste 1/3, el resto es 2/3. Limpieza es 1/4 de 2/3.' },
      { id: 'c', text: '1/3 - 1/4', isCorrect: false, feedback: 'ERROR. No es una resta directa.' }
    ],
    hint: 'Calcula primero cuánto queda después de beber.'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'CONVERSIÓN: El sistema muestra 0.666... de energía. ¿Qué fracción exacta es?',
    options: [
      { id: 'a', text: '6/10', isCorrect: false, feedback: 'ERROR. Eso es 0.6 exacto.' },
      { id: 'b', text: '2/3', isCorrect: true, feedback: 'CORRECTO. 2 dividido 3 es 0.666...' },
      { id: 'c', text: '3/5', isCorrect: false, feedback: 'ERROR. Eso es 0.6.' }
    ],
    hint: 'Es un decimal periódico.'
  },
  {
    id: 'q3',
    difficulty: 'HARD',
    text: 'OPERACIÓN: Calcula (1/2) : (3/4)',
    options: [
      { id: 'a', text: '3/8', isCorrect: false, feedback: 'ERROR. Multiplicaste lineal en vez de cruzado.' },
      { id: 'b', text: '2/3', isCorrect: true, feedback: 'CORRECTO. Invertimos la segunda: 1/2 * 4/3 = 4/6 = 2/3.' },
      { id: 'c', text: '3/2', isCorrect: false, feedback: 'ERROR.' }
    ],
    hint: 'Invierte la segunda fracción y multiplica.'
  }
];

export const PERCENTAGES_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'MERCADO: Un componente cuesta $1000. Sube un 10% y luego baja un 10%. ¿Precio final?',
    options: [
      { id: 'a', text: '$1000', isCorrect: false, feedback: 'TRAMPA. 1000 * 1.1 = 1100. Luego 1100 * 0.9 = 990.' },
      { id: 'b', text: '$990', isCorrect: true, feedback: 'CORRECTO. Siempre se pierde valor en subidas y bajadas simétricas.' },
      { id: 'c', text: '$900', isCorrect: false, feedback: 'ERROR de cálculo.' }
    ],
    hint: 'Calcula paso a paso.'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'AHORRO: Si te ofrecen un 20% de descuento adicional sobre un precio ya rebajado en un 50%, ¿cuál es el descuento total real?',
    options: [
      { id: 'a', text: '70%', isCorrect: false, feedback: 'ERROR. No se suman.' },
      { id: 'b', text: '60%', isCorrect: true, feedback: 'CORRECTO. Pagas 0.5 * 0.8 = 0.4 (40%). El descuento es 100 - 40 = 60%.' },
      { id: 'c', text: '30%', isCorrect: false, feedback: 'ERROR.' }
    ],
    hint: 'Piensa en cuánto PAGAS, no en cuánto descuentas.'
  }
];

export const POWERS_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'CRECIMIENTO: Una célula se divide en 2 cada hora. Si empiezas con 1, ¿cuántas tienes en 5 horas?',
    options: [
      { id: 'a', text: '10', isCorrect: false, feedback: 'ERROR. No es 2*5. Es 2^5.' },
      { id: 'b', text: '32', isCorrect: true, feedback: 'CORRECTO. 2^5 = 32.' },
      { id: 'c', text: '64', isCorrect: false, feedback: 'ERROR. Te pasaste por un ciclo.' }
    ],
    hint: '2*2*2*2*2'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'ANÁLISIS: ¿Cuál es el valor de 5^0 + 5^1?',
    options: [
      { id: 'a', text: '5', isCorrect: false, feedback: 'ERROR. 5^0 es 1.' },
      { id: 'b', text: '6', isCorrect: true, feedback: 'CORRECTO. 1 + 5 = 6.' },
      { id: 'c', text: '0', isCorrect: false, feedback: 'ERROR.' }
    ],
    hint: 'Todo número elevado a 0 es 1.'
  },
  {
    id: 'q3',
    difficulty: 'HARD',
    text: 'INVERSIÓN: Calcula (1/2)^-2',
    options: [
      { id: 'a', text: '1/4', isCorrect: false, feedback: 'ERROR. El negativo invierte la fracción.' },
      { id: 'b', text: '4', isCorrect: true, feedback: 'CORRECTO. Se invierte a 2/1 y se eleva al cuadrado. 2^2 = 4.' },
      { id: 'c', text: '-4', isCorrect: false, feedback: 'ERROR. El exponente negativo no cambia el signo del resultado.' }
    ],
    hint: 'Invierte la fracción primero.'
  }
];

export const ROOTS_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'SIMPLIFICACIÓN: Reduce √12 + √27.',
    options: [
      { id: 'a', text: '√39', isCorrect: false, feedback: 'ERROR FATAL. No sumes los interiores.' },
      { id: 'b', text: '5√3', isCorrect: true, feedback: 'CORRECTO. √12=2√3 y √27=3√3. Suma: 5√3.' },
      { id: 'c', text: '6√3', isCorrect: false, feedback: 'ERROR de cálculo.' }
    ],
    hint: 'Descompón cada raíz en función de √3.'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'GEOMETRÍA: Si el área de un cuadrado es 100, ¿cuánto mide su diagonal?',
    options: [
      { id: 'a', text: '10', isCorrect: false, feedback: 'Eso mide el lado.' },
      { id: 'b', text: '10√2', isCorrect: true, feedback: 'CORRECTO. Por Pitágoras, d² = 10² + 10² = 200. d = √200 = 10√2.' },
      { id: 'c', text: '20', isCorrect: false, feedback: 'ERROR.' }
    ],
    hint: 'Diagonal = Lado * √2.'
  }
];

export const LINEAR_QUIZ: Question[] = [
  {
    id: 'q1',
    difficulty: 'EASY',
    text: 'TELEMETRÍA: ¿Cuál es la pendiente (m) y el coeficiente de posición (n) en f(x) = -5x + 3?',
    options: [
      { id: 'a', text: 'm=5, n=3', isCorrect: false, feedback: 'ERROR DE SIGNO. La pendiente acompaña a la x.' },
      { id: 'b', text: 'm=-5, n=3', isCorrect: true, feedback: 'CORRECTO. m es el factor de x, n es el término libre.' },
      { id: 'c', text: 'm=3, n=-5', isCorrect: false, feedback: 'INVERTIDO. n es el término independiente.' }
    ],
    hint: 'm acompaña a la x.'
  },
  {
    id: 'q2',
    difficulty: 'MEDIUM',
    text: 'PREDICCIÓN: Si f(x) = 2x, ¿qué valor tiene f(5)?',
    options: [
      { id: 'a', text: '10', isCorrect: true, feedback: 'AFIRMATIVO. 2 * 5 = 10.' },
      { id: 'b', text: '7', isCorrect: false, feedback: 'ERROR. Es multiplicación, no suma.' },
      { id: 'c', text: '25', isCorrect: false, feedback: 'ERROR. No es potencia.' }
    ],
    hint: 'Evaluar significa reemplazar x.'
  },
  {
    id: 'q3',
    difficulty: 'HARD',
    text: 'ANÁLISIS GRÁFICO: Una recta pasa por el origen (0,0) y por (2,4). ¿Cuál es su función?',
    options: [
      { id: 'a', text: 'f(x) = x + 2', isCorrect: false, feedback: 'FALLO. Si x=0, f(0)=2, no pasa por el origen.' },
      { id: 'b', text: 'f(x) = 2x', isCorrect: true, feedback: 'CORRECTO. Si x=2, y=4. Si x=0, y=0.' },
      { id: 'c', text: 'f(x) = 4x', isCorrect: false, feedback: 'ERROR. Si x=2, daría 8.' }
    ],
    hint: 'Es una función lineal (proporcional).'
  }
];

export const ALGEBRAIC_QUIZ: Question[] = [
  {
    id: 'aq1',
    difficulty: 'EASY',
    text: 'INVENTARIO: Simplifica: 2x + 3y + 5x - y',
    options: [
      { id: 'a', text: '7x + 2y', isCorrect: true, feedback: 'CORRECTO. Juntamos las x (2+5) y las y (3-1).' },
      { id: 'b', text: '9xy', isCorrect: false, feedback: 'ERROR. No puedes mezclar x con y en suma.' },
      { id: 'c', text: '7x - 2y', isCorrect: false, feedback: 'ERROR. 3y - y es +2y, no -2y.' }
    ],
    hint: 'Suma peras con peras y manzanas con manzanas.'
  },
  {
    id: 'aq2',
    difficulty: 'MEDIUM',
    text: 'EXPANSIÓN: Calcula 2(3a - 4)',
    options: [
      { id: 'a', text: '6a - 4', isCorrect: false, feedback: 'ERROR. El 2 multiplica a AMBOS términos.' },
      { id: 'b', text: '6a - 8', isCorrect: true, feedback: 'CORRECTO. Propiedad distributiva.' },
      { id: 'c', text: '5a - 6', isCorrect: false, feedback: 'ERROR. Sumaste en vez de multiplicar.' }
    ],
    hint: 'Multiplica el número de afuera por cada uno de los de adentro.'
  }
];

export const FACTORIZATION_QUIZ: Question[] = [
  {
    id: 'fq1',
    difficulty: 'EASY',
    text: 'CUADRADO: Desarrolla (x + 3)^2',
    options: [
      { id: 'a', text: 'x^2 + 9', isCorrect: false, feedback: 'ERROR CLÁSICO. Falta el término central (el doble producto).' },
      { id: 'b', text: 'x^2 + 6x + 9', isCorrect: true, feedback: 'CORRECTO. El primero al cuadrado, más el doble del primero por el segundo, más el segundo al cuadrado.' },
      { id: 'c', text: 'x^2 + 3x + 9', isCorrect: false, feedback: 'ERROR. El término central es el DOBLE (2*x*3).' }
    ],
    hint: '(a+b)^2 = a^2 + 2ab + b^2'
  },
  {
    id: 'fq2',
    difficulty: 'MEDIUM',
    text: 'INVERSA: Factoriza x^2 - 49',
    options: [
      { id: 'a', text: '(x - 7)^2', isCorrect: false, feedback: 'ERROR. Eso daría x^2 - 14x + 49.' },
      { id: 'b', text: '(x + 7)(x - 7)', isCorrect: true, feedback: 'CORRECTO. Es una Suma por Diferencia.' },
      { id: 'c', text: '(x + 49)(x - 1)', isCorrect: false, feedback: 'ERROR.' }
    ],
    hint: 'Es una Diferencia de Cuadrados: a^2 - b^2 = (a+b)(a-b)'
  }
];
