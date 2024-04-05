/**
 * Widget Embed iframe code
 * (also external domain)
 *
 */
(function(){
    window.mychat = window.mychat || {};
    var iframe2 = document.createElement('div');
    iframe2.id = "iframe2";
    var styles = {
        "border": "0px",
        "background-color": "transparent",
        "pointer-events": "none",
        "z-index": "2147483639",
        "position": "fixed",
        "bottom": "0px",
        "width": window.mychat.iframeWidth,
        "height": window.mychat.iframeHeight,
        "overflow": "hidden",
        "opacity": "1",
        "max-width": "100%",
        "right": "0px",
        "max-height": "100%"
    };
    Object.assign(iframe2.style, styles);
    var iframe1 = document.createElement('iframe');
    // chat source (external url)
    iframe1.src = 'http://192.168.15.81/NextJs/chatbot/';
    iframe1.id = "iframe1";
    iframe1.allow = "autoplay; camera; microphone";
    var styles = {
        "pointer-events": "all",
        "background": "none",
        "border": "0px",
        "float": "none",
        "position": "absolute",
        "inset": "0px",
        "width": "100%",
        "height": "100%",
        "margin": "0px",
        "padding": "0px",
        "min-height": "0px"
    };
    Object.assign(iframe1.style, styles);
    iframe2.appendChild(iframe1);
    document.querySelector('body').appendChild(iframe2);
    
})();