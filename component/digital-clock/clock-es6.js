(function() {
    let selfDocument = document.currentScript.ownerDocument;
    class DigitalClock extends HTMLElement {
            createdCallback() {
            let shadow = this.createShadowRoot(),
            templateContent = selfDocument.querySelector("template").content,
            templateNodes = document.importNode(templateContent,true),
            hourElement = null,
            minuteElement = null,
            secondElement = null;

            shadow.appendChild(templateNodes);
            hourElement = shadow.querySelector(".hour");
            minuteElement = shadow.querySelector(".minute");
            secondElement = shadow.querySelector(".second");
            setInterval(function() {
                let date = new Date();
                hourElement.innerText = date.getHours();
                minuteElement.innerText = date.getMinutes();
                secondElement.innerText = date.getSeconds();
            },1000);
        }
    }

    document.registerElement("digital-clock",DigitalClock);
})();
