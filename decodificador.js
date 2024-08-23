document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.getElementById('botonEncriptar');
    const botonDesencriptar = document.getElementById('botonDesencriptar');
    const botonCopiarResultado = document.getElementById('botonCopiarResultado');
    const modalError = document.getElementById('modalError');
    const cerrarModal = document.querySelector('.cerrar'); // Corrección aquí
    const textoInput = document.getElementById('textoInput');
    const containerResultado = document.getElementById('containerResultado');
    const textoResultado = document.getElementById('textoResultado');

    containerResultado.style.display = 'none';

    const llavesEncriptacion = {
        'a': 'ai',
        'e': 'enter',
        'i': 'imes',
        'o': 'ober',
        'u': 'ufat'
    };

    const llavesDesencriptacion = Object.fromEntries(
        Object.entries(llavesEncriptacion).map(([letra, valor]) => [valor, letra])
    );

    function evaluarTexto(procesar) {
        const texto = textoInput.value.trim();
        const caracteresValidos = /^[a-z\s]*$/;

        if (!texto || !caracteresValidos.test(texto)) {
            modalError.style.display = 'block';
            containerResultado.style.display = 'none';
            return;
        }

        const resultado = texto.replace(
            procesar === 'encriptar' ? /[aeiou]/g : /ai|enter|imes|ober|ufat/g, // Corrección aquí
            caracter => procesar === 'encriptar' ? llavesEncriptacion[caracter] : llavesDesencriptacion[caracter]
        );

        textoResultado.value = resultado; // Corrección aquí
        containerResultado.style.display = 'block';
        botonDesencriptar.disabled = false;
    }

    botonEncriptar.addEventListener('click', () => evaluarTexto('encriptar'));
    botonDesencriptar.addEventListener('click', () => evaluarTexto('desencriptar'));

    botonCopiarResultado.addEventListener('click', () => {
        navigator.clipboard.writeText(textoResultado.value)
            .then(() => alert('Texto copiado al portapapeles'))
            .catch(error => alert('Error al copiar el texto: ', error));
    });

    cerrarModal.addEventListener('click', () => modalError.style.display = 'none');
});
