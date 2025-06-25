class CalculatorBasica extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Estilos directamente en el JS para simplificar
        const style = `
            <style>
                .calculator-container {
                    max-width: 400px;
                    margin: 0 auto;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    background-color: #f8f9fa;
                }
                .resultado {
                    font-size: 1.2rem;
                    font-weight: bold;
                    min-height: 30px;
                    margin-top: 15px;
                    padding: 10px;
                    border-radius: 5px;
                }
                .error {
                    color: #dc3545;
                    background-color: #f8d7da;
                    border-color: #f5c6cb;
                }
                .success {
                    color: #28a745;
                    background-color: #d4edda;
                    border-color: #c3e6cb;
                }
            </style>
        `;
        
        // Estructura del componente
        const template = `
            ${style}
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
            <div class="calculator-container">
                <div class="mb-3">
                    <label for="numero1" class="form-label">Primer número</label>
                    <input type="number" class="form-control" id="numero1" placeholder="Ingrese un número">
                </div>
                <div class="mb-3">
                    <label for="numero2" class="form-label">Segundo número</label>
                    <input type="number" class="form-control" id="numero2" placeholder="Ingrese un número">
                </div>
                <div class="mb-3">
                    <label for="operacion" class="form-label">Operación</label>
                    <select class="form-select" id="operacion">
                        <option value="suma">Suma</option>
                        <option value="resta">Resta</option>
                        <option value="multiplicacion">Multiplicación</option>
                        <option value="division">División</option>
                    </select>
                </div>
                <button class="btn btn-primary w-100" id="calcular">Calcular</button>
                <div id="resultado" class="resultado mt-3"></div>
            </div>
        `;
        
        this.shadowRoot.innerHTML = template;
        
        // Configurar funcionalidad
        this.calcularBtn = this.shadowRoot.getElementById('calcular');
        this.calcularBtn.addEventListener('click', () => this.calcular());
    }
    
    calcular() {
        const numero1 = this.shadowRoot.getElementById('numero1').value;
        const numero2 = this.shadowRoot.getElementById('numero2').value;
        const operacion = this.shadowRoot.getElementById('operacion').value;
        const resultadoElement = this.shadowRoot.getElementById('resultado');
        
        // Validaciones básicas
        if (!numero1 || !numero2) {
            resultadoElement.textContent = 'Por favor ingrese ambos números';
            resultadoElement.className = 'resultado error';
            return;
        }
        
        const num1 = parseFloat(numero1);
        const num2 = parseFloat(numero2);
        let resultado;
        
        try {
            switch(operacion) {
                case 'suma': resultado = num1 + num2; break;
                case 'resta': resultado = num1 - num2; break;
                case 'multiplicacion': resultado = num1 * num2; break;
                case 'division':
                    if (num2 === 0) throw new Error('División por cero');
                    resultado = num1 / num2;
                    break;
                default: throw new Error('Operación no válida');
            }
            
            resultadoElement.textContent = `Resultado: ${resultado}`;
            resultadoElement.className = 'resultado success';
        } catch (error) {
            resultadoElement.textContent = error.message;
            resultadoElement.className = 'resultado error';
        }
    }
}

// Registrar el componente
customElements.define('calculadora-basica', CalculatorBasica);