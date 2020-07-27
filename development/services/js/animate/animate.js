/**
 * ANIMATE
 * @param {object} options
 */
const ANIMATE =  function(options) {
    let container = options.container,
        content = options.content,
        newContainerClass = options.newContainerClass,
        animationType = options.animationType,
        callback = options.callback;

    let animationClasses = getAnimationClasses(animationType);
    let animDivOut = document.createElement("div");
    let animDivIn = document.createElement("div");
    let containerHeight;

    if (animationType/* !== "fade"*/) {
        let containerStyle = window.getComputedStyle(container);
        containerHeight = containerStyle.height;
        console.log({
          position: containerStyle.position,
          left: containerStyle.left,
          top: containerStyle.top,
          right: containerStyle.right,
          bottom: containerStyle.bottom,
          width: containerStyle.width,
          height: containerStyle.height
        });
        container.setAttribute("style", (containerStyle.position !== "absolute" ? "position: relative;" : "left: " + containerStyle.left + "; top: " + containerStyle.top + "; right: " + containerStyle.right + "; bottom: " + containerStyle.bottom) + " width: " + containerStyle.width + "; height: "  + containerStyle.height + "; margin-top:" + containerStyle.marginTop + "; margin-right:" + containerStyle.marginRight + "; margin-bottom:" + containerStyle.marginBottom + "; margin-left:" + containerStyle.marginLeft + "; overflow: hidden;" );
    }


    [animDivOut, animDivIn].map(function(div, index) { 
        div.setAttribute("style", "position: absolute; width: 100%; height: 100%; overflow: hidden;" + (animationType === "fade" ? " z-index: " + (index === 0 ? "2" : "1") + ";" : ""));
    });

    animDivOut.className = container.className;
    if (newContainerClass) { animDivIn.className = newContainerClass; }
    container.className = "animation-container";

    animDivOut.innerHTML = container.innerHTML;
    animDivIn.innerHTML = content;

    container.innerHTML = "";
    container.appendChild(animDivOut);
    container.appendChild(animDivIn);

    animDivOut.classList.add.apply(animDivOut.classList, animationClasses[1].split(" "));
    animDivIn.classList.add.apply(animDivIn.classList, animationClasses[0].split(" "));

    let animOutProm = new Promise(function(resolve) {
        var animOutListener = function() {
            // console.warn("animOut done");
            animDivOut.removeEventListener("animationend", animOutListener);
            resolve();
        };
        animDivOut.addEventListener("animationend", animOutListener, false);
    });
    let animInProm = new Promise(function(resolve) {
        var animInListener = function() {
            // console.warn("animIn done");
            animDivIn.removeEventListener("animationend", animInListener);
            resolve();
        };
        animDivIn.addEventListener("animationend", animInListener, false);
    });

    Promise.race([animOutProm, animInProm]).then(function() {
        if (newContainerClass) {
            container.className = newContainerClass;
        } else {
            // FIXME remove else?
            // console.log(animDivOut.className);
            // container.className = animDivOut.className;
        }
        container.innerHTML = content;
        container.removeAttribute("style");
        if (callback) { callback(); }
    });


    /*
    * the getAnimationClasses function returns the in-and-out css classes for a specific animation type
    * [in, out]
    */
    function getAnimationClasses(animationType) {
        switch (animationType) {
            case "left":
                return ["animation-moveFromRight animation-ontop", "animation-scaleDown"];
                break;
            case "right":
                return ["animation-moveFromLeft animation-ontop", "animation-scaleDown"];
                break;
            case "top":
                return ["animation-moveFromBottom", "animation-moveToTop"];
                break;
            case "bottom":
                return ["animation-moveFromTop", "animation-moveToBottom"];
                break;
            case "zoom":
                return ["animation-scaleUp", "animation-scaleDown"];
                break;
            case "fade":
                return ["animation-fadeIn", "animation-fadeOut"];
        }
    }
};
