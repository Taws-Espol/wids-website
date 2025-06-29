import React from 'react';
// Usar react-icons que ya está instalado
import { FaBrain, FaClock } from 'react-icons/fa';
import { BsBarChartFill, BsFileEarmarkText } from 'react-icons/bs';
// --- ESTRUCTURA DE DATOS ---
// Define los datos para cada tarjeta con sus iconos correspondientes
const featuresData = [
  {
    title: 'Predicción Temprana',
    subtitle: 'Detección anticipada de necesidad de tratamiento en mujeres',
    color: 'orange',
    icon: FaClock, // ⏱️ Predicción Temprana
  },
  {
    title: 'Análisis Predictivo',
    subtitle:
      'Uso de ML para identificar condiciones como TDAH desde imágenes cerebrales',
    color: 'cyan',
    icon: FaBrain, // 🧠📊 Análisis Predictivo
  },
  {
    title: 'Visualización de Datos',
    subtitle: 'Exploración de patrones cerebrales según etapa de vida',
    color: 'yellow',
    icon: BsBarChartFill, // 📈 Visualización de Datos
  },
  {
    title: 'Reportes Automatizados',
    subtitle: 'Generación de reportes con predicciones clínicas personalizadas',
    color: 'green',
    icon: BsFileEarmarkText, // 📄⚙️ Reportes Automatizados
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
 * @param {{ title: string, subtitle: string, color: 'orange'|'cyan'|'yellow'|'green', icon: Component }} props
 */
function FeatureCard({ title, subtitle, color = 'cyan', icon: Icon }) {
  const styles = colorVariants[color] || colorVariants.cyan;

  return (
    // Volvemos a items-center como estaba originalmente
    <div className="flex items-center gap-5">
      {/* Contenedor del Ícono */}
      <div className="relative flex-shrink-0">
        <div
          className={`absolute left-1.5 top-1.5 h-20 w-20 rounded-lg ${styles.bg} ${styles.border} border-2`}
        ></div>
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-lg bg-white ${styles.border} border-2`}
        >
          {/* Solución simple: contenedor con tamaño fijo */}
          <div className="flex h-12 w-12 items-center justify-center">
            {Icon ? (
              <Icon size={28} className={styles.icon} />
            ) : (
              <div className={`h-8 w-8 ${styles.bg} rounded-full`}></div>
            )}
          </div>
        </div>
      </div>

      {/* Contenedor del Texto - sin padding-top */}
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
          <div
            key={index}
            // El escalonado está comentado pero disponible para futuras revisiones:
            // className={
            //   index === 1
            //     ? 'md:mt-8' // Escalonar segundo elemento (arriba derecha)
            //     : index === 2
            //     ? 'md:-mt-8' // Escalonar tercer elemento (abajo izquierda)
            //     : ''
            // }
          >
            <FeatureCard
              title={feature.title}
              subtitle={feature.subtitle}
              color={feature.color}
              icon={feature.icon}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
