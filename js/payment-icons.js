// Script para criar uma imagem temporária de ícones de pagamento
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se a imagem de ícones de pagamento existe
    const paymentIconsImg = document.querySelector('.payment-icons-img');
    
    if (paymentIconsImg) {
        // Se a imagem não existe no servidor, criar uma representação textual
        paymentIconsImg.onerror = function() {
            const paymentMethods = document.querySelector('.payment-methods');
            if (paymentMethods) {
                // Remover a imagem com erro
                paymentIconsImg.remove();
                
                // Criar uma div com os métodos de pagamento em texto
                const textPaymentMethods = document.createElement('div');
                textPaymentMethods.className = 'text-payment-methods';
                textPaymentMethods.innerHTML = `
                    <span>Visa</span>
                    <span>Mastercard</span>
                    <span>Amex</span>
                    <span>Elo</span>
                    <span>Boleto</span>
                    <span>Pix</span>
                `;
                paymentMethods.appendChild(textPaymentMethods);
                
                // Adicionar estilo para os métodos de pagamento em texto
                const style = document.createElement('style');
                style.textContent = `
                    .text-payment-methods {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: center;
                        gap: 10px;
                        margin-top: 15px;
                    }
                    .text-payment-methods span {
                        background-color: #1a1a1a;
                        color: #aaa;
                        padding: 5px 10px;
                        border-radius: 4px;
                        font-size: 0.8rem;
                    }
                `;
                document.head.appendChild(style);
            }
        };
    }
});
