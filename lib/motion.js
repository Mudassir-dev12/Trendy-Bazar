// Reusable Framer Motion variants & motion utilities for Trendy Bazaar

export const springTactile = {
  type: "spring",
  stiffness: 400,
  damping: 25
};

export const springBounce = {
  type: "spring",
  stiffness: 300,
  damping: 15
};

export const springSmooth = {
  type: "spring",
  stiffness: 200,
  damping: 20
};

// Global fade up variant
export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
  }
};

// Fade in variant
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.25, ease: "easeInOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Staggered container variant for lists/grids
export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05
    }
  }
};

// Scale in variant
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTactile
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 }
  }
};

// Pop-in with overshoot for badges / icons
export const popIn = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springBounce
  }
};

// Slide in right drawer variant
export const slideInRight = {
  hidden: { x: "100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 350, damping: 32 }
  },
  exit: {
    x: "100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// Slide in left drawer variant
export const slideInLeft = {
  hidden: { x: "-100%", opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 350, damping: 32 }
  },
  exit: {
    x: "-100%",
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" }
  }
};

// Micro-interaction button props
export const buttonPressProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.96 },
  transition: springTactile
};
