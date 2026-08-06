function resizeCanvas() {
    var canvas = document.getElementById('unity-canvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var targetRatio = 8 / 7;

    var newWidth = windowWidth;
    var newHeight = newWidth / targetRatio;

    if (newHeight > windowHeight) {
        newHeight = windowHeight;
        newWidth = newHeight * targetRatio;
    }

    canvas.style.width = newWidth + "px";
    canvas.style.height = newHeight + "px";
}

window.addEventListener("load", function () {

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const fill = document.getElementById("loading-bar-fill");
    const progressText = document.getElementById("loading-progress");

    // Реальный прогресс от Unity
    let targetProgress = 0;

    // Отображаемый прогресс
    let displayedProgress = 0;

    function animateProgress() {

        // Плавно догоняем реальный прогресс
        displayedProgress += (targetProgress - displayedProgress) * 0.08;

        // Избавляемся от "вечного" дробного значения
        if (Math.abs(targetProgress - displayedProgress) < 0.05)
            displayedProgress = targetProgress;

        fill.style.width = displayedProgress + "%";
        progressText.textContent = Math.round(displayedProgress) + "%";

        requestAnimationFrame(animateProgress);
    }

    animateProgress();

    var buildUrl = "Build";
    var config = {
      dataUrl: buildUrl + "/MouseAndBuckle.data",
      frameworkUrl: buildUrl + "/MouseAndBuckle.framework.js",
      codeUrl: buildUrl + "/MouseAndBuckle.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "endicomp",
      productName: "MouseAndBuckle",
      productVersion: "1.0",
      devicePixelRatio: 1
    };

    createUnityInstance(document.querySelector("#unity-canvas"), config, (progress) => {

        // Не даём полосе резко прыгать на 100
        targetProgress = Math.min(progress * 100, 98);

    }).then((unityInstance) => {

        // Красиво доводим до конца
        targetProgress = 100;

        const checkFinish = setInterval(() => {

            if (displayedProgress >= 99.8) {

                clearInterval(checkFinish);

                const loading = document.getElementById("unity-loading-bar");

                loading.style.transition = "opacity .4s";
                loading.style.opacity = "0";

                setTimeout(() => {
                    loading.style.display = "none";
                }, 400);

            }

        }, 16);

        window.unityInstance = unityInstance;

    }).catch(console.error);

});