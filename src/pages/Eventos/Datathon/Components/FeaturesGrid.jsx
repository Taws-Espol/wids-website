import React from 'react';
// Importamos el ícono específico de la librería react-icons
import { BsClipboardPulse } from 'react-icons/bs';

// --- ESTRUCTURA DE DATOS ---
// Define los datos para cada tarjeta. Así es fácil añadir, quitar o modificar elementos.
const featuresData = [
  {
    title: 'Predicción Temprana',
    subtitle: 'Factores Demográficos y Ambientales',
    color: 'orange', // Corresponde a una de nuestras variantes de color
  },
  {
    title: 'Análisis Predictivo',
    subtitle: 'Modelos de Machine Learning',
    color: 'cyan',
  },
  {
    title: 'Visualización de Datos',
    subtitle: 'Dashboards Interactivos',
    color: 'yellow',
  },
  {
    title: 'Reportes Automatizados',
    subtitle: 'Generación de Informes de Salud',
    color: 'green',
  },
];

// --- DEFINICIÓN DE ESTILOS ---
// Objeto para manejar las variantes de color de forma limpia y escalable.
const colorVariants = {
  orange: {
    bg: 'bg-orange-100',
    border: 'border-orange-300',
    icon: 'text-orange-500',
  },
  cyan: {
    bg: 'bg-cyan-100',
    border: 'border-cyan-300',
    icon: 'text-cyan-500',
  },
  yellow: {
    bg: 'bg-yellow-100',
    border: 'border-yellow-300',
    icon: 'text-yellow-500',
  },
  green: {
    bg: 'bg-green-100',
    border: 'border-green-300',
    icon: 'text-green-500',
  },
};

/**
 * Componente para la tarjeta de característica individual (Ícono + Texto)
 * @param {{ title: string, subtitle: string, color: 'orange'|'cyan'|'yellow'|'green' }} props
 */
function FeatureCard({ title, subtitle, color = 'cyan' }) {
  const styles = colorVariants[color] || colorVariants.cyan;

  return (
    <div className="flex items-center gap-5">
      {/* Contenedor del Ícono con efecto de apilado */}
      <div className="relative flex-shrink-0">
        <div
          className={`absolute left-1.5 top-1.5 h-20 w-20 rounded-lg ${styles.bg} ${styles.border} border-2`}
        ></div>
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-lg bg-white ${styles.border} border-2`}
        >
          <BsClipboardPulse size={40} className={styles.icon} />
        </div>
      </div>

      {/* Contenedor del Texto */}
      <div>
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

/**
 * Componente principal que renderiza la rejilla de características
 */
export default function FeaturesGrid() {
  return (
    <div className="mx-auto w-full max-w-4xl p-8">
      <div className="grid grid-cols-1 gap-x-24 gap-y-12 md:grid-cols-2">
        {featuresData.map((feature, index) => (
          // El elemento en la posición 1 (arriba a la derecha) se empuja hacia abajo en pantallas grandes para crear el efecto escalonado
          <div key={index} className={index === 1 ? 'md:mt-16' : ''}>
            <FeatureCard
              title={feature.title}
              subtitle={feature.subtitle}
              color={feature.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
