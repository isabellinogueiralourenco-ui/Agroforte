import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaBrain, FaMicrochip, FaDrone, FaSatellite, FaRobot, FaDatabase } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const TechnologySection: React.FC = () => {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const technologies = [
    {
      icon: FaBrain,
      title: t('technology.ai'),
      description: 'Algoritmos de IA analisam padrões climáticos, saúde das plantas e otimizam o uso de recursos.',
      benefits: ['Previsões precisas', 'Detecção de pragas', 'Otimização de insumos']
    },
    {
      icon: FaMicrochip,
      title: t('technology.iot'),
      description: 'Sensores inteligentes monitoram umidade, temperatura, pH e nutrientes do solo em tempo real.',
      benefits: ['Monitoramento 24/7', 'Alertas instantâneos', 'Dados precisos']
    },
    {
      icon: FaDrone,
      title: t('technology.drones'),
      description: 'Drones com câmeras multiespectrais mapeiam lavouras e identificam áreas problemáticas.',
      benefits: ['Cobertura completa', 'Imagens de alta resolução', 'Análise rápida']
    },
    {
      icon: FaSatellite,
      title: t('technology.satellite'),
      description: 'Imagens de satélite monitoram grandes áreas e rastreiam evolução das plantações.',
      benefits: ['Visão global', 'Histórico de dados', 'Planejamento estratégico']
    },
    {
      icon: FaRobot,
      title: t('technology.autonomous'),
      description: 'Máquinas autônomas realizam colheita, pulverização e outros trabalhos com precisão.',
      benefits: ['Eficiência operacional', 'Redução de custos', 'Maior segurança']
    },
    {
      icon: FaDatabase,
      title: t('technology.bigdata'),
      description: 'Análise de grandes volumes de dados agrícolas gera insights para melhores decisões.',
      benefits: ['Inteligência competitiva', 'Previsibilidade', 'Rastreabilidade completa']
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="technology" className="py-16 md:py-24 bg-white dark:bg-neutral-dark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('technology.title')}</h2>
          <p className="section-subtitle">
            Conheça as tecnologias inovadoras que estão revolucionando a produção agrícola.
          </p>
        </motion.div>

        {/* Grid of technologies */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {technologies.map((tech, index) => {
            const IconComponent = tech.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                className="card-hover bg-neutral-light dark:bg-gray-800 p-8 rounded-lg shadow-lg border-t-4 border-secondary-sky"
              >
                <div className="mb-4">
                  <IconComponent size={40} className="text-secondary-sky" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark dark:text-primary-light mb-3">
                  {tech.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {tech.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {tech.benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      className="inline-block px-3 py-1 bg-secondary-sky text-white text-xs rounded-full"
                    >
                      {benefit}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default TechnologySection
