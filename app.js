document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('video');
    const qrResult = document.getElementById('qrResult');
    const iniciarLeituraBtn = document.getElementById('iniciarLeitura');
    const pararLeituraBtn = document.getElementById('pararLeitura');
    const questaoInput = document.getElementById('questao');
    const respostaInput = document.getElementById('resposta');
    const adicionarQuestaoBtn = document.getElementById('adicionarQuestao');
    const gerarGabaritoBtn = document.getElementById('gerarGabarito');
    const gerarQRCodeGabaritoBtn = document.getElementById('gerarQRCodeGabarito');
    const gabaritoDiv = document.getElementById('gabaritoDiv');

    let scanner;

    iniciarLeituraBtn.addEventListener('click', () => {
        scanner = new Instascan.Scanner({ video: video });
        scanner.addListener('scan', function (content) {
            qrResult.textContent = 'Resultado QR Code: ' + content;
        });

        Instascan.Camera.getCameras().then(function (cameras) {
            if (cameras.length > 0) {
                scanner.start(cameras[0]);
                iniciarLeituraBtn.disabled = true;
                pararLeituraBtn.disabled = false;
            } else {
                console.error('Nenhuma câmera encontrada.');
            }
        }).catch(function (error) {
            console.error(error);
        });
    });

    pararLeituraBtn.addEventListener('click', () => {
        if (scanner) {
            scanner.stop();
        }
        iniciarLeituraBtn.disabled = false;
        pararLeituraBtn.disabled = true;
    });

    const gabarito = { questoes: [], respostas: [] };

    adicionarQuestaoBtn.addEventListener('click', () => {
        const questao = questaoInput.value;
        const resposta = respostaInput.value;
        gabarito.questoes.push(questao);
        gabarito.respostas.push(resposta);
        questaoInput.value = '';
        respostaInput.value = '';
    });

    gerarGabaritoBtn.addEventListener('click', () => {
        gabaritoDiv.innerText = JSON.stringify(gabarito, null, 2);
    });

    gerarQRCodeGabaritoBtn.addEventListener('click', () => {
        const gabaritoJSON = JSON.stringify(gabarito);
        const qrCanvas = document.createElement('canvas');

        const qrcode = new QRCode(qrCanvas, {
            text: gabaritoJSON,
            width: 128,
            height: 128
        });

        document.body.appendChild(qrCanvas);
    });
});
