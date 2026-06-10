import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaShieldAlt, FaLeaf, FaBarcode, FaCheckCircle, FaStar, FaLock } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'

const BenefitsSection: React.FC = () => {
  const { t } = useTranslation()
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  const benefits = [
    {
      icon: FaShieldAlt,
      title: t('benefits.safety'),
      description: 'Alimentos cultivados com práticas seguras e monitoramento rigoroso de qualidade.'
    },
    {
      icon: FaLeaf,
      title: t('benefits.environment'),
      description: 'Redução de carbono, preservação de água e proteção da biodiversidade local.'
    },
    {
      icon: FaBarcode,
      title: t('benefits.traceability'),
      description: 'Código QR permite rastrear cada produto desde o plantio até sua mesa.'
    },
    {
      icon: FaCheckCircle,
      title: t('benefits.responsibility'),
      description: 'Cadeia de produção transparente e responsável com práticas éticas.'
    },
    {
      icon: FaStar,
      title: t('benefits.quality'),
      description: 'Produtos com maior teor nutricional e sabor superior graças aos cuidados especiais.'
    },
    {
      icon: FaLock,
      title: t('benefits.food_security'),
      description: 'Produção estável e eficiente garantindo segurança alimentar para as gerações futuras.'
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="benefits" className="py-16 md:py-24 bg-neutral-light dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">{t('benefits.title')}</h2>
          <p className="section-subtitle">
            Descubra os benefícios reais de consumir alimentos produzidos de forma sustentável.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="card-hover bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg text-center"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-light to-secondary-sky rounded-full mb-4 mx-auto"
                >
                  <IconComponent size={36} className="text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-primary-dark dark:text-primary-light mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default BenefitsSection
