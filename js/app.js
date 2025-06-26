class Calculator extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });
        
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./lib/css/bootstrap.min.css">
            <link rel="stylesheet" href="../css/styles.css">
            
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
        
        this.shadowRoot.getElementById('calcular').addEventListener('click', () => this.calcular());
    }
    
    calcular() {
        const numero1 = parseFloat(this.shadowRoot.getElementById('numero1').value);
        const numero2 = parseFloat(this.shadowRoot.getElementById('numero2').value);
        const operacion = this.shadowRoot.getElementById('operacion').value;
        const resultadoElement = this.shadowRoot.getElementById('resultado');
        
        if (isNaN(numero1) || isNaN(numero2)) {
            this.mostrarResultado('Por favor ingrese ambos números', 'error');
            return;
        }
        
        try {
            let resultado;
            switch(operacion) {
                case 'suma': resultado = numero1 + numero2; break;
                case 'resta': resultado = numero1 - numero2; break;
                case 'multiplicacion': resultado = numero1 * numero2; break;
                case 'division':
                    if (numero2 === 0) throw new Error('No se puede dividir por cero');
                    resultado = numero1 / numero2;
                    break;
                default: throw new Error('Operación no válida');
            }
            
            this.mostrarResultado(`Resultado: ${resultado}`, 'success');
        } catch (error) {
            this.mostrarResultado(error.message, 'error');
        }
    }
    
    mostrarResultado(mensaje, tipo) {
        const resultadoElement = this.shadowRoot.getElementById('resultado');
        resultadoElement.textContent = mensaje;
        resultadoElement.className = `resultado ${tipo}`;
    }
}

customElements.define('calculadora-basica', Calculator);