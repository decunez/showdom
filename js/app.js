document.addEventListener('DOMContentLoaded', function() {
    const calcularBtn = document.getElementById('calcular');
    const resultadoElement = document.getElementById('resultado');
    
    calcularBtn.addEventListener('click', function() {
        const numero1 = parseFloat(document.getElementById('numero1').value);
        const numero2 = parseFloat(document.getElementById('numero2').value);
        const operacion = document.getElementById('operacion').value;
        
        // Validar campos
        if (isNaN(numero1) || isNaN(numero2)) {
            mostrarResultado('Por favor ingrese ambos números', 'error');
            return;
        }
        
        let resultado;
        let error = null;
        
        try {
            switch(operacion) {
                case 'suma':
                    resultado = numero1 + numero2;
                    break;
                case 'resta':
                    resultado = numero1 - numero2;
                    break;
                case 'multiplicacion':
                    resultado = numero1 * numero2;
                    break;
                case 'division':
                    if (numero2 === 0) throw new Error('No se puede dividir por cero');
                    resultado = numero1 / numero2;
                    break;
                default:
                    throw new Error('Operación no válida');
            }
            
            mostrarResultado(`Resultado: ${resultado}`, 'success');
        } catch (e) {
            mostrarResultado(e.message, 'error');
        }
    });
    
    function mostrarResultado(mensaje, tipo) {
        resultadoElement.textContent = mensaje;
        resultadoElement.className = 'resultado ' + tipo;
    }
});