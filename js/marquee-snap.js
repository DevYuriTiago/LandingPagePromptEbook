// MARQUEE SNAP-TO-CARD FUNCTIONALITY
class MarqueeSnapController {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        
        this.track = this.container.querySelector('.marquee-track');
        this.cards = this.track.querySelectorAll('.service-card, .case-card');
        this.isHovered = false;
        this.snapTimeout = null;
        
        this.init();
    }
    
    init() {
        // Add hover events
        this.container.addEventListener('mouseenter', () => this.handleMouseEnter());
        this.container.addEventListener('mouseleave', () => this.handleMouseLeave());
        
        // Add individual card hover events for better UX
        this.cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => this.handleCardHover(e));
            card.addEventListener('mouseleave', (e) => this.handleCardLeave(e));
        });
    }
    
    handleMouseEnter() {
        this.isHovered = true;
        this.pauseAnimation();
        
        // Wait a bit for user to settle on a card
        this.snapTimeout = setTimeout(() => {
            if (this.isHovered) {
                this.snapToNearestCard();
            }
        }, 500);
    }
    
    handleMouseLeave() {
        this.isHovered = false;
        this.resumeAnimation();
        
        if (this.snapTimeout) {
            clearTimeout(this.snapTimeout);
            this.snapTimeout = null;
        }
        
        // Reset all card styles
        this.cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.zIndex = '';
        });
    }
    
    handleCardHover(e) {
        if (!this.isHovered) return;
        
        const hoveredCard = e.target.closest('.service-card, .case-card');
        if (!hoveredCard) return;
        
        // Clear any pending snap
        if (this.snapTimeout) {
            clearTimeout(this.snapTimeout);
            this.snapTimeout = null;
        }
        
        // Highlight the hovered card and dim others
        this.cards.forEach(card => {
            if (card === hoveredCard) {
                card.style.transform = 'scale(1.05)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.style.transition = 'all 0.3s ease';
            } else {
                card.style.opacity = '0.6';
                card.style.transform = 'scale(0.95)';
                card.style.transition = 'all 0.3s ease';
            }
        });
    }
    
    handleCardLeave(e) {
        // Don't reset if we're still hovering the container
        if (this.isHovered) {
            // Small delay to prevent flickering between cards
            setTimeout(() => {
                if (this.isHovered && !this.container.querySelector('.service-card:hover, .case-card:hover')) {
                    this.resetCardStyles();
                }
            }, 100);
        }
    }
    
    pauseAnimation() {
        this.track.style.animationPlayState = 'paused';
    }
    
    resumeAnimation() {
        this.track.style.animationPlayState = 'running';
    }
    
    snapToNearestCard() {
        const containerRect = this.container.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;
        
        let nearestCard = null;
        let nearestDistance = Infinity;
        
        this.cards.forEach(card => {
            const cardRect = card.getBoundingClientRect();
            const cardCenter = cardRect.left + cardRect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);
            
            if (distance < nearestDistance) {
                nearestDistance = distance;
                nearestCard = card;
            }
        });
        
        if (nearestCard) {
            this.highlightCard(nearestCard);
        }
    }
    
    highlightCard(card) {
        this.cards.forEach(c => {
            if (c === card) {
                c.style.transform = 'scale(1.05)';
                c.style.opacity = '1';
                c.style.zIndex = '10';
                c.style.transition = 'all 0.3s ease';
                c.style.boxShadow = '0 10px 30px rgba(64, 224, 208, 0.3)';
            } else {
                c.style.opacity = '0.6';
                c.style.transform = 'scale(0.95)';
                c.style.transition = 'all 0.3s ease';
                c.style.boxShadow = '';
            }
        });
    }
    
    resetCardStyles() {
        this.cards.forEach(card => {
            card.style.transform = '';
            card.style.opacity = '';
            card.style.zIndex = '';
            card.style.boxShadow = '';
            card.style.transition = '';
        });
    }
}

// Initialize marquee snap controllers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize for each marquee section
    new MarqueeSnapController('.services-marquee');
    new MarqueeSnapController('.benefits-marquee');
    new MarqueeSnapController('.cases-marquee');
});
