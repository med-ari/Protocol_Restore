
import { SectorData, SectorId } from '../types';
import { 
  INTEGERS_QUIZ, 
  RATIONALS_QUIZ, 
  PERCENTAGES_QUIZ, 
  POWERS_QUIZ, 
  ROOTS_QUIZ, 
  LINEAR_QUIZ, 
  MINI_TEST_QUESTIONS,
  ALGEBRAIC_QUIZ,
  FACTORIZATION_QUIZ
} from './quizBank';

export const SECTORS_DATA: Record<SectorId, SectorData> = {
  // ... (Existing sectors remain unchanged: integers, rationals, percentages, powers, roots, mini_test_numbers, linear_functions)
  integers: {
    id: 'integers',
    moduleId: 'm1_numbers',
    name: 'CÁMARAS DE CRYO-SUEÑO [ℤ]',
    symbol: 'ℤ',
    description: 'Regulación térmica y coordenadas de navegación.',
    hook: {
      title: 'FALLO CRÍTICO EN SECTOR CRYO',
      message: 'Comandante, los sistemas de soporte vital han fallado. La temperatura está oscilando peligrosamente. Los números naturales (1, 2, 3) no son suficientes para describir el descenso bajo cero. Debemos inicializar el protocolo de Números Enteros (ℤ) para estabilizar las cámaras.'
    },
    lab: {
      type: 'thermometer',
      instruction: 'INSTRUCCIÓN: Las cámaras requieren una temperatura exacta de -5°C para preservar a la tripulación. Usa los controles para ajustar la temperatura actual (0°C) al objetivo.',
      targetValue: -5,
      initialValue: 0,
      unit: '°C',
      hint: 'Recuerda: Descender es restar. Ascender es sumar.'
    },
    manual: {
      title: 'MANUAL TÉCNICO: ENTEROS (ℤ)',
      hint: 'Estudia la Ley de Signos antes de proceder.',
      sections: [
        {
          title: '1. El Conjunto Z (Navegación)',
          content: 'Los números enteros son la base de nuestra navegación. Imagina la recta numérica como un ascensor:\n- **Positivos (+):** Subir pisos (Ganancia, Derecha, Arriba).\n- **Cero (0):** Nivel del suelo (Origen, Equilibrio).\n- **Negativos (-):** Bajar al sótano (Pérdida, Izquierda, Abajo, Bajo Cero).'
        },
        {
          title: '2. Operaciones y Choque de Signos',
          content: 'Cuando dos signos se encuentran, interactúan:\n- **Suma de Igual Signo:** Se potencian. **(-3) + (-2) = -5** (Bajas 3 y bajas 2 más).\n- **Suma de Distinto Signo:** Luchan. **(-10) + 3 = -7** (Gana el negativo porque es mayor).\n- **Resta de Negativo:** Es una doble negación que se vuelve positiva. **5 - (-3)** es como "quitar una deuda", por lo tanto, ganas. **5 + 3 = 8**.'
        },
        {
          title: '3. Regla de Oro: Multiplicación',
          content: 'Para multiplicar o dividir, usa la ley de los signos:\n+ por + = + (Amigo de mi amigo es mi amigo)\n- por - = + (Enemigo de mi enemigo es mi amigo)\n+ por - = - (Amigo de mi enemigo es mi enemigo)'
        },
        {
          title: '⚠️ TRAMPA COMÚN PAES',
          content: 'No confundas el signo de la operación con el signo del número.\n**-4 - 5** es una SUMA de negativos (resultado **-9**).\n**(-4) * (-5)** es una MULTIPLICACIÓN (resultado **20**).\nSólo se usa "menos por menos más" cuando se multiplica o hay paréntesis juntos.'
        }
      ],
      glossary: [
        { term: 'Valor Absoluto', definition: 'La distancia al cero. |-5| = 5. Nunca es negativo.', example: 'La distancia a la base es 5km, sin importar la dirección.' },
        { term: 'Inverso Aditivo', definition: 'El número opuesto que al sumarse da 0.', example: '5 + (-5) = 0' }
      ],
      recallQuestions: [
        { question: '¿Cuál es el resultado de -5 - (-5)?', answer: '0' },
        { question: '¿Qué signo tiene el producto de 3 números negativos?', answer: 'Negativo (- * - = +, luego + * - = -)' }
      ],
      learnMore: {
        title: 'ESTRATEGIA: POTENCIAS NEGATIVAS',
        content: 'Cuidado: **-3^2** es diferente a **(-3)^2**.\n**-3^2** = -(3*3) = **-9** (El signo está fuera)\n**(-3)^2** = (-3)*(-3) = **9** (El signo es parte de la base)'
      }
    },
    mission: {
      title: 'MISION: RESCATE DE DRON',
      description: 'Un dron de reparación ha perdido el control de altitud. Calcula su posición final basándote en los registros de movimiento para recuperarlo.',
      hint: 'Sigue el orden de los eventos. El punto de partida es el resultado del paso anterior.',
      steps: [
        { 
          id: 's1', 
          label: 'FASE 1: El dron desciende 12 metros desde la esclusa (Nivel 0).\nOperación: 0 - 12', 
          correctValue: -12, 
          placeholder: 'Profundidad (m)',
          errorFeedback: 'Si estás en 0 y bajas 12, llegas a -12.'
        },
        { 
          id: 's2', 
          label: 'FASE 2: Una corriente térmica lo empuja 5 metros hacia arriba.\nOperación: Posición Actual + 5', 
          correctValue: -7, 
          placeholder: 'Profundidad (m)',
          errorFeedback: 'Estás en -12. Subir 5 te acerca al cero: -12 + 5 = -7.'
        },
        { 
          id: 's3', 
          label: 'FASE 3: Fallo de motor. Cae 9 metros adicionales.\nOperación: Posición Actual - 9', 
          correctValue: -16, 
          placeholder: 'Profundidad Final (m)',
          errorFeedback: 'Estás en -7. Caer 9 más te aleja del cero: -7 - 9 = -16.'
        }
      ]
    },
    quiz: {
      hint: 'Visualiza la recta numérica para evitar errores de signo.',
      questions: INTEGERS_QUIZ
    },
    outro: 'TEMPERATURA ESTABILIZADA. SISTEMAS CRYO ONLINE.'
  },
  rationals: {
    id: 'rationals',
    moduleId: 'm1_numbers',
    name: 'DEPÓSITO DE COMBUSTIBLE [Q]',
    symbol: 'Q',
    description: 'Mezcla de fluidos y gestión de recursos fragmentados.',
    hook: {
      title: 'ERROR DE MEZCLA',
      message: 'Los tanques de combustible están desequilibrados. Tenemos cantidades fraccionadas de Hidrógeno y Plasma. El sistema no puede procesar "pedazos" de información a menos que uses el protocolo de Racionales (Q) para unificar las medidas.'
    },
    lab: {
      type: 'fraction-bar',
      instruction: 'INSTRUCCIÓN: El motor requiere una mezcla exacta de 3/4 (0.75) de pureza. Tienes contenedores de 1/4. Activa los necesarios para alcanzar el nivel.',
      targetValue: 0.75,
      initialValue: 0,
      unit: '',
      hint: 'Cada bloque representa 0.25 (un cuarto).'
    },
    manual: {
      title: 'MANUAL: RACIONALES (Q)',
      hint: 'Recuerda: El denominador indica el tamaño del corte.',
      sections: [
        {
          title: '1. Definición y Visualización',
          content: 'Una fracción **a/b** es una división pendiente.\n- **Denominador (b):** En cuántos trozos cortaste el pastel.\n- **Numerador (a):** Cuántos trozos tomaste.\n**1/2** es mayor que **1/4** porque cortaste el pastel en menos trozos (son más grandes).'
        },
        {
          title: '2. Suma y Resta (El error fatal)',
          content: '¡CRÍTICO! **No puedes sumar peras con manzanas.**\nNo sumes **1/2 + 1/3** directamente porque los trozos son de distinto tamaño. Debes buscar el **MCM** para cortar ambos en trozos iguales (sextos).\n3/6 + 2/6 = 5/6.'
        },
        {
          title: '3. Decimales: La otra cara',
          content: 'Toda fracción es un decimal. Para obtenerlo, DIVIDE el numerador por el denominador.\n**1/2** = 1 ÷ 2 = **0.5**\n**1/3** = 1 ÷ 3 = **0.333...** (Infinito Periódico)'
        },
        {
          title: '4. Operaciones Rápidas',
          content: '- **Multiplicar:** Directo hacia el lado. **(a/b) * (c/d) = ac / bd**.\n- **Dividir:** Multiplica cruzado o invierte la segunda. **(a/b) : (c/d) = (a/b) * (d/c)**.'
        }
      ],
      glossary: [
        { term: 'Mínimo Común Múltiplo (MCM)', definition: 'El número más pequeño que contiene a dos denominadores. Esencial para sumar fracciones.', example: 'MCM de 4 y 6 es 12.' },
        { term: 'Simplificar', definition: 'Dividir arriba y abajo por el mismo número para reducir la fracción.', example: '4/8 se simplifica a 1/2.' }
      ],
      recallQuestions: [
        { question: '¿Cómo se divide una fracción?', answer: 'Multiplicando por el inverso de la segunda fracción.' },
        { question: '¿Qué es 0.25 expresado como fracción?', answer: '1/4' }
      ],
      learnMore: {
        title: 'ESTRATEGIA PAES: LA PALABRA "DE"',
        content: 'Cuando leas "la mitad **DE** la tercera parte **DE**...", reemplaza "DE" por un signo de multiplicación (*).\n1/2 * 1/3 = 1/6.'
      }
    },
    mission: {
      title: 'MISION: RECUPERACIÓN DE DATOS',
      description: 'Un virus borró parte de nuestro mapa estelar. Solo nos quedan fragmentos. Reconstruye el archivo total.',
      hint: 'La palabra "DE" en matemáticas suele significar MULTIPLICACIÓN.',
      steps: [
        { 
          id: 's1', 
          label: 'TENEMOS: 3/5 del mapa total.\nPERDIDO: El virus borró 2/3 **DE** lo que teníamos.\nCalcula la fracción borrada (2/3 * 3/5). Numerador resultante simplificado:', 
          correctValue: 2, 
          placeholder: 'Numerador',
          errorFeedback: 'Multiplica lineal: 2*3 = 6, 3*5 = 15. Tienes 6/15. Simplifica dividiendo por 3.'
        },
        { 
          id: 's2', 
          label: 'RESTANTE: Teníamos 3/5 y perdimos 2/5 (resultado anterior).\n¿Cuánto queda? (3/5 - 2/5). Numerador:', 
          correctValue: 1, 
          placeholder: 'Numerador',
          errorFeedback: 'Resta simple de igual denominador: 3 - 2 = 1. Queda 1/5.'
        }
      ]
    },
    quiz: {
      hint: 'Simplifica siempre que sea posible.',
      questions: RATIONALS_QUIZ
    },
    outro: 'MEZCLA DE COMBUSTIBLE ÓPTIMA. MOTORES AL 100%.'
  },
  percentages: {
    id: 'percentages',
    moduleId: 'm1_numbers',
    name: 'GENERADOR DE ESCUDOS [%]',
    symbol: '%',
    description: 'Eficiencia energética y factores de variación.',
    hook: {
      title: 'ESCUDOS INESTABLES',
      message: 'La eficiencia del escudo fluctúa. Un reporte indica que la energía bajó un 50% y luego subió un 50%. La tripulación cree que estamos al 100%, pero mis cálculos indican un error fatal. Necesitamos el protocolo de Porcentajes para ver la realidad.'
    },
    lab: {
      type: 'shield-slider',
      instruction: 'INSTRUCCIÓN: El escudo está al 20%. Sube la potencia hasta el rango óptimo (80%). Evita la sobrecarga (100%).',
      targetValue: 80,
      initialValue: 20,
      unit: '%',
      hint: 'Mueve el deslizador con cuidado.'
    },
    manual: {
      title: 'MANUAL: PORCENTAJES',
      hint: 'El total siempre es el 100%.',
      sections: [
        {
          title: '1. Concepto Básico (Ver Batería)',
          content: 'El porcentaje es solo una fracción con denominador 100. **20%** es **20/100**, que simplificado es **1/5** o **0.2**.\nPara calcular el 30% de 500, multiplica 500 * 0.30.'
        },
        {
          title: '⚠️ LA TRAMPA DE LA REVERSIBILIDAD',
          content: 'Si aumentas una cantidad en un % y luego la disminuyes en el mismo %, **¡NO vuelves al inicio!**\nEjemplo: 100 + 50% = 150. Ahora quita el 50% de 150 (que es 75). Quedas en 75. Perdiste valor.'
        },
        {
          title: '3. Factores Multiplicativos (Velocidad)',
          content: 'En la PAES, no uses regla de tres para todo. Usa factores directos:\n- Aumentar en 19% => Multiplicar por **1.19**\n- Descontar 30% => Multiplicar por **0.70** (porque pagas el 70%).'
        }
      ],
      glossary: [
        { term: 'Interés Compuesto', definition: 'Interés sobre interés. El dinero crece más rápido cada ciclo.', example: 'C_final = C_inicial * (1+tasa)^tiempo' }
      ],
      recallQuestions: [
        { question: 'Si algo cuesta $100 y sube 50%, ¿cuánto vale?', answer: '$150' },
        { question: '¿Cuál es el factor para un descuento del 30%?', answer: '0.70' }
      ],
      learnMore: {
        title: 'TÉCNICA AVANZADA: REGLA DE TRES INVERSA',
        content: 'Problema: "Pagué $800 y tenía un 20% de descuento. ¿Cuál era el precio original?".\nError común: Calcular el 20% de 800 y sumarlo. ¡MAL!\nSolución: 800 representa el 80% (0.8). Divide **800 / 0.8 = 1000**.'
      }
    },
    mission: {
      title: 'MISION: RECALIBRACIÓN ENERGÉTICA',
      description: 'El núcleo de energía ha sufrido variaciones. Calcula la carga real final tras los eventos reportados.',
      hint: 'Multiplica los factores de variación en cadena.',
      steps: [
        { 
          id: 's1', 
          label: 'ESTADO INICIAL: 100 MegaWatts.\nEVENTO A: Daño reduce energía en 20%.\nCalcula energía restante (100 * 0.8).', 
          correctValue: 80, 
          placeholder: 'MW',
          errorFeedback: 'Si pierdes 20%, te queda el 80%. 100 * 0.8 = 80.'
        },
        { 
          id: 's2', 
          label: 'EVENTO B: Reparación de emergencia aumenta la energía actual (80 MW) en un 20%.\nCalcula final (80 * 1.2).', 
          correctValue: 96, 
          placeholder: 'MW',
          errorFeedback: 'El 20% de 80 es 16. 80 + 16 = 96. Nota que NO volvemos a 100.'
        }
      ]
    },
    quiz: {
      hint: 'Usa decimales para calcular más rápido.',
      questions: PERCENTAGES_QUIZ
    },
    outro: 'ESCUDOS ESTABLES. VARIACIONES COMPENSADAS.'
  },
  powers: {
    id: 'powers',
    moduleId: 'm1_numbers',
    name: 'REACTOR DE FUSIÓN [^n]',
    symbol: '^n',
    description: 'Crecimiento exponencial y notación científica.',
    hook: {
      title: 'FUGA DE RADIACIÓN',
      message: 'Detectamos una bacteria alienígena en el reactor. Se duplica cada segundo. El crecimiento no es lineal, es exponencial. Si no calculamos la saturación exacta usando Potencias, la nave será consumida en minutos.'
    },
    lab: {
      type: 'power-growth',
      instruction: 'INSTRUCCIÓN: Simula el crecimiento de la colonia. Ajusta la base y el exponente para igualar la lectura de los sensores: 32 unidades.',
      targetValue: 32,
      initialValue: 1,
      unit: 'Unidades',
      hint: 'Prueba con base 2. 2*2*2...'
    },
    manual: {
      title: 'MANUAL: POTENCIAS',
      hint: 'Multiplicar potencias de igual base suma exponentes.',
      sections: [
        {
          title: '1. Anatomía de una Potencia',
          content: '**Base^Exponente**. El exponente manda a la base multiplicarse por sí misma. 5^3 = 5*5*5 = 125.\n¡OJO! 5^3 **NO es 15** (5*3).'
        },
        {
          title: '2. Propiedades Fundamentales',
          content: '- **Mult. Igual Base:** Se SUMAN exponentes. x^2 * x^3 = x^5.\n- **Div. Igual Base:** Se RESTAN exponentes. x^5 / x^2 = x^3.\n- **Potencia de Potencia:** Se MULTIPLICAN exponentes. (x^2)^3 = x^6.'
        },
        {
          title: '3. El Exponente Negativo',
          content: 'Un exponente negativo NO hace al número negativo. Le da la orden de **"invertirse"** (darse vuelta).\n2^-1 = 1/2.\n(3/4)^-2 = (4/3)^2 = 16/9.'
        },
        {
          title: '4. Signos en la Base',
          content: '- Base negativa con exponente **PAR** = Resultado **Positivo** (-2)^2 = 4.\n- Base negativa con exponente **IMPAR** = Resultado **Negativo** (-2)^3 = -8.'
        }
      ],
      glossary: [
        { term: 'Base', definition: 'El número que se multiplica.', example: 'En 5^2, la base es 5.' },
        { term: 'Notación Científica', definition: 'Forma de escribir números gigantes o diminutos usando potencias de 10.', example: '3 x 10^8' }
      ],
      recallQuestions: [
        { question: '¿Cuánto es todo número elevado a 0?', answer: '1 (excepto 0^0).' },
        { question: 'Simplifica a^5 / a^2', answer: 'a^3' }
      ],
      learnMore: {
        title: 'TABLA DE MEMORIA RÁPIDA',
        content: 'Memoriza las potencias de 2 para la PAES:\n2^1=2, 2^2=4, 2^3=8, 2^4=16, 2^5=32, 2^6=64, 2^7=128, 2^8=256, 2^9=512, 2^10=1024.'
      }
    },
    mission: {
      title: 'MISION: CONTENCIÓN BIOLÓGICA',
      description: 'Calcula la población futura de la amenaza biológica para configurar los láseres de esterilización.',
      hint: 'Usa la fórmula: Inicial * Crecimiento^Tiempo',
      steps: [
        { 
          id: 's1', 
          label: 'CICLOS: La bacteria se triplica cada hora. Han pasado 3 horas.\nCalcula el factor de crecimiento (3^3).', 
          correctValue: 27, 
          placeholder: 'Factor',
          errorFeedback: '3*3*3 = 27. No es 9.'
        },
        { 
          id: 's2', 
          label: 'POBLACIÓN: Había 100 bacterias inicialmente.\nCalcula el total (100 * 27).', 
          correctValue: 2700, 
          placeholder: 'Total Bacterias',
          errorFeedback: 'Multiplicación simple: 2700.'
        }
      ]
    },
    quiz: {
      hint: 'Cuidado con los signos en las potencias.',
      questions: POWERS_QUIZ
    },
    outro: 'REACTOR PURGADO. NIVELES DE ENERGÍA NOMINALES.'
  },
  roots: {
    id: 'roots',
    moduleId: 'm1_numbers',
    name: 'SISTEMA DE ESCÁNER [√]',
    symbol: '√',
    description: 'Cálculo de distancias y superficies (Raíces).',
    hook: {
      title: 'TERRENO DESCONOCIDO',
      message: 'El escáner planetario ha detectado una zona de aterrizaje cuadrada de Área 50. Para calibrar los propulsores, necesitamos saber la longitud exacta del lado. El valor es irracional (no exacto), por lo que debemos usar Raíces para descomponerlo.'
    },
    lab: {
      type: 'root-square',
      instruction: 'INSTRUCCIÓN: El área escaneada es de 25 km². Ajusta el deslizador para encontrar la longitud del lado del cuadrado.',
      targetValue: 5,
      initialValue: 1,
      unit: 'km',
      hint: '¿Qué número multiplicado por sí mismo da 25?'
    },
    manual: {
      title: 'MANUAL: RAÍCES',
      hint: 'La raíz es lo opuesto a la potencia.',
      sections: [
        {
          title: '1. Conexión Geométrica (Lado vs Área)',
          content: 'La raíz cuadrada responde a la pregunta: "Si tengo un cuadrado de área X, ¿cuánto mide su lado?".\n√36 = 6 porque 6*6=36.'
        },
        {
          title: '2. Descomposición de Raíces',
          content: 'Muchas raíces no son exactas (Irracionales), pero se pueden simplificar buscando cuadrados perfectos dentro.\n√50 = √(25*2) = √25 * √2 = **5√2**.\n√12 = √(4*3) = **2√3**.'
        },
        {
          title: '3. Operaciones Permitidas',
          content: '- **Multiplicar:** Se puede juntar todo bajo una raíz. √2 * √3 = √6.\n- **Sumar:** PROHIBIDO sumar interiores. **√9 + √16** = 3 + 4 = 7. Pero **√(9+16)** = √25 = 5. Son distintos.'
        }
      ],
      glossary: [
        { term: 'Irracional', definition: 'Número con decimales infinitos sin patrón. Las raíces no exactas (√2, √3) son irracionales.', example: 'π, √2' }
      ],
      recallQuestions: [
        { question: '¿Es √ (a+b) igual a √a + √b?', answer: 'NO. Nunca.' },
        { question: '¿Cuánto es √144?', answer: '12' }
      ],
      learnMore: {
        title: 'TÉCNICA: RACIONALIZAR',
        content: 'En las opciones de la PAES nunca verás una raíz abajo (1/√2). Debes "subirla" multiplicando por sí misma. 1/√2 se convierte en **√2/2**.'
      }
    },
    mission: {
      title: 'MISION: ATERRIZAJE DE PRECISIÓN',
      description: 'Calcula el perímetro de la zona de aterrizaje descomponiendo el área.',
      hint: 'Descompón la raíz en un cuadrado perfecto y un primo.',
      steps: [
        { 
          id: 's1', 
          label: 'ÁREA: 50. Calcula el lado (√50). Descompón √50 en factor cuadrado (25) y resto (2).\nCoeficiente entero:', 
          correctValue: 5, 
          placeholder: 'El número fuera de la raíz',
          errorFeedback: '√50 = √(25*2) = 5√2. El coeficiente es 5.'
        },
        { 
          id: 's2', 
          label: 'PERÍMETRO: Un cuadrado tiene 4 lados. Multiplica el lado (5√2) por 4.\nCoeficiente final:', 
          correctValue: 20, 
          placeholder: 'Coeficiente de √2',
          errorFeedback: '4 * 5√2 = 20√2.'
        }
      ]
    },
    quiz: {
      hint: 'Agrupa términos semejantes.',
      questions: ROOTS_QUIZ
    },
    outro: 'ZONA ESCANEADA. ATERRIZAJE SEGURO.'
  },
  mini_test_numbers: {
    id: 'mini_test_numbers',
    moduleId: 'm1_numbers',
    name: 'SIMULACIÓN DE COMBATE M1',
    symbol: 'M1',
    description: 'Prueba integradora de todos los sistemas numéricos.',
    hook: {
      title: 'BATALLA FINAL DEL SECTOR',
      message: 'Has restaurado todos los subsistemas. A.L.I. ha compilado una simulación de combate basada en registros históricos de la PAES. Responde correctamente para certificar el Módulo.'
    },
    lab: { type: 'none', instruction: '', targetValue: 0, initialValue: 0, unit: '', hint: '' },
    manual: { 
      title: 'RESUMEN TÁCTICO M1',
      hint: 'Este es tu arsenal completo.',
      sections: [
        { title: 'Z (Enteros)', content: 'Signos iguales suman, distintos restan. Cuidado con doble negativo.' },
        { title: 'Q (Racionales)', content: 'Suma: MCM. Mult: Lado. Div: Cruzado.' },
        { title: '% (Porcentajes)', content: 'Son decimales. 50% = 0.5. No reversibles.' },
        { title: 'Potencias', content: 'Suma exponentes al multiplicar. Exponente negativo invierte.' },
        { title: 'Raíces', content: 'Descomponer en factores cuadrados. No sumar interiores.' }
      ]
    },
    mission: { title: '', description: '', steps: [], hint: '' },
    quiz: {
      hint: 'Lee bien el enunciado antes de calcular.',
      questions: MINI_TEST_QUESTIONS
    },
    outro: 'CERTIFICACIÓN M1 COMPLETADA. ACCESO A ÁLGEBRA CONCEDIDO.'
  },

  linear_functions: {
    id: 'linear_functions',
    moduleId: 'm2_algebra',
    name: 'TRAYECTORIA LINEAL [f(x)]',
    symbol: 'f(x)',
    description: 'Navegación vectorial y predicción de rutas.',
    hook: {
      title: 'SISTEMA DE NAVEGACIÓN DAÑADO',
      message: 'COMANDANTE, los motores funcionan, pero el computador de trayectoria está frito. Debemos calcular manualmente la ruta de escape a través del campo de escombros. Una línea recta mal calculada nos estrellará contra los asteroides.'
    },
    lab: {
      type: 'linear-graph',
      instruction: 'CALIBRACIÓN VECTORIAL: Ajusta la Pendiente (m) y el Coeficiente de Posición (n) para que la trayectoria de la nave intercepte el objetivo en las coordenadas (3, 5).',
      targetValue: 5, 
      initialValue: 0,
      unit: 'Coord Y',
      hint: 'La fórmula es f(x) = mx + n. Si x=3, busca m y n tal que 3m + n = 5.'
    },
    manual: {
      title: 'MANUAL: FUNCIÓN AFÍN Y LINEAL',
      hint: 'f(x) = mx + n es tu mapa estelar.',
      sections: [
        {
          title: '1. La Ecuación de la Recta',
          content: 'Toda línea recta en el espacio se define como **f(x) = mx + n**.\n- **m (Pendiente):** Es la inclinación o velocidad. Si es positiva, sube; si es negativa, baja.\n- **n (Coeficiente de Posición):** Es el punto de partida en el eje vertical (Y) cuando x=0.'
        },
        {
          title: '2. Evaluar una Función',
          content: 'Para saber dónde estará la nave en el tiempo x, reemplaza la x en la fórmula.\nEjemplo: f(x) = 2x + 1.\nSi x = 3 horas, entonces **f(3) = 2(3) + 1 = 7**.\nLa nave estará en la posición 7.'
        },
        {
          title: '3. Tipos de Funciones',
          content: '- **Lineal:** f(x) = mx (Pasa por el origen 0,0).\n- **Afín:** f(x) = mx + n (No pasa por el origen).\n- **Constante:** f(x) = n (Línea horizontal, no sube ni baja).'
        }
      ],
      recallQuestions: [
        { question: "¿Qué representa 'n' en f(x) = mx + n?", answer: "El corte con el eje Y (donde empieza la recta)." },
        { question: "¿Qué pasa si 'm' es negativo?", answer: "La función es decreciente (va hacia abajo)." }
      ],
      learnMore: {
        title: 'ARCHIVO CLASIFICADO: PENDIENTE',
        content: 'La pendiente (m) es la razón de cambio. m = (y2 - y1) / (x2 - x1). Es cuánto subes dividido por cuánto avanzas.'
      }
    },
    mission: {
      title: 'MISION: EVASIÓN DE ESCOMBROS',
      description: 'Calcula las coordenadas de impacto para tres asteroides en nuestra ruta.',
      hint: 'Reemplaza el valor de X en la función dada.',
      steps: [
        { 
          id: 's1', 
          label: 'ASTEROIDE A (x=2):\nTrayectoria: f(x) = 3x - 1.\nCalcular posición Y.', 
          correctValue: 5, 
          placeholder: 'Coord Y', 
          errorFeedback: 'Reemplaza x por 2: 3(2) - 1 = 6 - 1.' 
        },
        { 
          id: 's2', 
          label: 'ASTEROIDE B (x=4):\nTrayectoria: g(x) = -2x + 10.\nCalcular posición Y.', 
          correctValue: 2, 
          placeholder: 'Coord Y', 
          errorFeedback: 'Cuidado con el negativo: -2(4) + 10 = -8 + 10.' 
        },
        { 
          id: 's3', 
          label: 'INTERSECCIÓN (Igualación):\n¿En qué Km (x) se cruzan f(x)=x+2 y g(x)=6-x?\nx + 2 = 6 - x', 
          correctValue: 2, 
          placeholder: 'Km (x)', 
          errorFeedback: 'Despeja x: 2x = 4, entonces x = 2.' 
        }
      ]
    },
    quiz: {
      hint: 'Visualiza la gráfica.',
      questions: LINEAR_QUIZ
    },
    outro: 'RUTA TRAZADA CON ÉXITO. SALIENDO DEL CAMPO DE ASTEROIDES.'
  },

  algebraic_expressions: {
    id: 'algebraic_expressions',
    moduleId: 'm2_algebra',
    name: 'CLASIFICADOR DE CARGA [XY]',
    symbol: 'XY',
    description: 'Manipulación de variables y reducción de términos semejantes.',
    hook: {
      title: 'BODEGA DESORGANIZADA',
      message: 'El sistema de carga automática ha mezclado los contenedores de Suministros (x) con los de Repuestos (y). No podemos despegar con la carga desbalanceada. Usa el protocolo de Expresiones Algebraicas para agrupar los ítems semejantes.'
    },
    lab: {
      type: 'algebra-sorter',
      instruction: 'INSTRUCCIÓN: Simplifica la carga. Agrupa las cajas del mismo tipo. Tu objetivo es obtener la expresión final: 4x + 2y.',
      targetValue: 0, // Not used directly, specific lab logic handles checking 4x + 2y
      initialValue: 0,
      unit: '',
      hint: 'Solo puedes sumar x con x, e y con y.'
    },
    manual: {
      title: 'MANUAL: ÁLGEBRA BÁSICA',
      hint: 'Suma peras con peras.',
      sections: [
        {
          title: '1. Términos Semejantes',
          content: 'Dos términos son semejantes si tienen la MISMA letra (variable) con el MISMO exponente. \n- **2x** y **5x** son semejantes.\n- **2x** y **2y** NO lo son.'
        },
        {
          title: '2. Reducción',
          content: 'Para simplificar, suma o resta los coeficientes (números) de los términos semejantes y mantén la letra.\n**3x + 2x = 5x**.\n**3x + 2y** queda igual (no se puede mezclar).'
        },
        {
          title: '3. Paréntesis',
          content: 'Si hay un signo menos antes de un paréntesis, cambia el signo de TODO lo de adentro.\n**-(2x - 3) = -2x + 3**.'
        }
      ],
      recallQuestions: [
        { question: '¿Cuánto es 2x + 3x?', answer: '5x' },
        { question: '¿Son 2x^2 y 2x semejantes?', answer: 'NO. Tienen distinto exponente.' }
      ],
      learnMore: {
        title: 'ESTRATEGIA: EVALUACIÓN',
        content: 'Si te piden el valor de una expresión "cuando x=2", simplemente reemplaza todas las x por un (2) y calcula.'
      }
    },
    mission: {
      title: 'MISION: INVENTARIO DE EMERGENCIA',
      description: 'Calcula el stock total sumando los lotes dispersos.',
      hint: 'Agrupa por tipo de material.',
      steps: [
        { 
          id: 's1', 
          label: 'LOTE A: 5 cajas de metal (x).\nLOTE B: 3 cajas de metal (x).\nSuma los lotes (5x + 3x). Coeficiente:', 
          correctValue: 8, 
          placeholder: 'Coeficiente de x',
          errorFeedback: '5 + 3 = 8.'
        },
        { 
          id: 's2', 
          label: 'PERDIDA: Se cayeron 2 cajas de metal (x).\nResta del total anterior (8x - 2x). Coeficiente:', 
          correctValue: 6, 
          placeholder: 'Coeficiente de x',
          errorFeedback: '8 - 2 = 6.'
        }
      ]
    },
    quiz: {
      hint: 'No mezcles letras distintas.',
      questions: ALGEBRAIC_QUIZ
    },
    outro: 'CARGA ORGANIZADA Y ASEGURADA. LISTOS PARA EL DESPEGUE.'
  },

  factorization: {
    id: 'factorization',
    moduleId: 'm2_algebra',
    name: 'INGENIERÍA INVERSA [ ( )² ]',
    symbol: '( )²',
    description: 'Productos notables y descomposición de estructuras.',
    hook: {
      title: 'BRECHA EN EL CASCO',
      message: 'Hemos detectado una brecha en el casco con una forma geométrica compleja. Para fabricar el parche exacto, necesitamos entender su área expandida y encontrar sus dimensiones originales (lados) usando Factorización.'
    },
    lab: {
      type: 'factor-area',
      instruction: 'INSTRUCCIÓN: El parche debe cubrir un área de x² + 5x + 6. Encuentra las dimensiones (x+a)(x+b) que generan esta área.',
      targetValue: 0, // handled by lab logic
      initialValue: 0,
      unit: '',
      hint: 'Busca dos números que multiplicados den 6 y sumados den 5.'
    },
    manual: {
      title: 'MANUAL: FACTORIZACIÓN',
      hint: 'Convertir sumas en multiplicaciones.',
      sections: [
        {
          title: '1. ¿Qué es Factorizar?',
          content: 'Es el proceso inverso a multiplicar. Es escribir una expresión como producto de factores.\n**x² + 5x + 6** se convierte en **(x+2)(x+3)**.'
        },
        {
          title: '2. Cuadrado de Binomio',
          content: '**Producto Notable:** (a+b)² = a² + 2ab + b².\n**Factorización:** a² + 2ab + b² = (a+b)².\nBusca siempre extremos que sean cuadrados perfectos.'
        },
        {
          title: '3. Suma por Diferencia',
          content: '**(a+b)(a-b) = a² - b²**.\nSi ves una resta de dos cuadrados (x² - 9), se factoriza como la suma por la resta de sus raíces: (x+3)(x-3).'
        }
      ],
      recallQuestions: [
        { question: 'Factoriza x² - 25', answer: '(x+5)(x-5)' },
        { question: 'Desarrolla (x+1)²', answer: 'x² + 2x + 1' }
      ],
      learnMore: {
        title: 'TRUCO: TRINOMIOS',
        content: 'Para x² + bx + c, busca dos números que multiplicados den "c" y sumados den "b".'
      }
    },
    mission: {
      title: 'MISION: FABRICACIÓN DE PARCHE',
      description: 'Calcula las dimensiones necesarias para sellar la brecha.',
      hint: 'Multiplica y suma.',
      steps: [
        { 
          id: 's1', 
          label: 'ANCHO: x + 4\nLARGO: x + 4\nCalcula el área expandida (x+4)². Coeficiente del término central (x):', 
          correctValue: 8, 
          placeholder: 'Coeficiente de x',
          errorFeedback: 'El término central es 2*x*4 = 8x.'
        },
        { 
          id: 's2', 
          label: 'ÁREA FINAL: x² + 8x + 16.\nSi x=2 metros, ¿cuál es el área numérica total?', 
          correctValue: 36, 
          placeholder: 'Metros cuadrados',
          errorFeedback: '(2+4)^2 = 6^2 = 36.'
        }
      ]
    },
    quiz: {
      hint: 'Identifica el patrón (cuadrado perfecto o diferencia).',
      questions: FACTORIZATION_QUIZ
    },
    outro: 'PARCHE ESTRUCTURAL APLICADO. INTEGRIDAD DEL CASCO RESTAURADA.'
  }
};
