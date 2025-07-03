/**
 * @fileoverview Configurações globais da aplicação
 * Centraliza todas as configurações em um só lugar
 */

export const CONFIG = {
    // Configurações de UI
    UI: {
        headerShowThreshold: () => window.innerHeight * 0.8,
        animationDuration: 600,
        loadingDuration: 3000,
        scrollThreshold: 50,
        debounceDelay: 100
    },

    // Configurações de Analytics
    ANALYTICS: {
        scrollDepthQuarters: ['25%', '50%', '75%', '100%'],
        timeMarkers: [30, 60, 120, 300], // segundos
        trackingEvents: {
            PAGE_VIEW: 'page_view',
            CTA_CLICK: 'cta_click',
            FORM_SUBMIT: 'form_submit',
            SCROLL_DEPTH: 'scroll_depth',
            TIME_ON_PAGE: 'time_on_page'
        }
    },

    // Configurações de Formulário
    FORM: {
        validation: {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\d\s\-\+\(\)]+$/,
            minNameLength: 2,
            maxMessageLength: 500
        },
        googleSheetsUrl: 'https://script.google.com/macros/s/AKfycbz8OZshnVdr26pq8uGeulhc41V4eep-JAJ7u5GbCfkqCC2MkV7Y48kxZ7oyZhdnfEO0Qg/exec'
    },

    // Configurações de Loading
    LOADING: {
        minDuration: 2000,
        maxDuration: 5000,
        progressSteps: 10,
        resources: [
            'css/prompts360-final.css',
            'logo_prompts360.png',
            'foto_ebook.webp',
            'js/main.js'
        ]
    },

    // Configurações de Animação
    ANIMATION: {
        observerOptions: {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        },
        staggerDelay: 100,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    },

    // Seletores CSS
    SELECTORS: {
        header: '.header',
        loadingScreen: '#loading-screen',
        mainContent: '#main-content',
        progressFill: '#progress-fill',
        progressPercentage: '#progress-percentage',
        ctaButtons: '.cta-button',
        leadForm: '#leadForm',
        animateElements: '.animate-on-scroll',
        navLinks: '.nav-link'
    },

    // Classes CSS
    CLASSES: {
        visible: 'visible',
        scrolled: 'scrolled',
        active: 'active',
        loading: 'loading',
        fadeIn: 'fade-in',
        slideUp: 'slide-up',
        error: 'error',
        success: 'success'
    }
};
