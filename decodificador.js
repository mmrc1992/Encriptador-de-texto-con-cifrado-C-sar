document.addEventListener('DOMContentLoaded', function() {
    const botonEncriptar = document.getElementById('botonEncriptar');
    const botonDesencriptar = document.getElementById('botonDesencriptar');
    const botonCopiarResultado = document.getElementById('botonCopiarResultado');
    const modalError = document.getElementById('modalError');
    const cerrarModal = document.querySelector('.cerrar');
    const textoInput = document.getElementById('textoInput');
    const containerResultado = document.getElementById('containerResultado');
    const textoResultado = document.getElementById('textoResultado');

    containerResultado.style.display = 'none'; 
    
    botonEncriptar.addEventListener('click', function () {
        procesarTexto('encriptar');
    });

    botonDesencriptar.addEventListener('click', function () {
        procesarTexto('desencriptar');
    });

    botonCopiarResultado.addEventListener('click', function () {
        copiarTexto('textoResultado');
    });

    cerrarModal.addEventListener('click', function () {
        modalError.style.display = 'none';
    });

    function procesarTexto(accion) {
        const texto = textoInput.value.trim();

        if (texto === '') {
            modalError.style.display = 'block';
            textoResultado.value = '';
            containerResultado.style.display = 'none'; 
            return;
        }

        const desplazamiento = 3; 
        textoResultado.value = (accion === 'encriptar') ? encriptarCesar(texto, desplazamiento) : desencriptarCesar(texto, desplazamiento);
        containerResultado.style.display = 'block'; 
        botonDesencriptar.disabled = false; 
    }

    function encriptarCesar(texto, desplazamiento) {
        const alfabeto = "abcdefghijklmnñopqrstuvwxyz";
        return texto.replace(/[a-zñ]/gi, function(char) {
            const esMayuscula = char === char.toUpperCase();
            char = char.toLowerCase();
            let index = alfabeto.indexOf(char);

            if (index === -1) {
                return char; 
            }

            index = (index + desplazamiento) % alfabeto.length;

            let nuevoChar = alfabeto[index];
            return esMayuscula ? nuevoChar.toUpperCase() : nuevoChar;
        });
    }

    function desencriptarCesar(texto, desplazamiento) {
        const alfabeto = "abcdefghijklmnñopqrstuvwxyz";
        return texto.replace(/[a-zñ]/gi, function(char) {
            const esMayuscula = char === char.toUpperCase();
            char = char.toLowerCase();
            let index = alfabeto.indexOf(char);

            if (index === -1) {
                return char; 
            }

            index = (index - desplazamiento + alfabeto.length) % alfabeto.length;
            let nuevoChar = alfabeto[index];
            return esMayuscula ? nuevoChar.toUpperCase() : nuevoChar;
        });
    }

    function copiarTexto(idTexto) {
        const texto = document.getElementById(idTexto).value;
        navigator.clipboard.writeText(texto).then(() => {
            alert('Texto copiado al portapapeles');
        }).catch(err => {
            alert('Error al copiar el texto: ', err);
        });
    }
});
