function resizeCanvas() {
    var canvas = document.getElementById('unity-canvas');
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var targetRatio = 8 / 14;
  
    var newWidth = windowWidth;
    var newHeight = newWidth / targetRatio;
  
    if (newHeight > windowHeight) {
      newHeight = windowHeight;
      newWidth = newHeight * targetRatio;
    }
  
    canvas.style.width = newWidth + 'px';
    canvas.style.height = newHeight + 'px';
  }
  
  window.addEventListener('load', function () {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
  
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
      var fillEl = document.getElementById("loading-bar-fill");
      if (fillEl) fillEl.style.width = (progress * 100) + "%";
    }).then((unityInstance) => {
      var bar = document.getElementById("unity-loading-bar");
      if (bar) bar.style.display = "none";
      window.unityInstance = unityInstance;
    }).catch((message) => {
      console.error(message);
    });
  });
  
