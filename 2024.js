// ==UserScript==
// @name         My name is andy
// @namespace
// @version      1.0
// @description  Trigger the 'ended' event on video elements when a new page is loaded
// @grant        none
// ==/UserScript==

document.addEventListener('click', function() {  // 检查页面中是否存在视频元素
    var videoElement = document.querySelector('video');
    if (videoElement) {                          // 创建一个'ended'事件
        var endedEvent = new Event('ended');     // 条件是鼠标点击时候,触发视频元素的'ended'事件
        videoElement.dispatchEvent(endedEvent);
        console.log('Video ended event triggered:', videoElement);
    } else {
        console.log('No video element found');
    }
});                                               // bug的问题所以要点击两次屏幕
